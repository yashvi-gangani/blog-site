import { Link } from "react-router-dom";

function BlogCard({ post }) {
  return (
    <div className="blog-card">
      <img
        src={post.image}
        alt={post.title}
        className="blog-image"
      />

      <div className="blog-card-content">

  <span className="category-badge">
    {post.category}
  </span>

  <h2>{post.title}</h2>

  <p className="author">
    By {post.author?.name}
  </p>

  <p className="likes">
    ❤️ {post.likes?.length || 0}
    Likes
  </p>

  <p>
    {post.content.substring(
      0,
      120
    )}
    ...
  </p>

   <Link
    className="read-more-btn"
    to={`/post/${post._id}`}
  >
    Read More →
  </Link>

</div>
    </div>
  );
}

export default BlogCard;