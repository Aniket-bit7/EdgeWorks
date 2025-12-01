const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const { generateArticle, generateBlogTitle, generateImage } = require("../controllers/aiController");

const aiRouter = express.Router();

aiRouter.post('/generate-articles', requireAuth, generateArticle);
aiRouter.post('/generate-blog-title', requireAuth, generateBlogTitle);
aiRouter.post('/generate-image', requireAuth, generateImage);

module.exports = {aiRouter}