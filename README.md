# EdgeWorks 

> An all-in-one AI-powered creative workspace for content creators, developers, and professionals

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18.x-61dafb.svg)](https://reactjs.org/)

EdgeWorks streamlines your creative workflow by combining AI-powered content generation, advanced image editing, resume analysis, and community collaboration into a single, unified platform. Stop switching between multiple tools and boost your productivity with cutting-edge AI integration.




.app) | [Documentation](#api-documentation) | [Report Bug](https://github.com/Aniket-bit7/EdgeWorks/issues)

---

## Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## Features

### AI-Powered Content Generation
- Generate full articles with customizable parameters
- Create engaging blog titles and headlines
- Generate SEO-optimized keywords and tags
- Powered by Google Gemini

### Advanced Image Editing
- AI image generation from text prompts
- Professional background removal via ClipDrop
- Smart object removal from images
- Cloud storage and CDN delivery via Cloudinary
- High-quality preview and download options

### Resume Intelligence
- AI-powered resume analysis and scoring
- Detailed feedback on resume quality
- Improvement suggestions
- PDF upload support

### Creative Community
- Share your AI-generated creations
- Like and engage with community content
- Explore trending creations
- User profiles with custom avatars

### Secure & Scalable
- Dual JWT token authentication (Access + Refresh)
- Cloudinary integration for secure file handling
- PostgreSQL database with Neon
- Integrated Stripe payment processing

---

## Tech Stack

### Frontend
- **Framework:** React.js 18.x
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **State Management:** Context API
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js 16+
- **Framework:** Express.js
- **Authentication:** JWT (Access + Refresh tokens)
- **File Storage:** Cloudinary
- **API Integration:** Google Gemini, ClipDrop API

### Database
- **Database:** PostgreSQL
- **Hosting:** Neon (Serverless Postgres)

### AI & ML
- **Text Generation:** Google Gemini API
- **Image Processing:** ClipDrop API
- **Image Storage:** Cloudinary CDN
- **Resume Analysis:** Google Gemini API

### Payment
- **Provider:** Stripe
- **Subscriptions:** Integrated checkout sessions

### Deployment
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** Neon

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Client (React)                      │
│          Tailwind UI + Context API + Router             │
└────────────────────┬────────────────────────────────────┘
                     │ HTTPS/REST
┌────────────────────▼────────────────────────────────────┐
│                Backend API (Express.js)                  │
│    Auth │ AI Routes │ User Routes │ Payment Routes      │
└─────┬───────────┬──────────┬──────────────┬────────────┘
      │           │          │              │
┌─────▼─────┐ ┌──▼────────┐ │         ┌────▼──────┐
│PostgreSQL │ │   Gemini  │ │         │  Stripe   │
│  (Neon)   │ │ ClipDrop  │ │         │ Checkout  │
└───────────┘ └────────────┘ │         └───────────┘
                              │
                         ┌────▼──────┐
                         │Cloudinary │
                         │Image CDN  │
                         └───────────┘
```

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** or **yarn**
- **PostgreSQL** (or a Neon account)
- **Git**

You'll also need API keys for:
- Google Gemini API
- ClipDrop API (for image processing)
- Cloudinary account (for image storage)
- Stripe (for payments)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Aniket-bit7/EdgeWorks.git
cd EdgeWorks
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

### 4. Set Up Environment Variables

Create `.env` files in both `server` and `client` directories (see [Environment Variables](#-environment-variables) section)

### 5. Database Setup

```bash
# Run migrations (if applicable)
cd server
npm run migrate

# Seed database (optional)
npm run seed
```

### 6. Start Development Servers

**Backend:**
```bash
cd server
node index.js
# or for development with auto-reload
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

---

## Environment Variables

### Backend (`server/.env`)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@host:5432/edgeworks

# JWT Authentication (Dual Token System)
JWT_ACCESS_SECRET=your_access_token_secret_min_32_chars
JWT_REFRESH_SECRET=your_refresh_token_secret_min_32_chars
ACCESS_TOKEN_EXP=15m
REFRESH_TOKEN_EXP=7d

# Google Gemini AI
GEMINI_API_KEY=your-gemini-api-key

# ClipDrop API (for image processing)
CLIPDROP_API_KEY=your-clipdrop-api-key

# Cloudinary (Image Storage & CDN)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Stripe Payment
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# CORS Configuration
FRONTEND_URL=http://localhost:5173
CLIENT_URL=https://edge-works.vercel.app
```

### Frontend (`client/.env`)

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
VITE_CLIENT_URL=https://edge-works.vercel.app
```

> **Important:** Never commit `.env` files to version control. Add them to `.gitignore`

---

## 💻 Usage

### Generating Content

```javascript
// Example API call for article generation
const response = await fetch('/api/ai/generate-article', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    topic: 'Artificial Intelligence in 2024',
    tone: 'professional',
    length: 'medium'
  })
});
```

### Image Processing

```javascript
// Remove background from image
const formData = new FormData();
formData.append('image', imageFile);

const response = await fetch('/api/ai/remove-image-background', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```

---

## API Documentation

### Authentication Endpoints

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/auth/signup` | POST | Register new user | No |
| `/api/auth/login` | POST | Login and receive JWT token | No |

**Signup Request:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Login Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

---

### AI Content Endpoints

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/ai/generate-article` | POST | Generate AI article | Yes |
| `/api/ai/generate-blog-title` | POST | Generate blog title suggestions | Yes |
| `/api/ai/generate-image` | POST | Create AI-generated image | Yes |
| `/api/ai/remove-image-background` | POST | Remove image background | Yes |
| `/api/ai/remove-image-object` | POST | Remove objects from image | Yes |
| `/api/ai/resume-review` | POST | Analyze resume PDF | Yes |

**Generate Article Request:**
```json
{
  "topic": "Climate Change Solutions",
  "keywords": ["renewable energy", "sustainability"],
  "tone": "informative",
  "length": 800
}
```

---

### User & Community Endpoints

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/user/get-user-creations` | GET | Fetch user's own creations | Yes |
| `/api/user/get-published-creations` | GET | Fetch public creations | No |
| `/api/user/delete-creation/:id` | DELETE | Delete a creation | Yes |
| `/api/user/toggle-like-creation` | POST | Like/Unlike creation | Yes |
| `/api/user/set-avatar` | POST | Upload profile avatar | Yes |
| `/api/user/delete-avatar` | DELETE | Remove profile avatar | Yes |
| `/api/user/contact` | POST | Submit contact form | No |

---

### Payment Endpoints

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/payment/create-checkout-session` | POST | Create payment session | Yes |

**Create Checkout Request:**
```json
{
  "plan": "premium",
  "interval": "monthly"
}
```

---

## Project Structure

```
EDGEWORKS/
├── client/                                    # Frontend React application
│   ├── node_modules/
│   ├── public/
│   │   ├── assets/
│   │   │   ├── assets.js
│   │   │   ├── avatarIcons.js
│   │   │   └── react.svg
│   │   └── _1aasf1.png
│   ├── src/
│   │   ├── authentication/
│   │   │   ├── Login.jsx
│   │   │   └── SignUp.jsx
│   │   ├── components/
│   │   │   ├── AvatarPicker.jsx
│   │   │   ├── CreationItem.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Newsletter.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Testimonial.jsx
│   │   │   └── Tools.jsx
│   │   ├── pages/
│   │   │   ├── About.jsx
│   │   │   ├── BlogTitles.jsx
│   │   │   ├── Community.jsx
│   │   │   ├── ContactUs.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── GenerateImages.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── PaymentSuccess.jsx
│   │   │   ├── Pricing.jsx
│   │   │   ├── RemoveBackground.jsx
│   │   │   ├── RemoveObject.jsx
│   │   │   ├── ReviewResume.jsx
│   │   │   └── WriteArticle.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── authContext.jsx
│   │   ├── GuestRoute.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── ProRoute.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── vercel.json
│   └── vite.config.js
│
├── server/                                    # Backend Node.js application
│   ├── node_modules/
│   ├── prisma/
│   │   ├── migrations/
│   │   │   └── schema.prisma
│   ├── src/
│   │   ├── configs/
│   │   │   ├── cloudinary.js
│   │   │   └── multer.js
│   │   ├── controllers/
│   │   │   ├── aiController.js
│   │   │   ├── avatarController.js
│   │   │   ├── contactController.js
│   │   │   └── userController.js
│   │   ├── middleware/
│   │   │   └── requireAuth.js
│   │   ├── routes/
│   │   │   ├── aiRoutes.js
│   │   │   ├── auth.js
│   │   │   ├── payment.js
│   │   │   └── userRoutes.js
│   │   └── utils/
│   │       ├── jwt.js
│   │       └── prismaClient.js
│   ├── .gitignore
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## Deployment

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy

```bash
# Or use Vercel CLI
npm i -g vercel
cd client
vercel --prod
```

### Backend Deployment (Render)

1. Create new Web Service on Render
2. Connect your GitHub repository
3. Configure build command: `cd server && npm install`
4. Configure start command: `cd server && npm start`
5. Add environment variables
6. Deploy

### Database (Neon)

1. Create Neon account
2. Create new project
3. Copy connection string
4. Update `DATABASE_URL` in backend `.env`

---

## Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow ESLint configuration
- Use meaningful variable names
- Comment complex logic
- Write clean, readable code

---

## Troubleshooting

<details>
<summary><strong>Database Connection Issues</strong></summary>

- Verify `DATABASE_URL` is correct
- Check network connectivity
- Ensure Neon database is active
- Verify SSL settings in connection string
</details>

<details>
<summary><strong>API Key Errors</strong></summary>

- Confirm all API keys are set in `.env`
- Check API key validity on provider dashboards
- Ensure no extra spaces in `.env` values
</details>

<details>
<summary><strong>File Upload Failures</strong></summary>

- Check `MAX_FILE_SIZE` limit
- Verify upload directory permissions
- Confirm Multer configuration
</details>

---

## 🗺 Roadmap

- [ ] Real-time collaboration features
- [ ] Advanced AI model fine-tuning
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Video generation capabilities

See the [open issues](https://github.com/yourusername/edgeworks/issues) for a full list of proposed features and known issues.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` file for more information.

---

## 📧 Contact

Aniket Pathak - aniketpathak1073@gmail.com

Project Link: https://edge-works.vercel.app/

---

## Acknowledgments

- [Google Gemini](https://deepmind.google/technologies/gemini/) for AI text generation
- [ClipDrop](https://clipdrop.co/) for image processing APIs
- [Cloudinary](https://cloudinary.com/) for image storage and CDN
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Neon](https://neon.tech/) for serverless PostgreSQL
- [Stripe](https://stripe.com/) for payment processing
- All contributors who helped build EdgeWorks

---

<div align="center">

**Built with ❤️ by Aniket**

[⬆ Back to Top](#edgeworks-)

</div>
