// SessionManagement.jsx
import { useState } from "react";
import Header from "../../components/header";
import VolNav from "../../components/VolNav";

const initialSessions = [
  {
    id: 1,
    category: "Students",
    language: "Nepali",
    time: "10:00 AM",
    coModerators: [],
  },
  {
    id: 2,
    category: "Migrants' Wives",
    language: "Maithili",
    time: "11:30 AM",
    coModerators: ["Volunteer1"],
  },
];

export default function SessionManagement({ goBack }) {
  const [sessions, setSessions] = useState(initialSessions);
  const [newSession, setNewSession] = useState({
    category: "",
    language: "",
    time: "",
    coModerators: "",
  });
  const [editId, setEditId] = useState(null);

  const handleAddOrEdit = () => {
    if (!newSession.category || !newSession.language || !newSession.time)
      return;

    if (editId !== null) {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === editId
            ? {
                ...s,
                ...newSession,
                coModerators: newSession.coModerators.split(","),
              }
            : s
        )
      );
      setEditId(null);
    } else {
      const id = sessions.length ? sessions[sessions.length - 1].id + 1 : 1;
      setSessions([
        ...sessions,
        { ...newSession, id, coModerators: newSession.coModerators.split(",") },
      ]);
    }

    setNewSession({ category: "", language: "", time: "", coModerators: "" });
  };

  const handleEdit = (session) => {
    setEditId(session.id);
    setNewSession({ ...session, coModerators: session.coModerators.join(",") });
  };

  const handleDelete = (id) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Header id="volunteer"/>
      <h1 className="text-3xl font-bold mb-8 mt-8 text-blue-700">
        Session Management
      </h1>

      {/* Add/Edit Session Form */}
      <div className="bg-white p-6 rounded shadow-md mb-8 mt-8">
        <h2 className="text-xl font-semibold mb-4">
          {editId !== null ? "Edit Session" : "Add New Session"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Category"
            className="border p-2 rounded w-full"
            value={newSession.category}
            onChange={(e) =>
              setNewSession({ ...newSession, category: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Language"
            className="border p-2 rounded w-full"
            value={newSession.language}
            onChange={(e) =>
              setNewSession({ ...newSession, language: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Time (e.g., 10:00 AM)"
            className="border p-2 rounded w-full"
            value={newSession.time}
            onChange={(e) =>
              setNewSession({ ...newSession, time: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Co-Moderators (comma separated)"
            className="border p-2 rounded w-full"
            value={newSession.coModerators}
            onChange={(e) =>
              setNewSession({ ...newSession, coModerators: e.target.value })
            }
          />
        </div>
        <button
          className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
          onClick={handleAddOrEdit}
        >
          {editId !== null ? "Update Session" : "Add Session"}
        </button>
        <button
          className="ml-4 px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          onClick={goBack}
        >
          &lt;--Dashboard
        </button>
      </div>

      {/* Sessions Grid */}
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Existing Sessions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <p className="text-sm text-gray-500">ID: {s.id}</p>
              <h3 className="text-lg font-semibold">{s.category}</h3>
              <p className="text-gray-700">Language: {s.language}</p>
              <p className="text-gray-700">Time: {s.time}</p>
              <p className="text-gray-700">
                Co-Moderators: {s.coModerators.join(", ")}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  className="px-3 py-1 bg-blue-700 text-white rounded hover:bg-blue-800"
                  onClick={() => handleEdit(s)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDelete(s.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <VolNav />
      </div>
    </div>
  );
}
