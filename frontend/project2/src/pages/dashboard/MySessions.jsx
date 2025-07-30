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
    <div>
      <h2 className="text-2xl mb-4">My Sessions</h2>

      {selectedSession && (
        <div className="mb-6">
          <SessionCard session={selectedSession} onClose={() => setSelectedSession(null)} />
        </div>
      )}

      {sessions.length === 0 ? (
        <p className="text-gray-500">No sessions found.</p>
      ) : (
        sessions.map(session => (
          <div key={session._id} className="border p-4 mb-2 rounded bg-gray-50">
            <h3
              onClick={() => setSelectedSession(session)}
              className="font-bold text-lg text-blue-600 cursor-pointer hover:underline"
            >
              {session.title}
            </h3>
            <p>Status: <span className="capitalize">{session.status}</span></p>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => navigate(`/editor/${session._id}`)}
                className="text-blue-500 underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(session._id)}
                className="text-red-500 underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}