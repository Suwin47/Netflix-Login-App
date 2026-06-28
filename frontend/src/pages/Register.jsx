import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "../assets/bg-img.jpg"; 

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        "https://netflix-login-app.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Server Error");
    }
  };

  return (
  <div className="relative min-h-screen">
    <img src={bgImage} alt="Background" className="absolute inset-0 w-full h-full object-cover"/>

    <div className="absolute inset-0 bg-black/70"></div>
    <div className="relative z-10 min-h-screen flex items-center justify-center">
      <div className="bg-black/75 p-8 rounded-lg w-[90%] max-w-md">
        <h1 className="text-white text-4xl font-bold mb-6"> Sign Up </h1>

        {error && (
          <div className="bg-red-600 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 rounded bg-gray-700 text-white"/>

          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 rounded bg-gray-700 text-white"/>

          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 rounded bg-gray-700 text-white"/>

          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded"> Sign Up</button>
        </form>

        <p className="text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-white hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  </div>
);
}

export default Register;