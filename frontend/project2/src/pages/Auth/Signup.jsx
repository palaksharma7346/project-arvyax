import React,{useContext, useState} from 'react'
import AuthLayout from '../../compnents/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../compnents/inputs/Input';
import { validateEmail } from '../../utils/helper';
import Profilepic from '../../compnents/inputs/Profilepic';

import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';
import bg2 from '../../assets/images/bg2.png';
const Signup = () => {
  const [profilepic, setProfilepic] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleSignup = async (e)=>{
    e.preventDefault();
    let profileImageUrl = "";
    if(!name){
      setError('Please enter your full name');
      return;
    }
    if(!validateEmail(email)){
      setError('Please enter a valid email address');
      return;
    }
    if(!password){
      setError('Please enter your password');
      return;
    }
    setError("");

    //signup api call
    try{
      if(profilepic) {
       const imageuploads = await uploadImage(profilepic);
        profileImageUrl = imageuploads.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName:name,
        email,
        password,
        profileImageUrl
       
      });
      const { token, user } = response.data;
      if(token){
        localStorage.setItem('token', token);
        updateUser(user); // Update user context with the signed-up user data
        navigate('/dashboard'); // Redirect to dashboard after successful signup
      }
    }
    catch(error){
      if(error.response && error.response.data.message) {
        setError(error.response.data.message );
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
   
    <div className='w-full max-w-xl md:max-w-4xl h-auto mt-5 mx-auto flex flex-col items-center rounded-xl justify-center bg-gradient-to-br from-[#e0f7f1] to-[#fff7ec] '>
      <h3 className='text-2xl font-bold mt-5 text-black'>Create an account</h3>
      <p className='text-xs text-gray-600 mt-[5px] mb-6'>join us today by entring your details</p>
      <form onSubmit={handleSignup}>
        <div className='   '>
        <Profilepic image = {profilepic} setImage = {setProfilepic}/>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
       
        <Input 
          value={name}
          onChange={({target})=>setName(target.value)} 
          label="Full Name"
          placeholder="Enter your full name"
          type='text'/>
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
        </div>
         {error && <p className='text-red-500 text-sm pb-2.5 flex items-center justify-center'>{error}</p>}
         <div className='flex justify-center'>
                  <button type='submit' className='btn-primary'>
                    Signup
                  </button>
                  </div>
                  <p className='text-[13px] text-slate-800 mb-4 mt-3 px-2'>Already have an account? {""}
                    <Link to="/login" className='text-primary font-semibold underline'>Log in</Link>
                  </p>
      </form>
      
    </div>
  
</div>
</div>
</div>


  )
}

export default Signup
