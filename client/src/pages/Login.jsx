import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { AUTH_REGISTER } from "../utils/api";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isRegistering) {
        await axios.post(AUTH_REGISTER, { fullName, email, password });
        setIsRegistering(false);
        navigate("/login");
      } else {
        await login({ email, password });
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        )}
        <input type="email" placeholder="Enter email here..." value={email} onChange={(e) => setEmail(e.target.value)} required />
        
        <div className="password-container">
          <input type={showPassword ? "text" : "password"} placeholder="Enter password..." value={password} onChange={(e) => setPassword(e.target.value)} required />
          <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🚫" : "👁"}
          </span>
        </div>

        <button type="submit" disabled={loading}>{loading ? "Processing..." : isRegistering ? "Register" : "Login"}</button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)} disabled={loading}>
        {isRegistering ? "Already have an account? Login" : "New user? Register"}
      </button>
    </div>
  );
};

export default Login;
