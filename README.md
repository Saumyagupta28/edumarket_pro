# 🎓 EduMarket Pro

A comprehensive course selling platform built with React, offering a seamless learning experience for students and powerful tools for instructors.

## 🚀 Features

- **Modern Tech Stack** - React 18, Vite, Redux Toolkit, TailwindCSS
- **Authentication System** - Multi-role login (Students, Instructors, Admin)
- **Course Management** - Complete course creation, editing, and management
- **Video Streaming** - Integrated video player with lesson navigation
- **Payment Integration** - Secure payment processing for course purchases
- **Interactive Dashboard** - Role-based dashboards for all user types
- **Responsive Design** - Mobile-first approach with responsive UI
- **Real-time Analytics** - Course performance and revenue tracking

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## 🛠️ Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/edumarket-pro.git
   cd edumarket-pro
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration values.

4. **Start the development server**:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

## 📁 Project Structure

```
edumarket-pro/
├── public/                     # Static assets
│   ├── assets/images/         # Image assets
│   ├── favicon.ico            # Site favicon
│   └── manifest.json          # PWA manifest
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Base UI components
│   │   └── ...               # Feature-specific components
│   ├── pages/                # Page components
│   │   ├── login-register/   # Authentication pages
│   │   ├── student-dashboard/ # Student dashboard
│   │   ├── instructor-dashboard/ # Instructor dashboard
│   │   ├── course-catalog/   # Course browsing
│   │   ├── course-detail/    # Course details
│   │   └── video-player/     # Video learning interface
│   ├── styles/               # Global styles
│   ├── App.jsx               # Main application component
│   ├── Routes.jsx            # Application routes
│   └── index.jsx             # Application entry point
├── .env.example              # Environment variables template
├── DEPLOYMENT.md             # Deployment instructions
├── netlify.toml             # Netlify configuration
├── vercel.json              # Vercel configuration
└── package.json             # Project dependencies
```

## 🎯 Key Features

### For Students
- Browse and search courses
- Secure course enrollment
- Progress tracking
- Interactive video learning
- Course completion certificates

### For Instructors
- Course creation and management
- Student analytics
- Revenue tracking
- Content upload and organization
- Student interaction tools

### For Administrators
- Platform management
- User management
- Payment oversight
- Analytics and reporting

## 🌐 Deployment

### Quick Deploy Options

#### 1. Netlify (Recommended)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/edumarket-pro)

#### 2. Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/edumarket-pro)

#### 3. GitHub Pages
Push to main branch to trigger automatic deployment via GitHub Actions.

### Manual Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting platform.

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## 🔧 Environment Configuration

Copy `.env.example` to `.env` and configure the following:

```env
# API Configuration
VITE_API_BASE_URL=https://api.yourdomain.com

# Payment Gateway
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key

# Firebase (for authentication and file storage)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=your_project_id

# Additional configurations...
```

## 📚 Getting Started with GitHub

### 1. Create a New Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., "edumarket-pro")
5. Add a description: "A comprehensive course selling platform"
6. Choose "Public" or "Private"
7. Click "Create repository"

### 2. Upload Your Project

#### Option A: Using Git Command Line

```bash
# Initialize git in your project folder
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit: EduMarket Pro platform"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/edumarket-pro.git

# Push to GitHub
git push -u origin main
```

#### Option B: Using GitHub Desktop

1. Download and install [GitHub Desktop](https://desktop.github.com/)
2. Open GitHub Desktop
3. Click "Add an Existing Repository from your Hard Drive"
4. Select your project folder
5. Click "Publish repository"
6. Choose repository name and visibility
7. Click "Publish Repository"

#### Option C: Upload via Web Interface

1. Go to your new repository on GitHub
2. Click "uploading an existing file"
3. Drag and drop your project files
4. Add a commit message
5. Click "Commit changes"

### 3. Repository Setup Best Practices

1. **Add a .gitignore file** (if not already present):
   ```
   node_modules/
   dist/
   .env
   .DS_Store
   *.log
   ```

2. **Create meaningful commit messages**:
   ```bash
   git commit -m "feat: add course enrollment functionality"
   git commit -m "fix: resolve video player loading issue"
   git commit -m "docs: update deployment instructions"
   ```

3. **Use branches for features**:
   ```bash
   git checkout -b feature/payment-integration
   git checkout -b fix/navigation-bug
   ```

4. **Set up GitHub Issues and Projects** for project management

### 4. Collaboration Setup

1. **Add collaborators** in repository settings
2. **Create branch protection rules** for main branch
3. **Set up pull request templates**
4. **Configure issue templates**

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e
```

## 🔧 Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Preview production build
- `npm test` - Run tests
- `npm run lint` - Run linting
- `npm run format` - Format code

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)

## 📞 Support

For support, email support@yourdomain.com or join our [Discord community](https://discord.gg/yourserver).

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ by the EduMarket Pro Team**