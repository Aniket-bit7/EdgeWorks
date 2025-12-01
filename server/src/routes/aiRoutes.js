const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const { generateArticle } = require("../controllers/aiController");

const aiRouter = express.Router();

aiRouter.post('/generate-articles', requireAuth, generateArticle);

module.exports = {aiRouter}