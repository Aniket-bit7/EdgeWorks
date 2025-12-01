const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const { generateArticle, generateBlogTitle, generateImage, removeImageBackground, removeObject, reviewResume } = require("../controllers/aiController");
const { upload } = require("../configs/multer");

const aiRouter = express.Router();

aiRouter.post('/generate-articles', requireAuth, generateArticle);
aiRouter.post('/generate-blog-title', requireAuth, generateBlogTitle);
aiRouter.post('/generate-image', requireAuth, generateImage);
aiRouter.post('/remove-image-background', upload.single('image'), requireAuth, removeImageBackground);
aiRouter.post('/remove-image-object', upload.single('image'), requireAuth, removeObject);
aiRouter.post('/resume-review', upload.single('resume'), requireAuth, reviewResume);

module.exports = { aiRouter }