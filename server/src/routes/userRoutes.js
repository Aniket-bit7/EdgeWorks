const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const { getUserCreations, getPublishedCreations, toggleLikeCreation } = require("../controllers/userController");

const userRouter = express.Router()

userRouter.get('/get-user-creations', requireAuth, getUserCreations)
userRouter.get('/get-published-creations', requireAuth, getPublishedCreations)
userRouter.post('/toggle-like-creation', requireAuth, toggleLikeCreation)

module.exports = { userRouter }