import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Home from './pages/dashboard/Home'
import UserProvider from './context/UserContext.jsx'
import MySessions from './pages/dashboard/MySessions.jsx'
import SessionEditor from './pages/dashboard/SessionEditor.jsx'
import PrivateRoute from './context/PrivateRoute.jsx'

const Root = () => {
  //check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem('token');
  //redirect to dashboard if authenticated, otherwise redirect to login
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
           <Route path="/dashboard" exact element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/my-sessions" exact element ={<PrivateRoute><MySessions/></PrivateRoute>}/>
          <Route path="/editor" exact element ={<PrivateRoute><SessionEditor/></PrivateRoute>}/>
          <Route path="/editor/:id?" exact element ={<PrivateRoute><SessionEditor/></PrivateRoute>}/>
          
        </Routes>
      </Router>
    </div>
    </UserProvider>
  );
};

export default App;

