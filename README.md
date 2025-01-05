# React Classroom Project 📚

An interactive classroom management system built with React, inspired by Google Classroom. This platform provides a modern, user-friendly environment for online education and collaboration.

## 🚀 Features

- Real-time communication using Socket.IO
- Rich text editing with TipTap
- Video conferencing capabilities with ZegoCloud
- Multi-language support (i18n)
- User authentication and authorization
- Interactive course management
- File sharing and resource management
- Responsive design with Material Tailwind

## 🛠 Tech Stack

### Frontend
- React 18
- Redux Toolkit for state management
- React Router DOM for navigation
- Material Tailwind for UI components
- TipTap for rich text editing
- i18next for internationalization
- Socket.IO client for real-time features

### Backend
- Express.js
- MongoDB
- Socket.IO
- Firebase
- Bcrypt for password hashing
- RTK Query for data fetching

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- MongoDB database
  
## 🚀 Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd react-classroom-project
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and configure your environment variables:
```env
VITE_API_URL=your_api_url
VITE_FIREBASE_CONFIG=your_firebase_config
MONGODB_URI=your_mongodb_uri
```

4. Start the development server:
```bash
npm run dev
```

## 📦 Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build

## 🌐 Browser Support

The project supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔒 Security

This project implements several security measures:
- Password hashing with bcrypt
- CORS protection
- Firebase authentication
- Secure WebSocket connections

## 🌍 Internationalization

The project supports multiple languages using i18next. To add a new language:

1. Add translation files in the `public/locales` directory
2. Configure the language in the i18next setup
3. Use the translation hooks in your components

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Nurlan - *Co-Developer*
- Qerib - *Co-Developer*

- [ClassCraft] - *Initial work*

## 🙏 Acknowledgments

- Google Classroom for inspiration
- Material Tailwind team for the UI components
- TipTap team for the rich text editor
- ZegoCloud team for video conferencing capabilities
