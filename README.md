🎥 GreetTube: A Modern Video Hosting Platform
GreetTube is a full-stack video hosting application inspired by YouTube — built with Next.js App Router, MongoDB, and NextAuth. Users can register, log in, browse videos, and watch content seamlessly. Designed for scalability, security, and clean architecture.
🌐 Live Demo: [Add your link here]

✨ Features
- 🔐 Secure authentication (Google, GitHub, and custom credentials)
- 🎥 Watch videos via dynamic /watch/[id] pages
- 📦 Upload and store video metadata in MongoDB
- 🧠 Smart API client with token-based fetch logic
- 🧭 Middleware protection for sensitive routes
- 📄 User session management via JWT
- 📱 Fully responsive design with Tailwind CSS

🛠️ Tech Stack
Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS, React Icons, NextAuth
Backend: MongoDB, Mongoose, bcryptjs, NextAuth (JWT strategy)
Deployment: Vercel (frontend/backend), MongoDB Atlas


🚀 Quick Start
# Clone the repository
git clone https://github.com/yourusername/vidsphere.git
cd vidsphere

# Install dependencies
npm install

# Set up environment variables (see .env.example)

# Run the development server
npm run dev


🔐 Environment Setup
Create a .env.local file in the root directory:
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000


📁 Folder Structure
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts     # NextAuth routes
│   │   ├── video/[id]/route.ts             # GET video by ID
│   │   ├── user/route.ts                   # GET current user
│   ├── watch/[id]/page.tsx                 # Watch video page
│   ├── login/page.tsx                      # Login UI
│   └── register/page.tsx                   # Registration UI
├── lib/
│   ├── db.ts                               # MongoDB connection
│   ├── auth.ts                             # NextAuth config
│   └── api-client.ts                       # API abstraction
├── models/
│   ├── User.ts                             # User schema
│   └── Video.ts                            # Video schema
├── middleware.ts                           # Route protection
├── .env.local                              # Environment variables



🎯 Technical Highlights
- NextAuth Integration – Google, GitHub, and credentials-based login
- JWT Sessions – Lightweight, secure session handling
- API Client Abstraction – Centralized fetch logic with token injection
- Middleware Protection – Granular access control via withAuth
- Dynamic Routing – Video pages served via /watch/[id]
- MongoDB Models – Clean schema for users and videos
- Responsive UI – Tailwind-powered layout for all devices

🧪 Future Enhancements
- 📤 Video file upload with progress bar
- 💬 Comments and likes
- 🧑‍💼 User profile pages
- 🔍 Video search and filtering
- 📊 Admin dashboard for analytics

👨‍💻 Author
Made with ❤️ [jannatul Afrose Mim]
⭐ Star this repo if you find it helpful!

