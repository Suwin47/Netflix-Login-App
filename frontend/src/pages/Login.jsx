import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/bg-img.jpg"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("https://netflix-login-app.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setError("");
        navigate("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="relative min-h-screen">
      <img src={bgImage} alt="Background" className="absolute inset-0 w-full h-full object-cover" />

      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="bg-black/75 p-8 rounded-md w-[90%] max-w-md">
          <h1 className="text-white text-4xl font-bold mb-8"> Sign In </h1>

          {error && (
            <div className="bg-red-600 text-white p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 bg-gray-700 text-white rounded outline-none"/>

            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 bg-gray-700 text-white rounded outline-none" />

            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold"> Sign In</button>
          </form>

          <p className="text-gray-400 mt-6">
            New to Netflix?{" "}
            <Link to="/register" className="text-white font-semibold hover:underline"> Sign up now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;