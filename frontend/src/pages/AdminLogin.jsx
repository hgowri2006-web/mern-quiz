 import { useState } from "react";

function AdminLogin({ onLogin ,onBack}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (username.trim() === "") {
  alert("Please enter your username");
  return;
}

if (password === "") {
  alert("Please enter your password");
  return;
}
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/login`, {
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

      alert("Admin login successful!");

      onLogin();

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
        Admin Login
      </p>

      <input
        type="text"
        placeholder="Admin Username"
        className="login-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Admin Password"
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="login-button"
        onClick={handleLogin}
      >
        Login
      </button>

    </div>
    </div>
  );
}

export default AdminLogin;