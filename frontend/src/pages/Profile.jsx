import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/users/profile", {
        headers: {
          Authorization: token,
        },
      });

      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <>
  <Navbar />

  <div className="page-wrapper">

    <div className="container">

      <div className="profile-card">
          <h1>{user.name}</h1>

          <p>{user.email}</p>

          <p>
            Joined :
            {" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

    </div>

    <Footer />

  </div>
</>
    
  );
}

export default Profile;