import { useState } from "react";

function Signup({ onSignup, onBack }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  const handleSignup = async () => {
  if (username.trim() === "") {
    alert("Please enter a username");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert("Signup successful! Login to continue.");

    onSignup();

  } catch (error) {
    alert("Unable to connect to server");
  }
};

  return (
    <div className="login-page">
      <div className="login-box">
      <button className="back-button" onClick={onBack}>
          ← Back
        </button>
      <h1 className="quiz-title">Quiz Portal</h1>

      <p className="login-subtitle">
        Member Sign Up
      </p>

      <input
        type="text"
        placeholder="Username"
        className="login-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="start-button"
        onClick={handleSignup}
      >
        Sign Up
      </button>

    </div>
    </div>
  );
}

export default Signup;