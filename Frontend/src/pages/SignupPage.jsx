import React, { useState } from "react";
import axios from "axios";
import "../styles/SignupPage.css";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/auth/signup", {
        name,
        email,
        password,
      });

      const { token, email: userEmail, role, name: userName } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ email: userEmail, name: userName }));
      localStorage.setItem("role", role);

      alert("Signup successful!");
      window.location.href = "/";
    } catch (err) {
      console.error("Signup Error:", err);
      alert(err?.response?.data?.error || "Signup failed.");
    }
  };


  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Signup</h2>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default SignupPage;
