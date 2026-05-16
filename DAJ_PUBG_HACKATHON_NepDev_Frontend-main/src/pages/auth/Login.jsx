import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function LoginForm() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Validation function
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

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setError(Object.values(validationErrors)[0]); // show first error
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        const { authToken } = data; 
        const userPayload = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
        };
        
        // Save token for later validation
        localStorage.setItem("token", data.authToken);
        localStorage.setItem("userData", JSON.stringify(userPayload));

        navigate("/explore", { state: { userId: data.userId, email: form.email } });
      } else {
        setError(data.message || "Login failed.");
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
        <div className="flex flex-row items-center justify-between w-full px-5">
          <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate("/")} className="cursor-pointer" />
          <img src="/logo.png" alt="" className="w-60" />
          <div className="w-5"></div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 border-2 bg-white border-gray-300 rounded-xl p-6 max-w-md"
        >
          {error && <p className="text-red-500 text-center">{error}</p>}
          <h1 className="text-center text-2xl font-bold mb-4">Login</h1>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

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

          <div className="mt-8 mb-5">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          <Link to="/forgot-password" className="text-blue-400 flex justify-center"><p>Forgot Password?</p></Link>
          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </form>

        <div className="h-40"></div>
      </div>
    </div>
  );
}
