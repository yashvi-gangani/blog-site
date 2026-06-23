import { useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", formData);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-container">
        <div className="auth-card">
          <h1>Register</h1>

          <form
            onSubmit={handleSubmit}
            style={{
              width: "400px",
              margin: "40px auto",
            }}
          >
            <h1>Create Account 🚀</h1>
            <p className="auth-subtitle">
              Join BlogSite and start sharing your ideas.
            </p>

            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
            />

            

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />

            

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />

            

            <button type="submit">Register</button>

            <p className="auth-link">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
