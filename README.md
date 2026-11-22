# Can't Buy GTA 6, So I Vibecoded a Vice City Portfolio Instead 🎮🌴

<div align="center">

**A neon-soaked, GTA-inspired portfolio for software engineer Siddhesh Ravindra Katkade.**

[![Live Website](https://img.shields.io/badge/Live%20Website-Visit%20Now-ff2e88?style=for-the-badge&logo=vercel)](https://vice-portfolio-eight.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-View%20Source-12061f?style=for-the-badge&logo=github)](https://github.com/Sidd-17052004/vice-portfolio)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)

</div>

---

## 🌆 About This Website

This portfolio turns a software engineer's resume into a Vice City-style digital experience.

It combines bold typography, neon sunsets, animated cards, cinematic project previews, floating HUD elements, and responsive layouts to present skills, experience, projects, education, and contact information.

> **Mission:** Build cool things.  
> **Current status:** Portfolio loaded.  
> **Wanted level:** Increasing with every scroll.

---

## ✨ Features

- 🌴 Neon Vice City-inspired visual theme
- 🚗 Animated 3D car scene and sunset hero artwork
- 🧑‍💻 Character profile with hover-highlighted traits
- ⚔️ Animated Skills cards and staggered skill reveals
- 📜 GTA-style Experience timeline with moving checkpoint dots
- 🎯 Project cards with cinematic images and mission modals
- 🗺️ Interactive footer minimap
- ⭐ Scroll-reactive wanted-level stars
- 💵 Live cash and clock HUD
- 📻 Auto-changing radio ticker with equalizer animation
- 🏁 Mission-checkpoint and wanted-level-lost overlays
- 🏆 Section-based achievement unlock notifications
- 📬 Contact form with validation and mailto delivery
- 🎭 Secret `VICE` easter egg
- 📱 Fully responsive layouts for desktop, tablet, and mobile
- ♿ Reduced-motion support

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | Component-based interface |
| **Vite** | Fast development and production build |
| **Framer Motion** | Page, card, modal, and toast animations |
| **GSAP + ScrollTrigger** | Hero and scroll effects |
| **React Three Fiber + Three.js** | Interactive 3D car scene |
| **Lucide React** | Interface icons |
| **CSS3** | Neon styling, responsive layouts, and keyframe animations |
| **Vercel** | Production hosting and deployment |

---

## 📂 Project Structure

```text
vice-portfolio/
├── public/
│   ├── backgrounds/
│   ├── projects/
│   ├── me.jpg
│   └── resume.pdf
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   ├── Hero.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   └── Sections.jsx
│   ├── data/
│   │   └── portfolioData.js
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── vercel.json
└── package.json
```

---

## 🚀 Run Locally

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
git clone https://github.com/Sidd-17052004/vice-portfolio.git
cd vice-portfolio
npm install
```

### Start Development Server

```bash
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

### Create Production Build

```bash
npm run build
```

The optimized website is generated inside the `dist/` folder.

---

## 🌍 Live Deployment

The website is deployed on Vercel:

**https://vice-portfolio-eight.vercel.app**

Vercel configuration is included in `vercel.json` for correct single-page application routing.

---

## 🎮 Hidden Features

The portfolio contains a few in-game easter eggs:

- Type **`VICE`** anywhere on the keyboard
- Click the top-right HUD/panorama panel five times
- Press the close button to exit the secret screen

Achievement notifications are unlocked after entering major sections for the first time.

---

## ✏️ Personalization

Edit website content in:

```text
src/data/portfolioData.js
```

Update:

- Name and role
- Profile photo
- Resume link
- Contact details
- Skills
- Experience
- Projects
- Education
- Certifications
- Social links

Profile images and project artwork can be replaced inside `public/`.

---

## 📬 Contact Form

The contact form validates and prepares a complete email for the visitor's default email application using `mailto`.

Automatic server-side email delivery requires an email service or backend, such as Resend, EmailJS, Formspree, or an SMTP endpoint.

---

## ⚖️ Inspiration and Assets

This is an original portfolio experience inspired by the visual style of neon Vice City and GTA VI-style marketing.

It is **not affiliated with, endorsed by, or connected to Rockstar Games or Take-Two Interactive**.
