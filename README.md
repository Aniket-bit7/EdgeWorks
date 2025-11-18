1. Project Title
EdgeWorks – An AI Powered Creative Workspace

2. Problem Statement
Creating and managing digital content can be time-consuming and scattered across multiple tools.
Writers, designers, and professionals often struggle to generate ideas, edit visuals, and collaborate efficiently. 
“EdgeWorks” aims to simplify the creative process by providing an all-in-one AI-powered platform for generating content(articles,titles, etc), enhancing images, analysing resumes and connecting with a community. 
More features can be added later.

3. System Architecture
Describe or diagram your project structure, e.g.:
Frontend → Backend (API) → Database → AI Services → Payment Gateway
Frontend:
React.js with React Router for smooth page navigation and routing
Tailwind CSS for responsive and modern UI design
Context API for global state management (user data, theme, and AI tool states)
Integrations for image upload, preview, and real-time community interactions
Payment integration UI for upgrading plans or unlocking premium AI features

Backend:
Node.js + Express.js for handling API requests and managing business logic

RESTful APIs for:

AI content generation (articles, tags, resume analysis)

Image operations (generation, background removal, object removal)

JWT Authentication and Authorisation for secure login and signup

 Stripe / Razorpay / Payment with Clerk Test Tokens used for payment authentication and validation in testing environments

Database:
PostgreSQL used to store:


User profiles and authentication data
Generated content and images
Community posts and likes
Neon database
AI Integrations:
OpenAI and Gemini AI APIs for text and image generation
Custom models for resume analysis and background/object removal
Hosting & Deployment:
Frontend: Vercel / Netlify

Backend: Render / Railway

Database: PostgreSQL

Payment Gateway: Integrated with Stripe / Razorpay / Payment with Clerk Test Tokens for secure, sandboxed transactions

5. Key Features
Category
Features
Authentication & Authorization
Secure user registration, login, and logout using JWT Authentication.
AI Content Generation
Generate articles, titles, and tags using integrated OpenAI and Gemini AI APIs. Supports quick idea creation for writers and marketers.
Image Editing Tools
Perform AI-based image generation, background removal, and object removal. Includes image upload, preview, and download functionality.
Resume Analysis
Analyze resumes using custom models to provide insights and improvement suggestions.
Community Interaction
A dedicated community section where users can share AI-generated content, like, and interact with others’ creations.
CRUD Operations
Full support for create, read, update, and delete operations on posts, images, and user-generated content.
Frontend Routing
Built with React Router for seamless navigation between pages such as Home, Login, Dashboard, Profile, Community, and AI Tools.
Payments
Integrated payment gateway with Stripe / Razorpay / Clerk Test Tokens payment method for secure transactions during testing and subscription upgrades.
Global State Management
Context API used for managing user data, themes, and AI tool states across the application.
Responsive UI
Designed with Tailwind CSS to ensure a smooth and responsive experience across all devices.
Hosting
Deployed with: Frontend on Vercel / Netlify, Backend on Render / Railway, and Database on Neon (PostgreSQL) for efficient cloud-based performance.


6. Tech Stack
Layer
Technologies
Frontend
React.js, React Router, Axios/fetch(), Tailwind CSS
Backend
Node.js, Express.js
Database
PostgreSQL (hosted on Neon)
Authentication & Payments
JWT Authentication, Stripe / Razorpay 
AI Integrations
OpenAI API, Gemini AI API, Custom Models (for resume analysis and object/background removal)


7. API Overview

Endpoint
Method
Description
Access
/api/auth/signup
POST
Register a new user using JWT Authentication
Public
/api/auth/login
POST
Authenticate existing user and generate session token
Public
/api/content/generate
POST
Generate AI-based content (articles, titles, tags) using OpenAI or Gemini
Authenticated
/api/image/edit
POST
Perform AI-powered image operations (generation, background/object removal)
Authenticated
/api/resume/analyze
POST
Analyze and score resumes using AI models
Authenticated
/api/community/posts
GET
Fetch all community posts and shared content
Public/maybe authenticated
/api/community/post
POST
Create a new community post with text or image
Authenticated
/api/community/post/:id/like
PUT
Like or unlike a community post
Authenticated
/api/payment/checkout
POST
Initiate payment using Stripe / Razorpay / Clerk test tokens
Payment method 
Authenticated









