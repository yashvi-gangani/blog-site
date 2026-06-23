import { useParams, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

import API from "../api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function EditPost() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [category, setCategory] = useState("");

  const [currentImage, setCurrentImage] = useState("");

  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const { data } = await API.get(`/posts/${id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setCurrentImage(data.image);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
    if (!image) return "";

    const formData = new FormData();

    formData.append("image", image);

    const { data } = await API.post("/upload", formData);

    return data.imageUrl;
  };

  const updatePost = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      let imageUrl = currentImage;

      if (image) {
        imageUrl = await uploadImage();
      }

      await API.put(
        `/posts/${id}`,
        {
          title,
          content,
          category,
          image: imageUrl,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="form-container">
        <h1>Edit Blog</h1>

        <form onSubmit={updatePost}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>General</option>

            <option>Technology</option>

            <option>Education</option>

            <option>Travel</option>
          </select>

          <input type="file" onChange={(e) => setImage(e.target.files[0])} />

          <textarea
            rows="8"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button type="submit">Update Blog</button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default EditPost;
