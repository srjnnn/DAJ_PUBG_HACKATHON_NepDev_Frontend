import { useState } from "react";
import VolNav from '../../components/VolNav.jsx';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header.jsx'; 
import LogoutButton from '../../components/LogoutButton.jsx';
import CircularProgress from './CicularProgress.jsx'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const sampleSessions = [
  { id: 1, category: "Students", language: "Nepali", time: "10:00 AM", status: "Upcoming" },
  { id: 2, category: "Migrants' Wives", language: "Maithili", time: "11:30 AM", status: "Upcoming" },
];
const VolunteerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("join");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState(""); // State for user feedback message
  const userData = JSON.parse(localStorage.getItem("volData"));
  return (
    <div className="min-h-dvh bg-gradient-to-b from-gray-100 to-gray-200 p-4 flex flex-col items-center">
      <div className="w-full max-w-lg">
        {" "}
        {/* This div centers the content and limits its width */}
        <Header id="volunteer"/>
        <div className="Profile-container m-2 mt-8 mb-8 bg-white shadow rounded-2xl h-50 p-3">
          <h1 className="font-bold text-2xl ">
            
            Volunteer Details: </h1>
          <div className="flex flex-col justify-evenly h-38">
            <h2 className="text-xl ml-2 mt-2">
              Username: <span className="text-blue-700">{userData.name}</span>
            </h2>
            <h3 className="text-xl ml-2 mt-2">
              Email: <span className="text-blue-700">{userData.email}</span>
            </h3>
            <h2 className="text-xl ml-2 mt-2">
              Organization: <span className="text-blue-700">Volunteers Initiative Nepal</span>
            </h2>
          </div>
        </div>
        {/* Navigation Tabs - Added consistent spacing and centered alignment */}
        <div className="flex space-x-2 mb-6 mt-4 justify-center overflow-x-auto">
          {["join", "sessions"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full flex-shrink-0 font-medium transition-all duration-200 shadow-md ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-blue-300"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => {
                setActiveTab(tab);
                setMessage(""); // Clear message when switching tabs
              }}
            >
              {tab === "join"
                ? "Volunteer Stats"
                : tab === "sessions"
                ? "Scheduled Sessions"
                : "Feedback & Notes"}
            </button>
          ))}
        </div>
        {/* Content Area - Added more padding and consistent rounded corners */}
        <div className="bg-white p-6 rounded-2xl shadow-xl flex-1 overflow-auto">
          {message && (
            <div className="bg-green-100 text-green-700 p-3 mb-4 rounded-xl text-center font-medium">
              {message}
            </div>
          )}

          {/* Join Peer Group */}
          {activeTab === "join" && (
            <div>
              <div className="flex justify-between">
                <CircularProgress value={20}/>
                <div className="w-[70%] flex flex-col justify-between ">
                  <h2 className="text-xl font-bold">Total hours volunteered: {20} hrs.</h2>
                  <h2 className="text-xl font-bold">Total Rating Earned: {4.5}/{5}</h2>
                </div>
              </div>
            </div>
          )}

          {/* Scheduled Sessions */}
          {activeTab === "sessions" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Scheduled Sessions
              </h2>
              {sampleSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-gray-50 p-4 rounded-xl shadow-md hover:shadow-lg transition flex flex-col gap-2 border border-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">
                      {session.category}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {session.time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600 text-sm">
                    <span>{session.language}</span>
                    <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-full">
                      {session.status}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate("/audio-chat")}
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

        

        {/* commit khako maile */}
        <div className="mt-4">
          <VolNav />
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
