import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Home from './pages/dashboard/Home'
import UserProvider from './context/UserContext.jsx'
import MySessions from './pages/dashboard/MySessions.jsx'
import SessionEditor from './pages/dashboard/SessionEditor.jsx'
import PrivateRoute from './context/PrivateRoute.jsx'
import Navbar from './compnents/layouts/Navbar.jsx'
import { useLocation } from "react-router-dom";
import About from './pages/About.jsx';

const Root = () => {
  //check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem('token');
  //redirect to dashboard if authenticated, otherwise redirect to login
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

const Appcont = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/signup','/about'];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
  return (
    
    <div>
      
        {!shouldHideNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
           <Route path="/dashboard" exact element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/my-sessions" exact element ={<PrivateRoute><MySessions/></PrivateRoute>}/>
          <Route path="/editor" exact element ={<PrivateRoute><SessionEditor/></PrivateRoute>}/>
          <Route path="/editor/:id?" exact element ={<PrivateRoute><SessionEditor/></PrivateRoute>}/>
          <Route path="/about" element={<About />} />

          
        </Routes>
      
    </div>
    
  );
};
const App = () => {
  return (
    <UserProvider>
      <Router>
        <Appcont />
      </Router>
    </UserProvider>
  );
};
export default App;

