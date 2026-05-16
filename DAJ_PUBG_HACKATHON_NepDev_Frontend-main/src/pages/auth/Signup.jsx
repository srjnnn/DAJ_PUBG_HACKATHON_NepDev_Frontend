import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faForward } from "@fortawesome/free-solid-svg-icons";


export default function Signup() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "", 
    name: "",
    number: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(form.name)) {
      newErrors.name = "Name can only contain letters.";
    }

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
  setSuccess("");
  setErrors({});
  const formErrors = validateForm();
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
    return;
  }

  setLoading(true);

  try {
    // ensure the payload matches backend exactly
    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
    };

    console.log("Sending payload:", payload);

    const response = await fetch(`${apiUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (response.ok) {      
      localStorage.setItem("userData", JSON.stringify(payload));
      setSuccess("Account created! OTP sent.");
      setForm({ name: "", email: "", password: "" });
      navigate("/otppage", { 
  state: { 
    userId: data.userId, 
    email: payload.email // 
  } 
});

    } else {
      setErrors({ api: data.message || "Signup failed." });
    }
  } catch (err) {
    setErrors({ api: "Something went wrong. Please try again." });
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  return (
      <div className="h-dvh flex flex-col justify-between bg-gradient-to-b from-[#DBE8F4] to-purple-200">
      <div className="w-screen h-dvh flex flex-col items-center justify-between pt-5">          
        <div className="flex flex-row items-center justify-between w-full  px-5">
            <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate("/")} className="cursor-pointer" />
            <img src="/logo.png" alt="" className="w-60"/>
            <div className="w-5"></div>        
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 h-120 border-2 bg-white border-gray-300 rounded-xl p-6 max-w-md">
          {success && <p className="text-green-600 text-center font-semibold">{success}</p>}
          {errors.api && <p className="text-red-500 text-center">{errors.api}</p>}
          <h1 className="text-center text-4xl font-bold mt-2 mb-5">SignUp</h1>
          <div className="mb-4">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                errors.name ? "border-red-500" : "focus:ring-blue-200"
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                errors.email ? "border-red-500" : "focus:ring-blue-200"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>


          <div className="relative">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                errors.password ? "border-red-500" : "focus:ring-blue-200"
              }`}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-3 text-gray-500 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="bottom-0 position-relative">
            <div className="flex w-full mt-8 mb-5 justify-end">  
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                {loading ? "Creating..." : <h2>Next</h2>}
              </button>
            </div>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </form>
        <div className="h-30"></div>
      </div>
    </div>
  );
}
