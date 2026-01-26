# GVTCards 🎓

<div align="center">

  **The easiest way to enhance your knowledge from just a simple text.**

  [![Next.js](https://img.shields.io/badge/Next.js-14.2.7-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Firebase](https://img.shields.io/badge/Firebase-10.13.1-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
  [![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?style=for-the-badge&logo=openai)](https://openai.com/)

  [Live Demo](https://gvtcards.vercel.app/) • [Report Bug](https://github.com/Goodluck07/GVTCrads/issues) • [Request Feature](https://github.com/Goodluck07/GVTCrads/issues)

</div>

---

## 📖 About The Project

GVTCards is an innovative AI-powered flashcard generation platform designed to revolutionize the way students, professionals, and lifelong learners study. Simply input your study materials, and our advanced AI will automatically generate comprehensive flashcard sets tailored to your content.

Whether you're a student preparing for exams, a professional brushing up on skills, or someone who simply loves learning, GVTCards offers a seamless experience to create, organize, review, and retain knowledge effectively.

### ✨ Key Features

- **🤖 AI-Powered Generation**: Leverage OpenAI's advanced language models to automatically create high-quality flashcards from any text input
- **💾 Cloud Storage**: Save and access your flashcard sets from any device with Firebase integration
- **🔐 Secure Authentication**: User authentication and authorization powered by Firebase Auth
- **🎴 Interactive Flip Cards**: Beautiful, animated flashcard interface with smooth flip animations
- **📊 Organized Sets**: Create and manage multiple flashcard sets with custom names and categories
- **🆓 Completely Free**: All features available at no cost - no subscriptions or hidden fees
- **📱 Responsive Design**: Fully responsive UI that works seamlessly on desktop, tablet, and mobile devices
- **🎨 Modern UI**: Clean and intuitive interface built with Material-UI components

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16.0.0 or higher)
- **npm** or **yarn** or **pnpm** or **bun**
- A **Firebase** account ([Get started here](https://firebase.google.com/))
- An **OpenAI API** key ([Get your key here](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Goodluck07/GVTCrads.git
   cd GVTCrads
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Copy the `.env.example` file to create `.env.local` and add your credentials:
   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_actual_openai_api_key_here
   ```

4. **Configure Firebase**
   - Create a new Firebase project in the [Firebase Console](https://console.firebase.google.com/)
   - Enable **Authentication** (Email/Password provider)
   - Enable **Firestore Database**
   - Your Firebase configuration is already set in `.env.example` - no changes needed unless you want to use a different project

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

---

## 💡 Usage

### Creating Flashcards

1. **Sign up** or **log in** to your account
2. Navigate to the **Generate** page
3. Enter your study material or notes in the text field
4. Click **"Generate Flashcards"**
5. Review your AI-generated flashcards with interactive flip animations
6. Click **"Save Flashcards"** and give your set a name
7. Access your saved sets anytime from the **"View Saved Flashcards"** option

### Example Input

```text
Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide
to create oxygen and energy in the form of sugar. It occurs in the chloroplasts of
plant cells and involves two main stages: the light-dependent reactions and the
Calvin cycle.
```

The AI will generate multiple flashcards covering key concepts like:
- What is photosynthesis?
- What are the inputs and outputs?
- Where does it occur?
- What are the main stages?

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework for production
- **[React 18](https://react.dev/)** - UI library
- **[Material-UI](https://mui.com/)** - Component library and styling
- **[Emotion](https://emotion.sh/)** - CSS-in-JS styling

### Backend & Services
- **[Firebase Authentication](https://firebase.google.com/products/auth)** - User authentication
- **[Firebase Firestore](https://firebase.google.com/products/firestore)** - NoSQL database for storing flashcard sets
- **[OpenAI API](https://openai.com/api/)** - AI-powered flashcard generation

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **TypeScript support** - Type safety with jsconfig.json

---

## 📁 Project Structure

```
GVTCrads/
├── app/
│   ├── api/
│   │   ├── checkout_sessions/    # Stripe checkout API
│   │   └── generate/              # OpenAI flashcard generation API
│   ├── components/
│   │   ├── ClientResultPage.js
│   │   └── ResultContent.js
│   ├── generate/                  # Flashcard generation page
│   ├── result/                    # Results display page
│   ├── sign-in/                   # Authentication pages
│   ├── sign-up/
│   ├── utils/
│   │   └── get-stripe.js          # Stripe initialization
│   ├── layout.js                  # Root layout
│   └── page.js                    # Home page
├── public/                        # Static assets
├── firebase.js                    # Firebase configuration
├── package.json
└── README.md
```

---

## 🎨 Screenshots & Demo

<!-- Add screenshots of your application here -->
> **Coming Soon**: Screenshots and demo GIFs showcasing the flashcard generation process, interactive flip animations, and user dashboard.

### Features Preview

- 🏠 **Landing Page**: Clean, modern design with gradient branding
- 🎴 **Flashcard Generator**: Intuitive text input with AI-powered generation
- 🔄 **Flip Animation**: Smooth 3D card flip on hover
- 💾 **Save & Organize**: Name and categorize your flashcard sets
- 🔍 **Search**: Quickly find and review saved flashcards
- 💰 **Pricing Page**: Clear pricing tiers with Stripe integration

---

## 👥 Meet Our Team

<table>
  <tr>
    <td align="center">
      <h3>Goodluck Badewole</h3>
      <p>An international student from Nigeria, currently a sophomore studying Computer Science at AAMU. Aspiring data analyst with a passion for educational technology.</p>
    </td>
  </tr>
  <tr>
    <td align="center">
      <h3>Vincent</h3>
      <p>Key member of the development team, contributing extensively to backend architecture and design elements.</p>
    </td>
  </tr>
  <tr>
    <td align="center">
      <h3>Tapiwa</h3>
      <p>UX specialist responsible for ensuring the platform is both functional and user-friendly.</p>
    </td>
  </tr>
</table>

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Goodluck07/GVTCrads/issues).

### How to Contribute

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is currently unlicensed. All rights reserved.

---

## 📧 Contact

**Goodluck Badewole** - [badewolegoodluck55@gmail.com](mailto:badewolegoodluck55@gmail.com)

**Project Link**: [https://github.com/Goodluck07/GVTCrads](https://github.com/Goodluck07/GVTCrads)

---

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Material-UI Components](https://mui.com/components/)

---

<div align="center">

  **Made with ❤️ by the GVT Team**

  If you found this project helpful, please consider giving it a ⭐!

</div>
