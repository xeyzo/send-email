const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/CommentController");

router.get("/", CommentController.getComment);
router.post("/", CommentController.saveComment);
router.patch("/:id", CommentController.updateComment);
router.get("/:id", CommentController.getCommentId);
router.delete("/:id", CommentController.deleteComment);






module.exports = router;