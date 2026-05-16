import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OtpPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyOtp = async () => {
    setError("");
    if (!otp.trim()) return setError("Enter OTP");

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/signup/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
    email: data.email, // the email used for signup
    code: otp           // the OTP entered by user
  }),

      });
      const data = await res.json();
      if (res.ok) {
        navigate("/login");
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch {
      setError("Something went wrong.");
    }
    setLoading(false);
  };

  return (
      <div className="bg-gradient-to-b from-[#DBE8F4] to-purple-200 rounded-2xl shadow-lg p-8 h-dvh w-screen md:w-80 flex flex-col justify-between items-center">
           <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
        <div>
          <p className="text-sm text-black mb-4">
              Enter OTP sent to <strong>{userData.email}</strong>
            </p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg mb-2"
              placeholder="Enter OTP"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
          
        <button
          onClick={verifyOtp}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>
  );
}
