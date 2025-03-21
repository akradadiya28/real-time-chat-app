# Real-Time Chat Application

A modern real-time chat application built with Node.js, Express, Socket.IO, and MongoDB for the backend, and React with Vite for the frontend. This application allows users to communicate in real-time with features like authentication, message persistence, and real-time updates.

## Features

- 🔐 User Authentication (JWT)
- 💬 Real-time messaging
- 🔄 Message persistence with MongoDB
- 👤 User profiles
- 🚀 Real-time notifications
- 🌐 Cross-platform compatibility
- 🔒 Secure communication
- 📱 Responsive UI with Tailwind CSS
- 🎨 Modern UI with DaisyUI components
- 🔄 State management with Redux Toolkit
- 📝 Form handling with Formik and Yup validation
- 🎯 Hot toast notifications
- 🎥 Video chat integration with ZEGOCLOUD

## Tech Stack

### Backend
- **Runtime**: Node.js, Express.js
- **Real-time Communication**: Socket.IO
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **API Security**: CORS, Cookie Parser
- **Password Hashing**: Bcrypt

### Frontend
- **Framework**: React 18 with Vite
- **State Management**: Redux Toolkit with Redux Persist
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS, DaisyUI
- **Form Management**: Formik with Yup validation
- **HTTP Client**: Axios
- **Real-time Client**: Socket.IO Client
- **UI Components**: React Icons
- **Notifications**: React Hot Toast
- **Video Chat**: ZEGOCLOUD UI Kit

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- MongoDB installed and running
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd chat-app
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd views
   npm install
   ```

4. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

## Running the Application

### Backend Development Mode
```bash
npm run dev
```

### Frontend Development Mode
```bash
cd views
npm run dev
```

### Production Mode
Backend:
```bash
npm start
```

Frontend:
```bash
cd views
npm run build
npm run preview
```

## Project Structure

```
chat-app/
├── config/         # Backend configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── models/        # Database models
├── routes/        # API routes
├── socket/        # Socket.IO event handlers
├── views/         # Frontend React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/      # Page components
│   │   ├── redux/      # Redux store and slices
│   │   ├── hooks/      # Custom hooks
│   │   ├── utils/      # Utility functions
│   │   ├── api/        # API integration
│   │   └── App.jsx     # Root component
│   ├── public/         # Static assets
│   └── index.html      # HTML template
└── index.js       # Backend entry point
```

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/messages` - Get chat messages
- `POST /api/messages` - Send new message
- (Add other endpoints as per your implementation)

## Socket Events

- `connection` - Client connects to server
- `disconnect` - Client disconnects from server
- `message` - New message event
- (Add other socket events as per your implementation)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

Arpit Radadiya

## Deployment

This application is configured for deployment on Vercel. The frontend is built with Vite, which provides optimal production builds.

---

For any questions or issues, please open an issue in the repository. 
For any questions or issues, please open an issue in the repository. 