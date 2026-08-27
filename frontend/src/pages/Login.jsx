 
 function Login({ onSelectRole }) {
  return (
    <div className="login-page">
      <div className="login-box">

      <h1 className="quiz-title">Quiz Portal</h1>

      <p className="login-subtitle">
        Online Assessment Platform
      </p>

      <h2>Welcome Back!</h2>
      <p>Select your login type</p>

      <div className="login-options">

        <button
          className="login-role-button"
          onClick={() => onSelectRole("member")}
        >
          👤 Member Login
        </button>

        <button
          className="login-role-button"
          onClick={() => onSelectRole("admin")}
        >
          🔐 Admin Login
        </button>

      </div>
      </div>
    </div>
  );
}

export default Login;