import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/posts/myposts", {
        headers: {
          Authorization: token,
        },
      });

      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    const token = localStorage.getItem("token");

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?",
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/posts/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-wrapper">
        <div className="container">
          <h1 className="page-title">My Dashboard</h1>

          <div className="stats">
            <div className="stat-card">
              <h2>{posts.length}</h2>
              <p>Total Blogs</p>
            </div>

            <div className="stat-card">
              <h2>
                {posts.reduce(
                  (total, post) => total + (post.likes?.length || 0),
                  0,
                )}
              </h2>
              <p>Total Likes</p>
            </div>
          </div>

          {posts.length === 0 ? (
            <h3>No Blogs Created Yet</h3>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="dashboard-blog-card">
                <img src={post.image} alt={post.title} className="blog-image" />

                <span className="category-badge">{post.category}</span>

                <h2>{post.title}</h2>

                <p className="author">By {post.author?.name}</p>

                <p className="likes">❤️ {post.likes?.length || 0} Likes</p>

                <p>{post.content.substring(0, 150)}...</p>

                <div className="dashboard-actions">
                  <Link to={`/post/${post._id}`}>
                    <button>View</button>
                  </Link>

                  <Link to={`/edit/${post._id}`}>
                    <button>Edit</button>
                  </Link>

                  <button onClick={() => deletePost(post._id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
