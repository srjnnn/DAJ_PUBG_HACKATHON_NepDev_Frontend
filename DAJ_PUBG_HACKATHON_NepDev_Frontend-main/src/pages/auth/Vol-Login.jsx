import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function VolunteerLogin() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {                    
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Form validation
  const validateForm = () => {
    let newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate inputs first
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setError(Object.values(validationErrors)[0]); // Show first error
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/volunteer/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        const { authToken } = data; 
        localStorage.setItem("token", data.authToken);
        const volData = data.user.volunteerDetails;
        localStorage.setItem("volData", JSON.stringify(volData));
        navigate("/vol-explore");
      } else {
        setError(data.message || "Invalid username or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#DBE8F4] to-purple-200 h-dvh flex flex-col justify-between">
      <div className="w-screen h-dvh flex flex-col items-center justify-between pt-5">
        <div className="flex flex-row items-center justify-between w-full px-5">
          <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate("/")} className="cursor-pointer" />
          <img src="/logo.png" alt="" className="w-60" />
          <div className="w-5"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 border-2 bg-white border-gray-300 rounded-xl p-6 max-w-md">
          {error && <p className="text-red-500 text-center">{error}</p>}

          <h1 className="text-center text-3xl font-bold mt-2 mb-5">Volunteer Login</h1>

          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />

          <div className="relative">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-3 text-gray-500 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="h-30"></div>
      </div>
    </div>
  );
}
