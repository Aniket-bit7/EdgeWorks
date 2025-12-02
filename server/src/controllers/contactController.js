const prisma = require("../prismaClient");

const saveContactMessage = async ({ name, email, message }) => {
  try {
    const newMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
      },
    });
    return newMessage;
  } catch (error) {
    console.error("Error saving contact message:", error);
    throw new Error("Could not save contact message");
  }
};

const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log("REQ BODY:", req.body);

    const saved = await saveContactMessage({ name, email, message });

    return res.status(201).json({
      success: true,
      message: "Message received!",
      data: saved,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Try again later.",
    });
  }
};

module.exports = { submitContact };
