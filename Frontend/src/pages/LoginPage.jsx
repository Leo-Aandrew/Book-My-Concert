import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });

      const { token, email: userEmail, role, name: userName } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ email: userEmail, name: userName }));
      localStorage.setItem("role", role);

      alert("Login successful!");
      const redirect = localStorage.getItem("redirectAfterLogin") || "/concerts";
      localStorage.removeItem("redirectAfterLogin");
      navigate(redirect);
    } catch (err) {
      console.error("Login Error:", err);
      alert(err?.response?.data?.error || "Login failed.");
    }
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        localStorage.setItem("user", JSON.stringify({ email: user.email, name: user.displayName }));
        localStorage.setItem("role", "user");
        alert("Logged in with Google!");
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
        alert("Google login failed");
      });
  };


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <button type="button" onClick={handleGoogleLogin}>
          Continue with Google
        </button>
        <p>Don't have an account?  <a href="/signup">SignUp</a></p>
      </form>
    </div>
  );
};

export default LoginPage;
