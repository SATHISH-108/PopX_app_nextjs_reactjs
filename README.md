📱 Mobile-Only Auth App (Next.js + TailwindCSS + MongoDB)
This project is a mobile-only responsive authentication UI built using Next.js, React, Tailwind CSS, MongoDB, and Auth.js. It includes registration, login, and profile/account screens — all designed to appear as a mobile app layout on both desktop and mobile screens.

📦 Tech Stack
Next.js 15 (App Router)
React.js
Tailwind CSS
MongoDB + Mongoose
Auth.js (formerly NextAuth.js)
bcryptjs (for password hashing)
🔧 Setup Instructions

1. Create the project
   npx create-next-app@latest

Choose:

TypeScript: No
App Router: Yes
Tailwind CSS: Yes
ESLint: Yes
src/: No
import alias: No

### 2.Instll dependencies

npm install mongoose mongodb
npm install bcryptjs
npm install auth.js

### 3. Run the Development Server

npm run dev

### 4.Features

📱 375px wide mobile-style layout on all devices
👤 User Registration with name, email, password, and company info
🔐 Login with secure password (bcrypt)
🪪 Profile/account page with user info
🔒 Authentication handled via Auth.js
📁 Clean folder structure and reusable form design 5. Notes
📌 Notes .All UI pages use Tailwind classes directly. .Mobile view is enforced even on large screens by wrapping content in w-[375px] containers. .Passwords are hashed using bcryptjs. .Authentication is done securely using auth.js.

6. Screens
   ✅ Welcome Page ✅ Register Page ✅ Login Page ✅ Profile Page
