const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      image,
    } = req.body;

    const post =
      await Post.create({
        title,
        content,
        category,
        image,
        author: req.user,
      });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getPosts = async (req, res) => {
  const posts = await Post.find()
    .populate("author", "name")
    .sort({ createdAt: -1 });

  res.json(posts);
};

const getPostById = async (
  req,
  res
) => {
  try {
    const post =
      await Post.findById(
        req.params.id
      ).populate(
        "author",
        "name"
      );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updatePost = async (
  req,
  res
) => {
  try {
    const post =
      await Post.findById(
        req.params.id
      );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (
      post.author.toString() !==
      req.user
    ) {
      return res.status(401).json({
        message:
          "Not Authorized",
      });
    }

    post.title =
      req.body.title ||
      post.title;

    post.content =
      req.body.content ||
      post.content;

    post.category =
  req.body.category ||
  post.category;

  post.image =
  req.body.image ||
  post.image;

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deletePost = async (
  req,
  res
) => {
  try {
    const post =
      await Post.findById(
        req.params.id
      );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (
      post.author.toString() !==
      req.user
    ) {
      return res.status(401).json({
        message:
          "Not Authorized",
      });
    }

    await post.deleteOne();

    res.json({
      message:
        "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      author: req.user,
    }).sort({
      createdAt: -1,
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const likePost = async (
  req,
  res
) => {
  try {
    const post =
      await Post.findById(
        req.params.id
      );

    if (!post) {
      return res.status(404).json({
        message:
          "Post not found",
      });
    }

    const alreadyLiked =
      post.likes.includes(
        req.user
      );

    if (alreadyLiked) {
      post.likes =
        post.likes.filter(
          (userId) =>
            userId.toString() !==
            req.user
        );
    } else {
      post.likes.push(
        req.user
      );
    }

    await post.save();

    res.json({
      likes:
        post.likes.length,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getMyPosts,
  likePost,
};