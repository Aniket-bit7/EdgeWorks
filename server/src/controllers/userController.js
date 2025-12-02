const prisma = require("../prismaClient");

const getUserCreations = async (req, res) => {
  try {
    const userId = req.user.sub;

    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const totalItems = await prisma.creations.count({
      where: { user_id: userId },
    });

    const totalPages = Math.ceil(totalItems / limit);

    const creations = await prisma.creations.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" }, 
      skip: (page - 1) * limit,
      take: limit,
    });

    res.json({
      success: true,
      creations,
      totalPages,
      currentPage: page,
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



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

    await prisma.creations.delete({ where: { id: creationId } });

    res.json({ success: true, message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getPublishedCreations = async (req, res) => {
  try {
    // Read pagination query params
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;

    const skip = (page - 1) * limit;

    // Fetch paginated creations
    const creations = await prisma.creations.findMany({
      where: { publish: true },
      orderBy: { created_at: "desc" },
      skip,
      take: limit,
    });


    const total = await prisma.creations.count({
      where: { publish: true },
    });

    res.json({
      success: true,
      creations,
      totalPages: Math.ceil(total / limit),
      page,
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


const toggleLikeCreation = async (req, res) => {
  try {
    const userId = req.user.sub;
    const { id } = req.body;

    const creation = await prisma.creations.findUnique({
      where: { id: Number(id) },
    });

    if (!creation) {
      return res.json({ success: false, message: "Creation not found" });
    }

    const currentLikes = creation.likes || [];
    const userIdInt = Number(userId);

    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdInt)) {
      updatedLikes = currentLikes.filter((u) => u !== userIdInt);
      message = "Creation Unliked";
    } else {
      updatedLikes = [...currentLikes, userIdInt];
      message = "Creation Liked";
    }

    await prisma.creations.update({
      where: { id: Number(id) },
      data: {
        likes: {
          set: updatedLikes,
        },
      },
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
