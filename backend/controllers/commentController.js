const Comment = require("../models/Comment");

const createComment = async (
  req,
  res
) => {
  try {
    const comment =
      await Comment.create({
        text: req.body.text,
        user: req.user,
        post: req.params.postId,
      });

    res.status(201).json(
      comment
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

const getComments = async (
  req,
  res
) => {
  try {
    const comments =
      await Comment.find({
        post: req.params.postId,
      })
        .populate(
          "user",
          "name"
        )
        .sort({
          createdAt: -1,
        });

    res.json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteComment =
  async (req, res) => {
    try {
      const comment =
        await Comment.findById(
          req.params.id
        );

      if (!comment) {
        return res.status(404).json({
          message:
            "Comment not found",
        });
      }

      if (
        comment.user.toString() !==
        req.user
      ) {
        return res.status(401).json({
          message:
            "Not authorized",
        });
      }

      await comment.deleteOne();

      res.json({
        message:
          "Comment deleted",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  };

module.exports = {
  createComment,
  getComments,
  deleteComment
};