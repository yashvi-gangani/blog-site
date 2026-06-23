import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";

function Home() {
  const [posts, setPosts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts =
    async () => {
      try {
        const { data } =
          await API.get("/posts");

        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

  const filteredPosts =
    posts.filter((post) =>
      post.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <>
  <Navbar />

  <div className="hero-section">
  <h1>
    Discover Amazing Stories
  </h1>

  <p>
    Read, write and share
    your ideas with the world.
  </p>
</div>

  <div className="container">

    <input
      type="text"
      placeholder="Search blogs..."
      className="search-box"
      value={search}
      onChange={(e) =>
        setSearch(
          e.target.value
        )
      }
    />

    <div className="home-layout">

      <div className="main-content">
        {filteredPosts.map(
          (post) => (
            <BlogCard
              key={post._id}
              post={post}
            />
          )
        )}
      </div>

      <div className="sidebar">

        <h2>
          Recent Posts
        </h2>

        {posts
          .slice(0, 5)
          .map((post) => (
            <div
              key={
                post._id
              }
              className="recent-post"
            >
              <h4>
                {
                  post.title
                }
              </h4>

              <small>
                {
                  post.category
                }
              </small>
            </div>
          ))}
      </div>

    </div>

  </div>

  <Footer />
</>
  );
}

export default Home;