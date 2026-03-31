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

| Layer              | Technologies                                               |
| :----------------- | :--------------------------------------------------------- |
| **Frontend**       | React, React Router, TanStack Query, Tailwind CSS, DaisyUI |
| **Backend**        | Node.js, Express.js, MongoDB                               |
| **Authentication** | Firebase Auth                                              |
| **Payment**        | Stripe API                                                 |
| **AI Chat**        | Groq API                                                   |
| **Deployment**     | Netlify (Client), Vercel (Server)                          |

---

## 📸 Screenshots

### Search, Filter and Pagination

![All_Scholarships](/src/assets/user_searching.gif)

- 🔍 **Search** — Keyword search with 400ms debounce, no page reload
- 🎛️ **Filter** — By subject, degree level, and country (all filters work simultaneously)
- 📄 **Pagination** — 8 per page, resets on filter change

---

### Student Payment Flow

![Stripe Checkout](/src/assets/user_payment.gif)
*Discover, apply, track, and review scholarships*

- 🏫 **Scholarship Details** — View fees, deadlines, eligibility, and more
- 💳 **Pay via Stripe** — Secure checkout; failed payment data saved in `localStorage` for retry
- 📋 **My Applications** — Track fee status, application status, and moderator feedback
- 🗑️ **Delete Application** — Only allowed while status is `Pending`
- 💰 **Retry Payment** — Pay button appears for unpaid + pending applications
- ⭐ **Add Review** — Submit star rating + comment once application is `Completed`
- ✏️ **Edit/Delete Reviews** — Manage your own submitted reviews

---
###  Moderator
![Modarator](/src/assets/modarator_dashboard.gif)
*Review applications and manage scholarship quality*

- 📂 **View All Applications** — See all users' applications with status and feedback
- ✅ **Approve / Reject** — Instant status update via TanStack Query cache invalidation
- 💬 **Send Feedback** — Message appears on student's dashboard
- 🗂️ **View All Reviews** — See every review across all scholarships
- 🗑️ **Delete Reviews** — Remove spam or inappropriate content
- 🏫 **Manage Scholarships** — Edit or delete existing listings

---

### Admin Dashboard

![Admin Dashboard](/src/assets/admin_dashboard.gif)
*Full platform control — users, scholarships, and analytics*

- ➕ **Add Scholarship** — Full listing form (rank, fees, deadline, image, etc.)
- ✏️ **Edit Scholarship** — Update any field anytime
- 🗑️ **Delete Scholarship** — Permanent removal with confirmation
- 👥 **View All Users** — Filter by role (Student / Moderator / Admin)
- 🔑 **Promote to Moderator / Admin** — Elevate any user's role
- 🔽 **Demote to Student** — Remove elevated privileges
- 📊 **Analytics Dashboard** — Total users, scholarships, revenue + university pie chart
- 🛡️ **All Moderator Capabilities** — Fully inherited

---

### AI Chat

![AI Chat](/public/Ai_Chat.png)
_Explore the website with ai._

---

## 🎯 Challenges & Solutions

---

## Overview

| #   | Problem                                       | Key Technology Used                          |
| --- | --------------------------------------------- | -------------------------------------------- |
| 01  | Payment Data Lost on Stripe Failure           | localStorage, Stripe API                     |
| 02  | Role-Based UI Complexity Across 3 User Types  | useRole() hook, React Context, Route Guards  |
| 03  | Stale Application Status After Admin Actions  | TanStack Query, cache invalidation           |
| 04  | Advanced Search & Filter Without API Overload | Debounce, controlled inputs, URLSearchParams |
| 05  | AI Chat Integration for Scholarship Guidance  | Groq API, LLaMA 3, floating UI               |
| 06  | Oversized Components Mixing Logic and UI      | Component decomposition, custom hooks        |
| 07  | CSS @import Order Causing PostCSS Build Error | PostCSS, CSS @import rules                   |
| 08  | Heavy & Laggy Animations Across All Pages     | Framer Motion, CSS transforms                |

---

## Detailed Breakdown

### 01 — Payment Data Lost on Stripe Failure

**⚠ Problem**

When a user's Stripe payment failed or they navigated away, all application form data was lost. Users had to refill the entire form and re-initiate the payment process, causing frustration and drop-offs.

**✅ Solution**

Implemented `localStorage` persistence before redirecting to Stripe checkout. The scholarship ID, name, and university name are saved before the Stripe session begins. The `PaymentFailed` page reads this saved data and lets users retry directly from where they left off, without losing their application context.

---

### 02 — Role-Based UI Complexity Across 3 User Types

**⚠ Problem**

Managing three distinct user roles (Student, Moderator, Admin) led to deeply nested conditional rendering throughout components. Checking roles repeatedly in JSX caused messy, unreadable code and made it easy to accidentally show restricted UI to the wrong user.

**✅ Solution**

Built a custom `useRole()` hook backed by React Context that fetches and caches the user's role from the backend once per session. Combined with separate `AdminRoute` and `ModeratorRoute` guard components, role checking became a single import. The `DashBoardLayout` sidebar conditionally renders menu sections using this hook cleanly and consistently.

---

### 03 — Stale Application Status After Admin Actions

**⚠ Problem**

After an admin approved or rejected a student application, the student's dashboard still showed the old `Pending` status. The data didn't update unless the user manually refreshed the page, making the system feel broken.

**✅ Solution**

Integrated TanStack Query (React Query) across all data-fetching components. After any admin or moderator action (approve, reject, feedback), the relevant query cache is invalidated using `queryClient.invalidateQueries()`. This triggers an automatic background refetch so all connected components reflect the new status instantly without a page reload.

---

### 04 — Advanced Search & Filter Without API Overload

**⚠ Problem**

The `AllScholarships` page had 4 simultaneous filters: text search, subject category, degree level, and country. Every keystroke in the search field was firing an API request immediately, causing excessive network calls and server load.

**✅ Solution**

Implemented a debounced search state using `useEffect` with a 400ms delay — the API is only called after the user stops typing. All 4 filter values (`debouncedSearch`, `subject`, `degree`, `country`) are included in TanStack Query's `queryKey` array, so any filter change automatically triggers a fresh fetch with the correct parameters. Added a **Clear Filters** button that resets all controlled state values and returns selects to their default placeholder.

---

### 05 — AI Chat Integration for Scholarship Guidance

**⚠ Problem**

Students needed contextual help navigating the scholarship application process — finding the right scholarships, writing application essays, and understanding eligibility requirements — without leaving the platform or searching externally.

**✅ Solution**

Built **Scholar AI**, an embedded chat assistant powered by the Groq API (LLaMA 3 model), accessible from every page via a floating button. The chat component manages its own message history state, auto-scrolls to new messages, and communicates with the backend which proxies requests to Groq. This keeps the API key server-side and provides scholarship-specific context to the AI model.

---

### 06 — Oversized Components Mixing Logic and UI

**⚠ Problem**

Key components like `Bannar.jsx` (392 lines) mixed data arrays, state logic, animation logic, and JSX all in one file. This made the code hard to read, debug, and maintain. `MyProfile.jsx` (346 lines) combined profile display, edit form, and password change in a single monolithic component.

**✅ Solution**

Applied component decomposition: extracted static data (`bookPages` array) into a constants file, isolated stateful flip logic into a custom `useBookFlip()` hook, and split large page components into focused sub-components (`ProfileHeader`, `ProfileInfoForm`, `ChangePassword`). This brought `Banner` from 392 to ~180 lines while keeping all functionality intact, following the single responsibility principle.

---

### 07 — CSS @import Order Causing PostCSS Build Error

**⚠ Problem**

The Google Fonts `@import` for Poppins was placed after Tailwind's `@tailwind base/components/utilities` directives in `index.css`. This violated the CSS specification that `@import` must precede all other statements, causing a PostCSS build error during Vite HMR updates.

**✅ Solution**

Moved the `@import url()` for Google Fonts to the very first line of `index.css`, before all Tailwind directives and custom rules. Since `@import` must be the first statement in any CSS file, this resolved the build error immediately without any other changes.

---

---

### 08 — Heavy & Laggy Animations Across All Pages

**⚠ Problem**

Framer Motion was imported and used individually in 12+ components with 95+ motion elements. Each page had its own repeated `initial`/`animate`/`viewport` props written from scratch. Infinite loop animations ran constantly on the Banner, and `scale()` animations triggered expensive layout repaints on every card.

**✅ Solution**

Created a centralized `motionVariants.js` file with shared `fadeUp`, `fadeIn`, and `scaleIn` presets. All components now import and spread these variants instead of rewriting them. Added `AnimatePresence` with a single motion wrapper in `RootLayout` and `DashBoardLayout` so every route gets a smooth page transition automatically — without any motion code in individual pages. Replaced `scale` animations with `opacity + transform` only (GPU-accelerated). Added `repeatDelay` to infinite loop animations to reduce GPU usage by ~83%.

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
