# QR-Based Attendance App

A modern, full-stack attendance tracking system for classrooms using QR code technology. Teachers can create attendance sessions with unique QR codes, and students can mark their attendance by scanning them.

## Features

### For Teachers
- 📝 Create attendance sessions with custom titles and subjects
- 🔲 Auto-generated QR codes for each session
- ⏱️ Set session duration and expiration
- 📊 Real-time attendance tracking
- 👥 View detailed attendance lists
- 🔄 Activate/deactivate sessions
- 🗑️ Delete sessions

### For Students
- 📷 Scan QR codes to mark attendance
- 📈 View attendance history
- 📊 Subject-wise attendance statistics
- ✅ Instant confirmation of attendance

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **qrcode** - QR code generation

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **html5-qrcode** - QR scanner
- **Vanilla CSS** - Styling

## Project Structure

```
attendance-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── sessionController.js
│   │   └── attendanceController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Session.js
│   │   └── Attendance.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── sessionRoutes.js
│   │   └── attendanceRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── TeacherDashboard.jsx
    │   │   ├── CreateSession.jsx
    │   │   ├── SessionDetails.jsx
    │   │   ├── StudentDashboard.jsx
    │   │   └── ScanQR.jsx
    │   ├── utils/
    │   │   ├── api.js
    │   │   └── auth.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update `MONGODB_URI` with your MongoDB connection string
   - Update `JWT_SECRET` with a secure secret key

4. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - The `.env` file is already configured for local development
   - Update `VITE_API_URL` if your backend runs on a different port

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Usage

### For Teachers

1. **Register/Login**
   - Create an account with role "Teacher"
   - Login with your credentials

2. **Create Session**
   - Click "Create New Session"
   - Enter session title, subject, and duration
   - A unique QR code will be generated

3. **Share QR Code**
   - Display the QR code to students
   - Students can scan it to mark attendance

4. **Monitor Attendance**
   - View real-time attendance list
   - See who has marked attendance
   - Export or manage records

### For Students

1. **Register/Login**
   - Create an account with role "Student"
   - Login with your credentials

2. **Mark Attendance**
   - Click "Scan QR Code"
   - Allow camera access
   - Scan the teacher's QR code
   - Get instant confirmation

3. **View History**
   - Check your attendance records
   - View subject-wise statistics
   - Track your attendance percentage

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Sessions (Teacher)
- `POST /api/sessions` - Create new session
- `GET /api/sessions` - Get all teacher's sessions
- `GET /api/sessions/:id` - Get session details
- `DELETE /api/sessions/:id` - Delete session
- `PUT /api/sessions/:id/toggle` - Toggle session status

### Attendance
- `POST /api/attendance/mark` - Mark attendance (Student)
- `GET /api/attendance/session/:sessionId` - Get session attendance (Teacher)
- `GET /api/attendance/student` - Get student's attendance history
- `GET /api/attendance/student/stats` - Get student statistics

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control
- Protected routes
- Session expiration
- Duplicate attendance prevention

## Design Features

- Modern dark theme
- Responsive design
- Smooth animations
- Glassmorphism effects
- Real-time updates
- Loading states
- Error handling
- Empty states

## Future Enhancements

- [ ] Export attendance to CSV/Excel
- [ ] Email notifications
- [ ] Geolocation verification
- [ ] Multiple QR codes per session
- [ ] Attendance reports and analytics
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Bulk session creation
- [ ] Attendance percentage calculator
- [ ] Admin dashboard

## License

MIT

## Author

Created with ❤️ for classroom attendance management
