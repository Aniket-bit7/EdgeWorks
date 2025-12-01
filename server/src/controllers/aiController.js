const { OpenAI } = require("openai/client.js");
const prisma = require("../prismaClient");


const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

const generateArticle = async (req, res) => {
  try {
    const userId = req.user.sub;
    const { prompt, length } = req.body;
    const plan = req.user.plan
    if (!userId) {
      return res.status(400).json({ error: "User not found from token" });
    }
    // fetch user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    //Free user limit 
    if (plan !== "pro") {
      if (user.credits <= 0) {
        return res.status(403).json({
          error: "You have used all 10 credits. Upgrade to Pro for unlimited access.",
        });
      }
      // subtract 1 credit
      await prisma.user.update({
        where: { id: userId },
        data: { credits: { decrement: 1 } },
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: length,
    });

    const content = response.choices[0].message.content;

    // Save result into Creations table
    await prisma.creations.create({
      data: {
        user_id: userId,
        prompt: prompt,
        content: content,
        type: "article",
      },
    });

    res.status(200).json({ success: true, content })
  } catch (err) {
    console.error("generateArticle error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const generateBlogTitle = async (req, res) => {
  try {
    const userId = req.user.sub;
    const { prompt } = req.body;
    const plan = req.user.plan
    if (!userId) {
      return res.status(400).json({ error: "User not found from token" });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

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

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    const content = response.choices[0].message.content;

    await prisma.creations.create({
      data: {
        user_id: userId,
        prompt: prompt,
        content: content,
        type: "blog-title",
      },
    });

    res.status(200).json({ success: true, content })
  } catch (err) {
    console.error("generateArticle error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { generateArticle }