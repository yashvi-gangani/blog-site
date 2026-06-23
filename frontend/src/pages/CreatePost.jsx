import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CreatePost() {
  const navigate =
    useNavigate();

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [category, setCategory] =
    useState("General");

  const [image, setImage] =
    useState(null);

  const uploadImage =
    async () => {
      const formData =
        new FormData();

      formData.append(
        "image",
        image
      );

      const { data } =
        await API.post(
          "/upload",
          formData
        );

      return data.imageUrl;
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        let imageUrl = "";

        if (image) {
          imageUrl =
            await uploadImage();
        }

        await API.post(
          "/posts",
          {
            title,
            content,
            category,
            image:
              imageUrl,
          },
          {
            headers: {
              Authorization:
                token,
            },
          }
        );

        navigate("/");
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
      <Navbar />

      <div className="form-container">
        <h1>Create Blog</h1>

        <form
          onSubmit={
            handleSubmit
          }
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            required
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
          >
            <option>
              General
            </option>

            <option>
              Technology
            </option>

            <option>
              Education
            </option>

            <option>
              Travel
            </option>
          </select>

          <input
            type="file"
            onChange={(e) =>
              setImage(
                e.target
                  .files[0]
              )
            }
          />

          <textarea
            rows="8"
            placeholder="Content"
            value={content}
            onChange={(e) =>
              setContent(
                e.target.value
              )
            }
            required
          />

          <button
            type="submit"
          >
            Create Blog
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default CreatePost;