// import React from 'react'
// import DashboardLayout from '../../compnents/layouts/DashboardLayout.jsx'
// import { useUserAuth } from '../../hooks/useUserAuth.jsx';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import axiosInstance from '../../utils/axiosInstance.js';
// import { API_PATHS } from '../../utils/apiPaths.js';
// import { useEffect } from 'react';

// const Home = () => {
//   useUserAuth();
//   const naviagte = useNavigate();
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading,setLoading] = useState(false);

//   const fetchDashboardData = async ()=>{
//     if(loading) return;
//     setLoading(true);
//     try{
//       const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
//       if(response.data){
//         setDashboardData(response.data);
//       }
//     }
//     catch(error){
//       console.log("something went wrong. Please try again ",error)
//     }
//     finally{
//       setLoading(false);
//     }
//   };
//   useEffect(()=>{
//     fetchDashboardData();
//     return ()=>{};
//   },[]);

//   return (
//    <DashboardLayout activeMenu = "Dashboard">
//     <div className='my-5 mx-auto'>
//       home
//     </div>
//    </DashboardLayout>
//   )
// }

// export default Home
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../compnents/layouts/DashboardLayout.jsx';
import { useUserAuth } from '../../hooks/useUserAuth.jsx';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) {
        setDashboardData(response.data);
      } else {
        setDashboardData({ totalSessions: 0, publishedCount: 0, draftCount: 0 });
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      setDashboardData({ totalSessions: 0, publishedCount: 0, draftCount: 0 }); // fallback for new users
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>

        {loading ? (
          <p className="text-blue-500">Loading dashboard data...</p>
        ) : dashboardData?.totalSessions === 0 ? (
          <div className="bg-yellow-50 p-4 rounded shadow-md border max-w-md">
            <p className="text-yellow-800">You haven't created any sessions yet.</p>
            <button
              onClick={() => navigate('/editor')}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create Your First Session
            </button>
          </div>
        ) : dashboardData ? (
          <div className="p-4 border rounded bg-white shadow-md max-w-md">
            <p className="mb-2"><strong>Total Sessions:</strong> {dashboardData.totalSessions}</p>
            <p className="mb-2"><strong>Published:</strong> {dashboardData.publishedCount}</p>
            <p><strong>Drafts:</strong> {dashboardData.draftCount}</p>
          </div>
        ) : (
          <p className="text-gray-500">No data available.</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Home;
