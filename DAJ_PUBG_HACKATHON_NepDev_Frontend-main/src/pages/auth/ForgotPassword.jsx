import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const apiUrl =
    "https://daj-pubg-hackathon-nepdev-backend-5xg1.onrender.com/api/v1";

  // ✅ States
  const [form, setForm] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = { email: form.email };

      console.log("Sending OTP request:", payload);

      const response = await fetch(`${apiUrl}/reset/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("OTP sent to your email.");
        // Navigate to OTP page with email info
        navigate("/otppage", {
          state: { email: payload.email, type: "reset" },
        });
      } else {
        setError(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#DBE8F4] to-purple-200 h-dvh flex flex-col justify-between">
      <div className="w-screen h-dvh flex flex-col items-center justify-between pt-5">
        {/* Header with back button */}
        <div className="flex flex-row items-center justify-between w-full px-5">
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={() => navigate("/login")}
            className="cursor-pointer"
          />
          <img src="/logo.png" alt="logo" className="w-60" />
          <div className="w-5"></div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 border-2 bg-white border-gray-300 rounded-xl p-6 max-w-md w-full"
        >
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}

          <h1 className="text-center text-2xl font-bold mb-4">
            Change Your Password
          </h1>

          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div className="mt-8 mb-5">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Generating OTP..." : "Send OTP"}
            </button>
          </div>
        </form>

        <div className="h-40"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;
