
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useUserAuth } from '../../hooks/useUserAuth.jsx';
// import axiosInstance from '../../utils/axiosInstance.js';
// import { API_PATHS } from '../../utils/apiPaths.js';

// const Home = () => {
//   useUserAuth();
//   const navigate = useNavigate();
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(false);


//   const fetchDashboardData = async () => {
//     if (loading) return;
//     setLoading(true);

//     try {
//       const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
//       if (response.data) {
//         setDashboardData(response.data);
//       } else {
//         setDashboardData({ totalSessions: 0, publishedCount: 0, draftCount: 0 });
//       }
//     } catch (error) {
//       console.error("Error loading dashboard data:", error);
//       setDashboardData({ totalSessions: 0, publishedCount: 0, draftCount: 0 }); // fallback for new users
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   return (
    
//       <div className="my-10 px-4 flex flex-col items-center text-center">

//         <h1 className="text-3xl font-semibold text-green-800 mb-6">Welcome to your Dashboard</h1>

//         {loading ? (
//           <p className="text-blue-500">Loading dashboard data...</p>
//         ) : dashboardData?.totalSessions === 0 ? (
//           <div className="bg-gradient-to-br from-[#fff7ec] to-[#e0f7f1] border border-gray-200 rounded-xl shadow-md px-6 py-5 max-w-lg">

//             <p className="text-yellow-800">You haven't created any sessions yet.</p>
//             <button
//               onClick={() => navigate('/editor')}
//                className="mt-4 bg-green-600 text-white font-medium px-5 py-2 rounded-lg hover:bg-green-700 transition"
//             >
//               Create Your First Session
//             </button>
//           </div>
//         ) : dashboardData ? (
//           <div className="bg-gradient-to-br from-[#e0f7f1] to-[#fff7ec] border border-gray-200 rounded-xl shadow-md px-6 py-5 max-w-lg">

//             <p className="mb-2"><strong>Total Sessions:</strong> {dashboardData.totalSessions}</p>
//             <p className="mb-2"><strong>Published:</strong> {dashboardData.publishedCount}</p>
//             <p className="mb-2 text-lg text-gray-800"><strong>Drafts:</strong> {dashboardData.draftCount}</p>
//           </div>
//         ) : (
//           <p className="text-gray-500">No data available.</p>
//         )}
//       </div>
//   );
// };

// export default Home;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../hooks/useUserAuth.jsx';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) {
        setDashboardData(response.data);
        setSessions(response.data.sessions || []);
      } else {
        setDashboardData({ totalSessions: 0, publishedCount: 0, draftCount: 0 });
        setSessions([]);
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      setDashboardData({ totalSessions: 0, publishedCount: 0, draftCount: 0 });
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="my-10 px-4 flex flex-col items-center text-center">
        <h1 className="text-3xl font-semibold text-green-800 mb-6">Welcome to your Dashboard</h1>
        <p className="text-blue-500">Loading dashboard data...</p>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="my-10 px-4 flex flex-col items-center text-center">
        <h1 className="text-3xl font-semibold text-green-800 mb-6">Welcome to your Dashboard</h1>
        <p className="text-red-500">Error: Unable to load dashboard data.</p>
      </div>
    );
  }

  return (
    <div className="my-10 px-4 flex flex-col items-center text-center">
      <h1 className="text-3xl font-semibold text-green-800 mb-6">Welcome to your Dashboard</h1>

      {dashboardData.totalSessions === 0 ? (
        <div className="bg-gradient-to-br from-[#fff7ec] to-[#e0f7f1] border border-gray-200 rounded-xl shadow-md px-6 py-5 max-w-lg">
          <p className="text-yellow-800">You haven't created any sessions yet.</p>
          <button
            onClick={() => navigate('/editor')}
            className="mt-4 bg-green-600 text-white font-medium px-5 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Create Your First Session
          </button>
        </div>
      ) : (
        <>
          <div className="bg-gradient-to-br from-[#e0f7f1] to-[#fff7ec] border border-gray-200 rounded-xl shadow-md px-3 py-3 max-w-lg w-full">
            <p className="mb-2  text-gray-800">
              <strong>Total Sessions:</strong> {dashboardData.totalSessions}
            </p>
            <p className="mb-2  text-gray-800">
              <strong>Published:</strong> {dashboardData.publishedCount}
            </p>
            <p className=" text-gray-800">
              <strong>Drafts:</strong> {dashboardData.draftCount}
            </p>
          </div>

          {sessions.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold text-green-700 mt-10 mb-4">Your Published Sessions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {sessions.map((session) => (
                  <div
                    key={session._id}
                    className="bg-white rounded-xl shadow-md border border-gray-200 p-5 text-left transition hover:shadow-lg"
                  >
                    <h3 className="text-lg font-semibold text-green-800">{session.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Tags: {session.tags?.length ? session.tags.join(', ') : 'None'}
                    </p>
                    <a
                      href={session.json_file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-green-700 hover:underline text-sm"
                    >
                      View JSON File →
                    </a>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
