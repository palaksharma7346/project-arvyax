import React, { useState, useContext } from 'react'
import AuthLayout from '../../compnents/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../compnents/inputs/Input';
import { validateEmail } from '../../utils/helper';

import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext.jsx';
import bg2 from '../../assets/images/bg2.png';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const{updateUser}= useContext(UserContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    console.log("Login request being sent:");
console.log("URL:", API_PATHS.AUTH.LOGIN);
console.log("Email:", email);
console.log("Password:", password);

    e.preventDefault()

    if(!validateEmail(email)){
      setError('Please enter a valid email address');
      return;
    }
    if(!password){
      setError('Please enter your password');
      return;
    }

    setError(null);

    //login api call
    try{
      console.log("BASE_URL from axiosInstance:", axiosInstance.defaults.baseURL);
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      });
      const { token, user } = response.data;
      if(token){
        localStorage.setItem('token', token);
        updateUser(user); // Update user context with the logged-in user data
        navigate('/dashboard'); // Redirect to dashboard after successful login
      }
      
    }
    catch(error){
      if(error.response && error.response.data) {
        setError(error.response.data.message || 'Login failed. Please try again.');
      }
      else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }



  }

  return (
  
   
  /* Your login content */

    
 <div className="relative w-screen min-h-screen overflow-y-auto">
  <img
    src={bg2}
    alt="background"
    className="absolute inset-0 w-full h-full object-cover z-0"
  />

    <div className='flex relative z-0'>
      <div className='w-screen min-h-screen px-4 pt-4 pb-12 overflow-y-auto'>
        <h2 className='text-3xl font-semibold text-green-900'>Wellnest</h2>

      <div className='w-full max-w-lg md:max-w-3xl h-auto mt-10 mx-auto flex flex-col items-center rounded-xl justify-center bg-gradient-to-br from-[#e0f7f1] to-[#fff7ec] p-6'>
        <h3 className='text-2xl mt-4 font-semibold text-black'>Welcome back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your credentials to continue.</p>
        <form onSubmit={handleLogin}>
          <Input 
          value ={email}
          onChange ={({target})=>setEmail(target.value)} 
          label="Email address"
          placeholder="Enter your email"
          type = 'text'
          />
          <Input
          value ={password}
          onChange ={({target})=>setPassword(target.value)} 
          label="Password"
          placeholder="Enter your password"
          type = 'password'
          />
          {error && <p className='text-red-500 text-sm pb-2.5'>{error}</p>}
          <button type='submit' className='btn-primary'>
            Login
          </button>
          <p className='text-[13px] text-slate-800 mb-4 mt-3'>Don't have an account? {""}
            <Link to="/signup" className='text-primary font-semibold underline'>Sign up</Link>
          </p>
        </form>
      </div>
    </div>
    </div>
  </div>


  )
}

export default Login
