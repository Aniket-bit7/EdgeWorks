const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const { getUserCreations, getPublishedCreations, toggleLikeCreation, deleteCreation } = require("../controllers/userController");
const { updateAvatar, deleteAvatar } = require("../controllers/avatarController");

const userRouter = express.Router()

userRouter.get('/get-user-creations', requireAuth, getUserCreations)
userRouter.get('/get-published-creations', requireAuth, getPublishedCreations)
userRouter.delete("/delete-creation/:id", requireAuth, deleteCreation);
userRouter.post('/toggle-like-creation', requireAuth, toggleLikeCreation);
userRouter.post("/set-avatar", requireAuth, updateAvatar);
userRouter.delete("/delete-avatar", requireAuth, deleteAvatar);

module.exports = { userRouter }