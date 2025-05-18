import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast("Login successful!");
      navigate("/");
    } catch (error: any) {
      toast(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-4"
      >
        <div className="flex flex-col items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-2xl">
              C
            </div>
            <span className="font-bold text-xl text-gray-800 hidden sm:inline">
              Careerflow.ai
            </span>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center">Login</h2>
        {/* TEMP: Autofill admin credentials for testing */}
        <button
          type="button"
          className="mb-2 text-xs text-blue-600 underline"
          onClick={() => {
            setEmail("admin");
            setPassword("admin123");
          }}
        >
          Autofill admin credentials (admin / admin123)
        </button>
        {/* TEMP: Bypass login for testing */}
        <button
          type="button"
          className="mb-2 text-xs text-red-600 underline"
          onClick={() => {
            localStorage.setItem(
              "__temp_user",
              JSON.stringify({
                uid: "temp",
                email: "admin@careerflow.ai",
                name: "Admin",
              })
            );
            window.location.href = "/";
          }}
        >
          [TEMP] Bypass login and enter app
        </button>
        <input
          type="email"
          className="border rounded px-3 py-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="border rounded px-3 py-2 w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded w-full mt-2"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="text-center text-sm mt-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
