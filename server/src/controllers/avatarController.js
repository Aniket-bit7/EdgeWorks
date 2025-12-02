const prisma = require("../prismaClient");


const updateAvatar = async (req, res) => {
  try {
    const userId = req.user.sub;
    const { icon } = req.body;

    await prisma.user.update({
      where: { id: userId },
      data: { avatar: icon },
    });

    res.json({ success: true, message: "Avatar updated", icon });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


const deleteAvatar = async (req, res) => {
  try {
    const userId = req.user.sub;

    await prisma.user.update({
      where: { id: userId },
      data: { avatar: null },
    });

    res.json({ success: true, message: "Avatar removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { updateAvatar, deleteAvatar };
