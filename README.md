EdgeWorks – AI Powered Creative Workspace

EdgeWorks is an all-in-one AI-powered platform designed for creators, developers, writers, designers, and professionals. 
It streamlines content generation, image editing, resume analysis, community interaction, and more — all powered by cutting
-edge AI models like OpenAI and Gemini.


📌 1. Problem Statement

Content creation often requires switching between multiple tools for writing, image editing, and collaboration. 
This leads to inefficiency and scattered workflows.

EdgeWorks solves this by providing:

AI content generation (articles, titles, tags)
AI-powered image editing (background removal, object removal)
Resume analysis using custom models
A creative community for sharing and engagement
Secure authentication and a seamless payment system
A single, unified workspace for all creative needs.


🏗 2. System Architecture

Frontend (React + Tailwind)
        ↓
Backend API (Node.js + Express)
        ↓
Database (PostgreSQL – Neon)
        ↓
AI Services (OpenAI, Gemini, Custom CV Models)
        ↓
Payment Gateway (Stripe / Razorpay / Clerk Test Tokens)


Frontend

React.js + React Router

Tailwind CSS

Context API for global state

Image upload + File preview

Payment UI for subscriptions

Realtime-ready community screens

Backend

Node.js + Express

REST APIs for:

AI content generation

Image processing

Resume analysis

Community operations

Payments

JWT authentication

Multer for file uploads

Database

PostgreSQL (Neon)
Stores:

Users

Generated content

Community posts

Images & resumes

Likes, profiles, avatars

AI Integrations

OpenAI (text + image)

Gemini (text generation)

Custom resume analysis model

Custom image models (BG/object removal)

Hosting

Frontend: Vercel / Netlify

Backend: Render / Railway

Database: Neon (PostgreSQL)

Payments: Stripe / Razorpay / Clerk Test Tokens

⭐ 3. Key Features
🔐 Authentication

JWT-based login/signup

Secure token handling

Avatar upload & delete

📝 AI Content Generation

Generate articles

Generate blog titles

SEO keywords/tags

🎨 AI Image Tools

Generate images

Remove background

Remove objects

High-quality preview & download

📄 Resume Analysis

AI-powered resume review

Feedback + scores

Upload PDFs via Multer

👥 Community Interaction

Publish user creations

Like / Unlike

Explore published creations

Delete creations

💳 Payments

Stripe / Razorpay

Clerk Test Tokens support

Create checkout sessions for subscriptions

🌐 Frontend Capabilities

React Router navigation

Context API global state

Fully responsive Tailwind UI

🛠 4. Tech Stack
Layer	Technologies
Frontend	React.js, React Router, Tailwind CSS
Backend	Node.js, Express.js
Database	PostgreSQL (Neon)
AI	OpenAI, Gemini, Custom CV + Image Models
Auth	JWT Authentication
Payments	Stripe / Razorpay / Clerk Test Tokens
Storage	Multer file upload
🔌 5. Updated API Routes

Below are the final updated backend API endpoints used in EdgeWorks:

🔐 Authentication Routes -->

Endpoint	Method	Description
/api/auth/signup	POST	Register a new user
/api/auth/login	POST	Login & get JWT token

🧠 AI Content Routes -->

Endpoint	Method	Description
/api/ai/generate-article	POST	Generate article
/api/ai/generate-blog-title	POST	Generate blog title
/api/ai/generate-image	POST	Generate AI Image
/api/ai/remove-image-background	POST	Remove image background (file upload)
/api/ai/remove-image-object	POST	Remove any object from image (file upload)
/api/ai/resume-review	POST	Analyze resume (file upload)

👤 User / Creations Routes-->

Endpoint	Method	Description
/api/user/get-user-creations	GET	Fetch user's own creations
/api/user/get-published-creations	GET	Fetch publicly shared creations
/api/user/delete-creation/:id	DELETE	Delete creation
/api/user/toggle-like-creation	POST	Like/Unlike
/api/user/set-avatar	POST	Upload profile avatar
/api/user/delete-avatar	DELETE	Remove profile avatar
/api/user/contact	POST	Submit contact form

💳 Payment Routes -->

Endpoint	Method	Description
/api/payment/create-checkout-session	POST	Initiate Stripe/Razorpay/Clerk Test Token payment


📁 Sample Folder Structure
/client
  ├── src
  │   ├── components
  │   ├── pages
  │   ├── context
  │   ├── api
  │   └── styles
/server
  ├── controllers
  ├── routes
  ├── middleware
  ├── utils
  ├── models
  ├── config
  └── index.js

🔐 Environment Variables

Create .env:

PORT=5000
DATABASE_URL=your_neon_postgresql_url
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_key
GEMINI_API_KEY=your_key
STRIPE_SECRET_KEY=your_key
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_key
CLERK_TEST_KEY=your_key

🚀 Running the Project
Frontend
cd client
npm install
npm run dev

Backend
cd server
npm install
npm start

🤝 Contributing

PRs are welcome!
Follow the folder structure and branching strategy.

📜 License

MIT License © EdgeWorks Team
