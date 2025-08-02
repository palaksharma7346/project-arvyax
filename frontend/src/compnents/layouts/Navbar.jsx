// import React, { useState } from 'react'
// import {HiOutlineMenu, HiOutlineX} from "react-icons/hi";
// import SideMenu from "./SideMenu"
// const Navbar = ({activeMenu}) => {
//   const [openSidemenu , setOpenSidemenu] = useState(false);
//   return (
//     <div className='flex gap-5 bg-white corder border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30'>
//       <button className='block lg:hidden text-black'
//       onClick={()=>{
//         setOpenSidemenu(!openSidemenu);
//       }}
//       >
//         {openSidemenu ? (
//           <HiOutlineX className='text-2xl'/>
//         ):(
//           <HiOutlineMenu className='text-2xl'/>
//         )}
//         </button>
//         <h2 className='x text-lg font-medium text-green-900'>WellNest</h2>
//         {openSidemenu && (
//           <div className='fixed top-[61px] -ml-4 bg-white'>
//             <SideMenu activeMenu = {activeMenu}/>
//           </div>
//         )}
      
//     </div>
//   )
// }

// export default Navbar
import React, { useState, useContext } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import SideMenu from './SideMenu';
import { SIDE_MENU_DATA } from '../../utils/data';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Navbar = ({ activeMenu }) => {
  const [openSidemenu, setOpenSidemenu] = useState(false);
  const navigate = useNavigate();
  const {user, clearUser } = useContext(UserContext);

  const handleClick = (path) => {
    if (path === '/logout') {
      localStorage.clear();
      clearUser();
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Mobile menu toggle */}
          <button className="block lg:hidden" onClick={() => setOpenSidemenu(!openSidemenu)}>
            {openSidemenu ? (
              <HiOutlineX className="text-2xl" />
            ) : (
              <HiOutlineMenu className="text-2xl" />
            )}
          </button>

          {/* Logo */}
          <h2 className="text-xl font-semibold text-green-800">WellNest</h2>
        </div>

        {/* Desktop side menu links */}
        <div className="hidden lg:flex gap-6 items-center">
          
          {SIDE_MENU_DATA.map((item, index) => (
            <button
              key={`nav_${index}`}
              onClick={() => handleClick(item.path)}
              className={`flex items-center gap-2 px-3 py-1 text-sm rounded-md transition-all duration-200 ${
                activeMenu === item.label
                  ? 'bg-black text-white'
                  : 'text-gray-700 hover:text-black hover:bg-gray-100'
              }`}
            >
              <item.icon className="text-base" />
              {item.label}
            </button>
          ))}
           <h5 className='text-gray-950 font-medium leading-6'>
          {user?.fullName || ""}
        </h5>
        </div>
      </div>

      {/* Slide-out side menu for mobile */}
      {openSidemenu && (
        <div className="fixed inset-0 bg-black bg-opacity-30 " onClick={() => setOpenSidemenu(false)}>
          <div
            className="absolute top-0 left-0 h-full w-64 bg-white shadow-md "
            onClick={(e) => e.stopPropagation()}
          >
            <SideMenu activeMenu={activeMenu} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
