const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getMyPosts,
  likePost
} = require("../controllers/postController");

router.get("/", getPosts);

router.get(
  "/myposts",
  protect,
  getMyPosts
);

router.get(
  "/:id",
  getPostById
);

router.post(
  "/",
  protect,
  createPost
);

router.put(
  "/:id",
  protect,
  updatePost
);

router.delete(
  "/:id",
  protect,
  deletePost
);

router.put(
  "/like/:id",
  protect,
  likePost
);

module.exports = router;