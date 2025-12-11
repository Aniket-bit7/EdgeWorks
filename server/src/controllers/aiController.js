const OpenAI = require("openai");
const prisma = require("../prismaClient");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;
const FormData = require("form-data");
const fs = require("fs");
const pdf = require("pdf-parse-fork");

const AI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  project: process.env.OPENAI_PROJECT_ID,
});


const generateArticle = async (req, res) => {
  try {
    const userId = req.user.sub;
    const { prompt, length } = req.body;
    const plan = req.user.plan;

    if (!userId) {
      return res.status(400).json({ error: "User not found from token" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (plan !== "pro") {
      if (user.credits <= 0) {
        return res.status(403).json({
          error: "You have used all 10 credits. Upgrade to Pro for unlimited access.",
        });
      }

      await prisma.user.update({
        where: { id: userId },
        data: { credits: { decrement: 1 } },
      });
    }

    let response;

    try {
      response = await AI.chat.completions.create(
        {
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: length,
        },
        {
          timeout: 20000,
          maxRetries: 5,
        }
      );

    } catch (apiErr) {
      console.log("OpenAI FULL ERROR → ", apiErr);

      if (apiErr.statusCode === 429 || apiErr?.response?.status === 429) {
        return res.status(429).json({
          error: "OpenAI is temporarily rate-limiting. Please try again in a few seconds.",
        });
      }

      if (apiErr.code === "ETIMEDOUT" || apiErr.code === "ECONNABORTED") {
        return res.status(504).json({
          error: "AI took too long to respond. Try again.",
        });
      }

      return res.status(500).json({
        error: "AI request failed",
        details: apiErr.message,
      });
    }

    const content = response?.choices?.[0]?.message?.content || "";

    await prisma.creations.create({
      data: {
        user_id: userId,
        prompt,
        content,
        type: "article",
      },
    });

    return res.status(200).json({ success: true, content });

  } catch (err) {
    console.error("generateArticle error:", err);
    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};


const generateBlogTitle = async (req, res) => {
  try {
    const userId = req.user.sub;
    const { prompt } = req.body;
    const plan = req.user.plan;

    if (!userId) {
      return res.status(400).json({ error: "User not found from token" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (plan !== "pro") {
      if (user.credits <= 0) {
        return res.status(403).json({
          error: "You have used all 10 credits. Upgrade to Pro for unlimited access.",
        });
      }

      await prisma.user.update({
        where: { id: userId },
        data: { credits: { decrement: 1 } },
      });
    }

    const response = await AI.chat.completions.create(
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 100,
      },
      { maxRetries: 3 }
    );

    const content = response?.choices?.[0]?.message?.content || "";

    await prisma.creations.create({
      data: {
        user_id: userId,
        prompt,
        content,
        type: "blog-title",
      },
    });

    return res.status(200).json({ success: true, content });
  } catch (err) {
    console.error("generateBlogTitle error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const generateImage = async (req, res) => {
  try {
    const userId = req.user.sub;
    const { prompt, publish } = req.body;
    const plan = req.user.plan;

    if (!userId) {
      return res.status(400).json({ error: "User not found from token" });
    }

    if (plan !== "pro") {
      return res.status(403).json({ error: "This feature is only for Pro users" });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const data = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(
      data.data,
      "binary"
    ).toString("base64")}`;

    const uploadResult = await cloudinary.uploader.upload(base64Image);
    const secure_url = uploadResult.secure_url;

    await prisma.creations.create({
      data: {
        user_id: userId,
        prompt,
        content: secure_url,
        type: "image",
        publish: Boolean(publish),
      },
    });

    return res.status(200).json({ success: true, content: secure_url });
  } catch (err) {
    console.error("generateImage error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const removeImageBackground = async (req, res) => {
  try {
    const userId = req.user.sub;
    const image = req.file;
    const plan = req.user.plan;

    if (!image) return res.status(400).json({ error: "No image uploaded" });
    if (!userId) return res.status(400).json({ error: "User not found from token" });

    if (plan !== "pro") {
      return res.status(403).json({ error: "This feature is only for Pro users" });
    }

    const uploadResult = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    const secure_url = uploadResult.secure_url;

    await prisma.creations.create({
      data: {
        user_id: userId,
        prompt: "Remove background from image",
        content: secure_url,
        type: "image",
      },
    });

    return res.status(200).json({ success: true, content: secure_url });
  } catch (err) {
    console.error("removeImageBackground error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const removeObject = async (req, res) => {
  try {
    const userId = req.user.sub;
    const plan = req.user.plan;
    const image = req.file;
    const { object } = req.body;

    if (!plan || plan !== "pro") {
      return res.status(403).json({ error: "This feature is only for Pro users" });
    }

    if (!image) return res.status(400).json({ error: "No image uploaded" });

    if (!object || object.trim().split(" ").length !== 1) {
      return res.status(400).json({ error: "Please enter a single object name" });
    }

    const uploaded = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });

    const signedUrl = cloudinary.url(uploaded.public_id, {
      sign_url: true,
      resource_type: "image",
      transformation: [{ effect: `gen_remove:${object.toLowerCase()}` }],
    });

    await prisma.creations.create({
      data: {
        user_id: userId,
        prompt: `Removed ${object} from image`,
        content: signedUrl,
        type: "image",
      },
    });

    return res.status(200).json({ success: true, content: signedUrl });
  } catch (err) {
    console.error("removeObject error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const reviewResume = async (req, res) => {
  try {
    const userId = req.user.sub;
    const resume = req.file;
    const plan = req.user.plan;

    if (!userId) return res.status(400).json({ error: "User not found from token" });
    if (plan !== "pro") {
      return res.status(403).json({ error: "This feature is only for Pro users" });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Resume file size exceeds allowed size (5MB).",
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `Review this resume and give detailed improvements:\n\n${pdfData.text}`;

    const response = await AI.chat.completions.create(
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1000,
      },
      { maxRetries: 3 }
    );

    const content = response?.choices?.[0]?.message?.content || "";

    await prisma.creations.create({
      data: {
        user_id: userId,
        prompt: "Resume Review",
        content,
        type: "resume-review",
      },
    });

    return res.status(200).json({ success: true, content });
  } catch (err) {
    console.error("reviewResume error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  generateArticle,
  generateBlogTitle,
  generateImage,
  removeImageBackground,
  removeObject,
  reviewResume,
};
