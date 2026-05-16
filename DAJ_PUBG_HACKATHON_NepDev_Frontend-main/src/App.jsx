import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './pages/auth/Landing';
import SignUp from './pages/auth/Signup';
import OtpPage from "./pages/auth/OtpPage";
import Login from './pages/auth/Login';
import VolunteerLogin from "./pages/auth/Vol-Login";
import ForgotPassword from "./pages/auth/ForgotPassword"

import UserProfile from "./pages/user/User-profile";
import Explore from "./pages/user/Home";
import Session from "./pages/user/Session";

import VolunteerDashboard from "./pages/volunteer/dashboard";
import VolunteerExplore from "./pages/volunteer/Explore";
import SessionManagement from "./pages/volunteer/SessionManagement";

import Qna from './pages/Qna'
import Call from "./pages/caller";
import Feedback from "./pages/user/Feedback";


import ProtectedRoute from './route/ProtectedRoute';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public / Normal Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otppage" element={<OtpPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/vol-login" element={<VolunteerLogin />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />
        <Route
          path="/session"
          element={
            <ProtectedRoute>
              <Session />
            </ProtectedRoute>
          }
        />


        <Route
          path="/vol-dashboard"
          element={
            <ProtectedRoute>
              <VolunteerDashboard />
            </ProtectedRoute>
          }
        /> 
        <Route
          path="/vol-explore"
          element={
            <ProtectedRoute>
              <VolunteerExplore />
            </ProtectedRoute>
          }
        /> 
        <Route
          path="/vol-sessionmanagement"
          element={
            <ProtectedRoute>
              <SessionManagement />
            </ProtectedRoute>
          }
        />



        <Route
          path="/qna"
          element={
            <ProtectedRoute>
              <Qna />
            </ProtectedRoute>
          }
        />
        <Route
          path="/call"
          element={
            <ProtectedRoute>
              <Call />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registered!', reg))
      .catch(err => console.log('Service Worker failed:', err));
  });
}



