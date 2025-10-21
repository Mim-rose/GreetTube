# 🎥 GreetTube — A Modern Video Hosting Platform

**GreetTube** is a full-stack video hosting application inspired by YouTube — built with **Next.js App Router**, **MongoDB**, and **NextAuth**.  
Users can **register, log in, browse, and watch videos seamlessly** in a secure and scalable environment.

🌐 **Live Demo:** [Add your deployment link here]

---

## ✨ Features

- 🔐 **Secure Authentication** — Google, GitHub, and custom credentials  
- 🎥 **Dynamic Video Playback** — Watch videos via `/watch/[id]` pages  
- 📦 **Video Metadata Storage** — Stored efficiently in MongoDB  
- 🧠 **Smart API Client** — Token-based fetch logic for secure requests  
- 🧭 **Middleware Protection** — Guards sensitive routes  
- 📄 **JWT Session Management** — Lightweight and secure  
- 📱 **Fully Responsive Design** — Built with Tailwind CSS for all screen sizes  

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS, React Icons, NextAuth |
| **Backend** | MongoDB, Mongoose, bcryptjs, NextAuth (JWT strategy) |
| **Deployment** | Vercel (frontend + backend), MongoDB Atlas |

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/greettube.git
cd greettube

# Install dependencies
npm install

# Set up environment variables (see below)

# Run the development server
npm run dev
🔐 Environment Setup

Create a .env.local file in the root directory and add the following:

MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret

NEXT_PUBLIC_BASE_URL=http://localhost:3000

📁 Folder Structure
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts      # NextAuth routes
│   │   ├── video/[id]/route.ts              # GET video by ID
│   │   ├── user/route.ts                    # GET current user
│   ├── watch/[id]/page.tsx                  # Watch video page
│   ├── login/page.tsx                       # Login UI
│   └── register/page.tsx                    # Registration UI
│
├── lib/
│   ├── db.ts                                # MongoDB connection
│   ├── auth.ts                              # NextAuth configuration
│   └── api-client.ts                        # API abstraction layer
│
├── models/
│   ├── User.ts                              # User schema
│   └── Video.ts                             # Video schema
│
├── middleware.ts                            # Route protection
├── .env.local                               # Environment variables
└── ...

🎯 Technical Highlights

NextAuth Integration — Google, GitHub, and credentials-based login

JWT Sessions — Secure, lightweight authentication

API Client Abstraction — Centralized token-injected fetch logic

Middleware Protection — Granular access control with withAuth

Dynamic Routing — Videos served via /watch/[id]

MongoDB Models — Clean, structured schemas for users and videos

Responsive UI — Tailwind CSS ensures cross-device compatibility

🧪 Future Enhancements

📤 Video file upload with progress tracking

💬 Comment and like systems

🧑‍💼 Dedicated user profile pages

🔍 Search and filter functionality

📊 Admin dashboard for video analytics

👩‍💻 Author

Made with ❤️ by [Jannatul Afrose Mim]

If you find this project helpful, please ⭐ star this repository to show your support!
