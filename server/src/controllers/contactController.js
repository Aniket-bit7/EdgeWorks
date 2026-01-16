const prisma = require("../prismaClient");

const isEmptyOrWhitespace = (value) =>
  !value || value.trim().length === 0;


const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const saveContactMessage = async ({ name, email, message }) => {
  try {
    return await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
      },
    });
  } catch (error) {
    throw new Error("Could not save contact message");
  }
};

const submitContact = async (req, res) => {
  try {
    let { name, email, message } = req.body;

    name = name?.trim();
    email = email?.trim();
    message = message?.trim();

    if (
      isEmptyOrWhitespace(name) ||
      isEmptyOrWhitespace(email) ||
      isEmptyOrWhitespace(message)
    ) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and message are required",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email format",
      });
    }

    const saved = await saveContactMessage({ name, email, message });

    return res.status(201).json({
      success: true,
      message: "Message received!",
      data: saved,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Try again later.",
    });
  }
};

module.exports = { submitContact };
