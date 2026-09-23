# Clinicify

**Clinicify** is an Intelligent OPD Flow System built with Next.js 15, Firebase, and real-time queues.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmahtoyash%2FClinicify)

## 🚀 Live Demo

> Deployed on Vercel — [https://clinicify.vercel.app](https://clinicify.vercel.app)

---

## ✨ Features

- 🏥 Real-time OPD queue management
- 👨‍⚕️ Role-based dashboards: Admin, Doctor, Receptionist, Pharmacist
- 💊 Pharmacy billing & medicine dispensing
- 🔔 Live notifications via Firebase Realtime
- 📋 Patient tracking with shareable links

---

## 🛠 Quick Setup — Local Development

### 1. Clone the repository
```bash
git clone https://github.com/mahtoyash/Clinicify.git
cd Clinicify
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables (IMPORTANT)

Copy the example env file and fill in your Firebase credentials:
```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your Firebase project config (from Firebase Console → Project Settings → General → Web App):

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
FIREBASE_ADMIN_CREDENTIAL_PATH=.secrets/firebase-admin.json
RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL=Clinicify <onboarding@resend.dev>
```

### 4. Firebase Admin SDK

For backend APIs, you need a Firebase Service Account key:
1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate new private key"
3. Save the JSON to `.secrets/firebase-admin.json`

### 5. Start the Application
```bash
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000)

---

## ☁️ Deploy to Vercel (Recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import from GitHub
3. Select this repository
4. Add all environment variables from `.env.local` in the Vercel dashboard
5. For `FIREBASE_ADMIN_CREDENTIAL_PATH`, use the **Vercel Environment Variables** approach:
   - Add `FIREBASE_ADMIN_CREDENTIAL_JSON` as a new env var with the **full JSON content** of your service account key
   - Update `lib/firebase/admin.ts` accordingly (see below)
6. Click **Deploy** → Get your live link!

---

## 🏗 Architecture

```
app/          — Next.js App Router, API routes, global styles
components/   — UI components (landing, doctor, reception, pharmacy, admin)
lib/
  domain/     — Business logic, types, queue algorithms
  firebase/   — Firebase client & admin initializers
  server/     — Authorization, notifications, operations
scripts/      — Seed & utility scripts
```

## ✅ Validation
```bash
npm run test
npm run lint
npm run build
```

## 🎭 Demo Credentials

| Role         | Email                          | Password   |
|--------------|-------------------------------|------------|
| Admin        | admin@clinicify.test          | A12345678  |
| Doctor       | doctor@clinicify.test         | D12345678  |
| Receptionist | reception@clinicify.test      | R12345678  |
| Pharmacist   | pharmacy@clinicify.test       | P12345678  |
