# 🎓 Scholarship Management System

**A full-stack MERN platform connecting students with global scholarships through secure applications and role-based management.**

---

## 🔗 Live Demo

- **Live Site:** [scholar-stream](https://scholar-stream-client.netlify.app/)
- **Server Repo:** [GitHub - Server](https://github.com/abdullah-shamim-2004/ScholarStream-Server)

---

## ✨ Key Features

- 🔐 **Role-Based Access Control** — Three-tier system (Student / Moderator / Admin) with JWT + Firebase Auth
- 💳 **Stripe Payment Integration** — Secure checkout with automatic retry on payment failure
- 🤖 **AI Chat Assistant** — Built-in Scholar AI powered by Groq (LLaMA 3) to help students find scholarships, write essays, and navigate the application process in real time
- 📊 **Admin Dashboard** — Manage scholarships, users, and applications with full CRUD operations
- 🔍 **Advanced Search & Filters** — Find scholarships by category, deadline, country, and funding amount
- ✅ **Application Tracking** — Real-time status updates (Pending / Paid / Approved / Rejected)
- 🛡️ **Moderator Review System** — Quality control for scholarship listings before publication

---

## 🛠️ Tech Stack

| Layer | Technologies |
|:---|:---|
| **Frontend** | React, React Router, TanStack Query, Tailwind CSS, DaisyUI |
| **Backend** | Node.js, Express.js, MongoDB |
| **Authentication** | Firebase Auth |
| **Payment** | Stripe API |
| **AI Chat** | Groq API |
| **Deployment** | Netlify (Client), Vercel (Server) |

---

## 📸 Screenshots

### Banner
![Banner](/public/Home.png)
*Explore the scholarStream.*
### Home Page
![Home Page](/public/all-scholarship.png)
*Browse featured scholarships with search and filter options*
### Admin Dashboard
![Admin Dashboard](/src/assets/admin_dashboard.gif)
*Manage scholarships, users, and applications*
### AI Chat
![AI Chat](/public/Ai_Chat.png)
*Explore the website with ai.*

### Scholarship Details
![Scholarship Details](/public/details.png)
*Detailed view with eligibility, deadlines, and application requirements*

### Payment Flow
![Stripe Checkout](/public/payment.png)
*Secure payment processing with Stripe*



---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Stripe Account (for payment testing)
- Firebase Project (for authentication)

### Installation

#### 1. Clone the repositories
```bash
# Client
git clone https://github.com/abdullah-shamim-2004/ScholarStream-Client.git


# Server
git clone https://github.com/abdullah-shamim-2004/ScholarStream-Server.git

```

#### 2. Set up environment variables

**Client `.env`** (create in root of client folder)
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
GROQ_API_KEY=groq_api
```

**Server `.env`** (create in root of server folder)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
STRIPE_SECRET=your_stripe_secret_key
VITE_CLIENT_UR=http://localhost:5173
FB_SERVICE_KEY=your_firebase_secret_key
```

> **Note:** See `.env.example` files in both repos for complete variable lists.

#### 3. Run the application

**Server** (Terminal 1)
```bash
cd scholar-stream-server
npm run dev
# Server runs on http://localhost:3000
```

**Client** (Terminal 2)
```bash
cd scholar-stream-client
npm run dev
# Client runs on http://localhost:5173
```

#### 4. Test with sample data
- Default admin credentials are in `server/config/seedData.js` (or create your own admin from Firebase Console)
- Use Stripe test card: `4242 4242 4242 4242`, any future date, any CVC

---

## 🔑 Environment Variables

Both client and server require environment variables. **Never commit `.env` files.**

**Files you need to create:**
- `client/.env` (see `client/.env.example`)
- `server/.env` (see `server/.env.example`)

**Required keys:**
- Firebase config (from Firebase Console)
- MongoDB URI (from MongoDB Atlas or local)
- Stripe keys (from Stripe Dashboard)
- JWT secret (generate a random secure string)

---


## 🎯 Challenges & Solutions

### Challenge 1: Payment Retry Logic
**Problem:** Users losing application data on payment failure  
**Solution:** Implemented automatic draft saving before Stripe redirect, allowing users to retry payment from their application dashboard

### Challenge 2: Role-Based UI Rendering
**Problem:** Complexity managing different UI states for 3 user roles  
**Solution:** Created custom React hooks (`useRole`, `useAuth`) with context API for centralized role checking

### Challenge 3: Real-time Application Status
**Problem:** Users not seeing updated application status after admin actions  
**Solution:** Integrated TanStack Query with aggressive cache invalidation and optimistic updates

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Abdullah Shamim**  
MERN Stack Developer  

[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://abdullah-shamim-portfolio.netlify.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abdullah-shamim-patwary/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:abdullahshamim884@gmail.com)

---

## 🙏 Acknowledgments

- Stripe API for seamless payment integration
- Firebase for authentication infrastructure
- TanStack Query for efficient data fetching
- DaisyUI for UI components

---

**⭐ If you found this project helpful, consider giving it a star!**