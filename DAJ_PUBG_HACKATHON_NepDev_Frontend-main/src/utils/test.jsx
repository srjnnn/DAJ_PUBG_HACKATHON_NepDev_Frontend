
import React, {useState, useEffect} from "react";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Landing from './pages/auth/Landing';
import SignUp from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Qna from './pages/Qna'
import Home from "./pages/user/Home";
import OtpPage from "./pages/auth/OtpPage";
import VolunteerLogin from "./pages/auth/Vol-Login";
import VolunteerDashboard from "./pages/volunteer/dashboard";
import SessionManagement from "./pages/volunteer/SessionManagement";
import Session from "./pages/user/Session";
import Call from "./pages/caller";
import Explore from "./pages/volunteer/Explore";



import UserProfile from "./pages/user/User-profile";
import apiRequest from './utils/api';
import { apiRoutes } from './utils/globalConstraints';

const Layout = ({ children }) => (
  <>
    <Nav />
    {children}
  </>
);



const App = () => {
  const [isLoggedin, setIsLoggedin] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const authToken = localStorage.getItem('token');
      if (!authToken) {
        setIsLoggedin(false);
        return;
      }
      const response = await apiRequest(apiRoutes.auth.validate, 'POST', { token: authToken });
      setIsLoggedin(response.authenticated);//returns in true or false
    };
    checkAuthStatus();
  }, []);
  
  if (isLoggedin === null) {
    return <div>Validating...</div>;
  }

  if (!isLoggedin) {
    const publicRoutes = createBrowserRouter([
      {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/otppage',
    element: <OtpPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/vol-login',
    element: <VolunteerLogin />,
  },
  {
    path: '*',
    element: (
      <div className="text-center mt-10 font-bold">
        404 - Page Not Found
      </div>
    ),
  },
    ]);
    return <RouterProvider router={publicRoutes} />;
  }
  const protectedRoutes = createBrowserRouter([
{
    path: '/profile',
    element: <UserProfile />,
  },
  {
    path: '/QNA',
    element: <Qna/>,
  },
  {
    path: '/session',
    element: <Session />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/vol-home',
    element: <VolunteerDashboard />,
  },
  {
    path: '/vol-session',
    element: <SessionManagement />,
  },
  {
    path: '/vol-session',
    element: <Explore />,
  },
  {
    path: '/call',
    element: <Call />,
  },
  {
    path: '*',
    element: (
      <div className="text-center mt-10 font-bold">
        404 - Page Not Found
      </div>
    ),
  },
    ]);

  return <RouterProvider router={protectedRoutes} />
}


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registered!', reg))
      .catch(err => console.log('Service Worker failed:', err));
  });
}


export default App;