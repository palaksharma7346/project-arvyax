// src/components/SessionCard.jsx
import React from 'react';

export default function SessionCard({ session, onClose }) {
  if (!session) return null;

  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">{session.title}</h3>
        <button onClick={onClose} className="text-red-500 font-semibold">Close</button>
      </div>
      <p><strong>Status:</strong> {session.status}</p>
      <p><strong>Tags:</strong> {session.tags?.join(', ')}</p>
      {session.json_file_url && (
        <p><strong>JSON File:</strong> <a href={session.json_file_url} target="_blank" rel="noreferrer" className="text-blue-500 underline">View JSON</a></p>
      )}
    </div>
  );
}
