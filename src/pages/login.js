import React, { useState } from "react";
import { auth } from "../config/firebase";  // Import Firebase Authentication
import { signInWithEmailAndPassword } from "firebase/auth"; // Import the signIn method
import { useNavigate } from "react-router-dom";
import "../style/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Use Firebase Authentication to log in
      await signInWithEmailAndPassword(auth, email, password);

      // Once logged in, navigate to the dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Error during login:", err);
      setError("Invalid email or password.");
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h4>Email</h4>
        </div>
        <div className="input">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <h4>Password</h4>
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="submitContainer" onClick={handleLogin}>
        Login
      </div>
      <h7 className="tt">New user? Then please signup below</h7>
      <div className="gotosignuplogin" onClick={handleSignup}>
        <button>Signup</button>
      </div>
    </div>
  );
}
