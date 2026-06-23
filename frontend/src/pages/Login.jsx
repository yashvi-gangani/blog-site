import { useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import {
  useNavigate,
  Link
} from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      alert("Login Successful");

      navigate("/");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-container">
        <div className="auth-card">
          <h1>Welcome Back 👋</h1>
          <p className="auth-subtitle">
            Login to continue writing and reading blogs.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{
              width: "400px",
              margin: "40px auto",
            }}
          >
            <h2>Login</h2>

            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />


            <button type="submit">Login</button>

            <p className="auth-link">
              New to BlogSite? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
