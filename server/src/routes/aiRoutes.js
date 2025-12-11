const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const { generateArticle, generateBlogTitle, generateImage, removeImageBackground, removeObject, reviewResume } = require("../controllers/aiController");
const { upload } = require("../configs/multer");
const aiRateLimiter = require("../middleware/aiRateLimiter");

const aiRouter = express.Router();

aiRouter.post('/generate-article', requireAuth, aiRateLimiter, generateArticle);
aiRouter.post('/generate-blog-title', requireAuth, aiRateLimiter, generateBlogTitle);
aiRouter.post('/generate-image', requireAuth, aiRateLimiter, generateImage);
aiRouter.post('/remove-image-background', upload.single('image'), requireAuth, aiRateLimiter, removeImageBackground);
aiRouter.post('/remove-image-object', upload.single('image'), requireAuth, aiRateLimiter, removeObject);
aiRouter.post('/resume-review', upload.single('resume'), requireAuth, aiRateLimiter, reviewResume);

module.exports = { aiRouter }