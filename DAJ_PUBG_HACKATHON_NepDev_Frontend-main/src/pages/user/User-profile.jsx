import { useState } from "react";
import Nav from '../../components/Nav.jsx';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header.jsx'; 
import LogoutButton from '../../components/LogoutButton.jsx';

const sampleSessions = [
  { id: 1, category: "Students", language: "Nepali", time: "10:00 AM", status: "Upcoming" },
  { id: 2, category: "Migrants' Wives", language: "Maithili", time: "11:30 AM", status: "Upcoming" },
];

export default function UserProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("join");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [message, setMessage] = useState(""); 
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="min-h-dvh bg-gradient-to-b from-gray-100 to-gray-200 p-4 flex flex-col items-center">
      <div className="w-full max-w-lg">
        <Header />

        {/* User Details */}
        <div className="Profile-container m-2 mt-8 mb-8 bg-white shadow rounded-2xl h-40 p-3">
          <h1 className="font-bold text-2xl">User Details:</h1>
          <div className="flex flex-col justify-evenly h-28">
            <h2 className="text-xl ml-2 mt-2">Username: <span className="text-blue-700">{userData.name}</span></h2>
            <h3 className="text-xl ml-2">Email: <span className="text-blue-700">{userData.email}</span></h3>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 mt-4 justify-center overflow-x-auto">
          {["join", "sessions", "diagnosis"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full flex-shrink-0 font-medium transition-all duration-200 shadow-md ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-blue-300"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => {
                if (tab === "diagnosis") {
                  navigate("/qna"); // Navigate to quiz page
                } else {
                  setActiveTab(tab);
                  setMessage(""); 
                }
              }}
            >
              {tab === "join" ? "Join Peer Group" : tab === "sessions" ? "Scheduled Sessions" : "Diagnosis"}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white p-6 rounded-2xl shadow-xl overflow-auto">
          {message && (
            <div className="bg-green-100 text-green-700 p-3 mb-4 rounded-xl text-center font-medium">
              {message}
            </div>
          )}

          {/* Join Peer Group */}
          {activeTab === "join" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Select / Join Group</h2>

              <div>
                <label htmlFor="category" className="block mb-1 font-semibold text-gray-600">Category:</label>
                <select
                  id="category"
                  className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="Students">Students</option>
                  <option value="Migrants' Wives">Migrants' Wives</option>
                  <option value="Earthquake Survivors">Earthquake Survivors</option>
                </select>
              </div>

              <div>
                <label htmlFor="language" className="block mb-1 font-semibold text-gray-600">Language:</label>
                <select
                  id="language"
                  className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  <option value="">Select Language</option>
                  <option value="Nepali">Nepali</option>
                  <option value="Maithili">Maithili</option>
                  <option value="Tamang">Tamang</option>
                </select>
              </div>

              <button
                className="w-full py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={() => navigate("/call")}
                disabled={!selectedCategory || !selectedLanguage}                                                                                                               
              >
                Search Session
              </button>
            </div>
          )}

          {/* Scheduled Sessions */}
          {activeTab === "sessions" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Scheduled Sessions</h2>
              {sampleSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-gray-50 p-4 rounded-xl shadow-md hover:shadow-lg transition flex flex-col gap-2 border border-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">{session.category}</span>
                    <span className="text-gray-500 text-sm">{session.time}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600 text-sm">
                    <span>{session.language}</span>
                    <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-full">{session.status}</span>
                  </div>
                  <button
                    onClick={() => navigate("/call")}
                    className="mt-2 w-full py-2 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition shadow"
                  >
                    Join
                  </button>
                </div>
              ))}
            </div>
          )}          
        </div>

 
        <div className="flex justify-center items-center mt-4">
  <LogoutButton className="mt-4" />
</div>

        <div className="mt-4">
          <Nav />
        </div>
      </div>
    </div>
  );
}
