import { useState } from "react";
import Nav from "../../components/Nav";
import Header from "../../components/header";

const initialSessions = [
  { id: 1, category: "Students", language: "Nepali", time: "10:00 AM", coModerators: [] },
];

export default function Session() {
  const [sessions] = useState(initialSessions);
  const [joinedSession, setJoinedSession] = useState(null); // track the session user joined

  const handleJoin = (id) => {
    setJoinedSession(id); // user joins → show iframe
  };

  const handleLeave = () => {
    setJoinedSession(null); // leave → hide iframe
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4 flex flex-col">
      <Header id="user"/>
      <h1 className="text-3xl text-center font-bold mb-8 mt-8 text-blue-700">
        Available Sessions
      </h1>

      {/* List of sessions */}
      <div className="space-y-4">
        {sessions.map((s) => (
          <div
            key={s.id}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">{s.category}</span>
              <span className="text-gray-500 text-sm">{s.time}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500">{s.language}</span>
              <span className="text-gray-500 text-sm">
                {s.coModerators.length > 0 ? s.coModerators.join(", ") : "-"}
              </span>
            </div>

            <button
              onClick={() => handleJoin(s.id)}
              className={`mt-2 w-full py-2 rounded-full font-semibold text-white transition ${
                joinedSession === s.id
                  ? "bg-green-500 cursor-default"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={joinedSession === s.id}
            >
              {joinedSession === s.id ? "Joined" : "Join"}
            </button>
          </div>
        ))}
      </div>

      {/* If a session is joined, show iframe */}
      {joinedSession && (
        <>
          <button
            onClick={handleLeave}
            className="absolute top-8 left-4 z-50 bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Leave Call
          </button>

          <iframe
            src="https://meet.jit.si/DemoRoom12345"
            style={{
              width: "100%",
              height: "100%",
              border: 0,
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 40,
            }}
            allow="microphone; fullscreen"
            title="Session Call"
          />
        </>
      )}

      <div className="mt-6">
        <Nav />
      </div>
    </div>
  );
}
