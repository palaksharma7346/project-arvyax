
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { API_PATHS } from '../../utils/apiPaths';
// import axiosInstance from '../../utils/axiosInstance';
// import SessionCard from '../../compnents/Cards/SessionCard';

// export default function MySessions() {
//   const [sessions, setSessions] = useState([]);
//   const [selectedSession, setSelectedSession] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchSessions();
//   }, []);

//   const fetchSessions = async () => {
//     try {
//       const res = await axiosInstance.get(API_PATHS.SESSIONS.MY_SESSIONS);
//       setSessions(res.data);
//     } catch (err) {
//       console.error('Failed to fetch sessions', err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this session?')) return;
//     try {
//       await axiosInstance.delete(`${API_PATHS.SESSIONS.MY_SESSIONS}/${id}`);
//       setSessions(prev => prev.filter(session => session._id !== id));
//     } catch (err) {
//       console.error('Failed to delete session:', err);
//       alert('Delete failed');
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-semibold text-gray-800 mb-6">My Sessions</h2>

//       {selectedSession && (
//         <div className="mb-6">
//           <SessionCard session={selectedSession} onClose={() => setSelectedSession(null)} />
//         </div>
//       )}

//       {sessions.length === 0 ? (
//         <p className="text-gray-500 text-lg">No sessions found.</p>
//       ) : (
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//           {sessions.map(session => (
//             <div key={session._id} className="bg-white border shadow-sm p-5 rounded-lg hover:shadow-md transition">
//               <h3
//                 onClick={() => setSelectedSession(session)}
//                 className="text-xl font-bold text-blue-600 cursor-pointer hover:underline"
//               >
//                 {session.title}
//               </h3>
//               <p className="text-sm mt-2 text-gray-600">
//                 Status: <span className={`capitalize font-medium ${session.status === 'published' ? 'text-green-600' : 'text-yellow-600'}`}>
//                   {session.status}
//                 </span>
//               </p>

//               <div className="flex gap-4 mt-4">
//                 <button
//                   onClick={() => navigate(`/editor/${session._id}`)}
//                   className="text-sm px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(session._id)}
//                   className="text-sm px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import SessionCard from '../../compnents/Cards/SessionCard';

export default function MySessions() {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.SESSIONS.MY_SESSIONS);
      setSessions(res.data);
    } catch (err) {
      console.error('Failed to fetch sessions', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this session?')) return;
    try {
      await axiosInstance.delete(`${API_PATHS.SESSIONS.MY_SESSIONS}/${id}`);
      setSessions(prev => prev.filter(session => session._id !== id));
    } catch (err) {
      console.error('Failed to delete session:', err);
      alert('Delete failed');
    }
  };

  return (
    <div className="my-10 px-4 flex flex-col items-center text-center">
      <h2 className="text-3xl font-semibold text-green-800 mb-6">My Sessions</h2>

      {selectedSession && (
        <div className="mb-6 w-full max-w-3xl">
          <SessionCard session={selectedSession} onClose={() => setSelectedSession(null)} />
        </div>
      )}

      {sessions.length === 0 ? (
        <p className="text-gray-500 text-lg">No sessions found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {sessions.map(session => (
            <div
              key={session._id}
              className="bg-gradient-to-br from-[#e0f7f1] to-[#fff7ec] border border-gray-200 rounded-xl shadow-md p-5 text-left transition hover:shadow-lg"
            >
              <h3
                onClick={() => setSelectedSession(session)}
                className="text-xl font-bold text-green-800 cursor-pointer hover:underline"
              >
                {session.title}
              </h3>

              <p className="text-sm mt-2 text-gray-700">
                Status:{' '}
                <span
                  className={`capitalize font-semibold ${
                    session.status === 'published'
                      ? 'text-green-700'
                      : 'text-yellow-700'
                  }`}
                >
                  {session.status}
                </span>
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => navigate(`/editor/${session._id}`)}
                  className="text-sm px-4 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  Edit
                </button>
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
