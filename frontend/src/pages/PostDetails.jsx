import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import API from "../api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);

  const [comments, setComments] =
    useState([]);

  const [commentText,
    setCommentText] =
    useState("");

  const [likes, setLikes] =
    useState(0);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  const fetchPost =
    async () => {
      try {
        const { data } =
          await API.get(
            `/posts/${id}`
          );

        setPost(data);

        setLikes(
          data.likes?.length ||
            0
        );
      } catch (error) {
        console.log(error);
      }
    };

  const fetchComments =
    async () => {
      try {
        const { data } =
          await API.get(
            `/comments/${id}`
          );

        setComments(data);
      } catch (error) {
        console.log(error);
      }
    };

  const handleLike =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const { data } =
          await API.put(
            `/posts/like/${id}`,
            {},
            {
              headers: {
                Authorization:
                  token,
              },
            }
          );

        setLikes(
          data.likes
        );
      } catch (error) {
        console.log(error);

        alert(
          "Please login first"
        );
      }
    };

  const addComment =
    async () => {
      if (
        !commentText.trim()
      )
        return;

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await API.post(
          `/comments/${id}`,
          {
            text:
              commentText,
          },
          {
            headers: {
              Authorization:
                token,
            },
          }
        );

        setCommentText("");

        fetchComments();
      } catch (error) {
        console.log(error);

        alert(
          "Please login first"
        );
      }
    };

  const deleteComment =
    async (
      commentId
    ) => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await API.delete(
          `/comments/delete/${commentId}`,
          {
            headers: {
              Authorization:
                token,
            },
          }
        );

        fetchComments();
      } catch (error) {
        console.log(error);

        alert(
          "Unable to delete comment"
        );
      }
    };

  if (!post) {
    return (
      <h2
        style={{
          textAlign:
            "center",
          marginTop:
            "50px",
        }}
      >
        Loading...
      </h2>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container">

        <img
          src={post.image}
          alt={post.title}
          className="details-image"
        />

        <h1>{post.title}</h1>

        <div
          style={{
            marginBottom:
              "20px",
          }}
        >
          <button
            className="like-btn"
            onClick={
              handleLike
            }
          >
            ❤️ Like
          </button>

          <span
            className="like-count"
          >
            {likes} Likes
          </span>
        </div>

        <p>
          <strong>
            Category:
          </strong>{" "}
          {post.category}
        </p>

        <p>
          <strong>
            Author:
          </strong>{" "}
          {
            post.author
              ?.name
          }
        </p>

        <p>
          <strong>
            Published:
          </strong>{" "}
          {new Date(
            post.createdAt
          ).toLocaleDateString()}
        </p>

        <hr />

        <div
          style={{
            marginTop:
              "20px",
            lineHeight:
              "1.8",
          }}
        >
          {post.content}
        </div>

        <hr
          style={{
            marginTop:
              "30px",
          }}
        />

        <h2>
          Comments (
          {
            comments.length
          }
          )
        </h2>

        <div
          className="comment-form"
        >
          <textarea
            rows="4"
            placeholder="Write a comment..."
            value={
              commentText
            }
            onChange={(
              e
            ) =>
              setCommentText(
                e.target
                  .value
              )
            }
          />

          <button
            onClick={
              addComment
            }
          >
            Add Comment
          </button>
        </div>

        <div
          className="comments-section"
        >
          {comments.length ===
          0 ? (
            <p>
              No comments
              yet.
            </p>
          ) : (
            comments.map(
              (
                comment
              ) => (
                <div
                  key={
                    comment._id
                  }
                  className="comment-card"
                >
                  <div className="comment-header">
                    <h4>
                      {
                        comment
                          .user
                          ?.name
                      }
                    </h4>

                    <small>
                      {new Date(
                        comment.createdAt
                      ).toLocaleDateString()}
                    </small>
                  </div>

                  <p>
                    {
                      comment.text
                    }
                  </p>

                  <button
                    className="delete-comment-btn"
                    onClick={() =>
                      deleteComment(
                        comment._id
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              )
            )
          )}
        </div>

      </div>

      <Footer />
    </>
  );
}

export default PostDetails;