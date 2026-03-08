import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const API = "https://levelup-backend-a659.onrender.com";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        `${API}/api/auth/login`,
        form
      );

      const token = res.data.token;

      localStorage.setItem("token", token);

      alert("Login successful 🎉");

      navigate("/dashboard");

    } catch (err) {

      alert("Login failed");

      console.log(err);

    }

  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-slate-900">

      <div className="bg-slate-800 p-8 rounded-xl shadow-lg w-80">

        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          LevelUp 🎮
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-700 text-white outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-700 text-white outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded text-white font-semibold"
          >
            Login
          </button>

        </form>

        {/* REGISTER LINK */}

        <p className="text-center text-gray-400 mt-4">

          Don't have an account?{" "}

          <a
            href="/register"
            className="text-blue-400 hover:underline"
          >
            Register
          </a>

        </p>

      </div>

    </div>

  );

}

export default Login;