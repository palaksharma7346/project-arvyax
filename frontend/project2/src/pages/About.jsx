import React from "react";
 import { Link } from 'react-router-dom';
const About = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-12 md:px-20 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-6">About WellNest</h1>
        <p className="text-lg mb-4">
          <strong>WellNest</strong> is your personal companion for mental clarity and mindful living.
          Whether you're journaling your thoughts, organizing your wellness sessions, or reflecting on your emotions — WellNest provides a calm and structured space for it all.
        </p>
        <p className="text-lg mb-4">
          We believe that mental health should be a priority, not a luxury. That’s why WellNest is designed to be easy to use, safe, and entirely focused on **you**.
        </p>
        <p className="text-lg mb-4">
          With features like:
        </p>
        <ul className="list-disc list-inside mb-4 text-lg">
          <li>🧘 Guided journaling sessions</li>
          <li>📊 Progress tracking and mood insights</li>
          <li>🔒 Private and secure notes</li>
          <li>💡 A soothing, distraction-free interface</li>
        </ul>
        <p className="text-lg">
          Start your wellness journey today — one session at a time. 🌿
        </p>

      </div>
      <div className=" mt-4 text-center">
  <Link to="/signup" className="text-black p-1  bg-green-600 border rounded-full text-xl font-bold hover:underline">
    Signup
  </Link>
</div>
    </div>
  );
};

export default About;
