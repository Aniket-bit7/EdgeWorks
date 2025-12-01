const prisma = require("../prismaClient");

const getUserCreations = async (req, res) => {
  try {
    const userId = req.user.sub;

    const creations = await prisma.creations.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
    });

    res.json({ success: true, creations });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

const deleteCreation = async (req, res) => {
  try {
    const userId = req.user.sub;
    const creationId = parseInt(req.params.id);

    const exists = await prisma.creations.findFirst({
      where: { id: creationId, user_id: userId },
    });

    if (!exists) {
      return res.status(404).json({ error: "Creation not found or unauthorized" });
    }

    await prisma.creations.delete({
      where: { id: creationId },
    });

    res.json({ success: true, message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPublishedCreations = async (req, res) => {
  try {
    const creations = await prisma.creations.findMany({
      where: { publish: true },
      orderBy: { created_at: "desc" },
    });

    res.json({ success: true, creations });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const toggleLikeCreation = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const creation = await prisma.creations.findUnique({
      where: { id: Number(id) },
    });

    if (!creation) {
      return res.json({ success: false, message: "Creation not found" });
    }

    const currentLikes = creation.likes || [];
    const userIdStr = String(userId);

    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdStr)) {
      updatedLikes = currentLikes.filter((u) => u !== userIdStr);
      message = "Creation Unliked";
    } else {
      updatedLikes = [...currentLikes, userIdStr];
      message = "Creation Liked";
    }

    await prisma.creations.update({
      where: { id: Number(id) },
      data: { likes: updatedLikes },
    });

    res.json({ success: true, message });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  getUserCreations,
  deleteCreation,
  getPublishedCreations,
  toggleLikeCreation
};
