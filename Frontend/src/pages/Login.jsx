import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

 const submit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token); // save token
    alert("Logged in 🎉");
    navigate("/");
  } catch (err) {
    console.log(err.response?.data); // see backend error
    alert("Invalid credentials ❌");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-md sm:p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <div className="flex justify-between items-center mb-6">
          <Link
            to="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </Link>
          <div className="flex gap-2">
          <p  className="text-sm text-gray-600">No account?</p> <Link
            to="/register"
            className="text-sm text-gray-600 hover:underline"
          >
            Register
          </Link></div>
        </div>

        <button className="bg-primary text-white w-full py-3 rounded font-medium hover:bg-primary-dark transition">
          Login
        </button>
      </form>
    </div>
  );
}