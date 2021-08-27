const router = require("express").Router();
const Post = require("../model/post");
const verifyToken = require("../verifyToken");

const { validatePosts } = require("../validations");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().lean();
    res.json({ posts });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "No data found" });
  }
  try {
    const post = await Post.findOne({ _id: id });
    res.json({ post });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/", validatePosts, verifyToken, async (req, res) => {
  const { title, content } = req.body;
  const { user } = req;

  try {
    const response = await Post.create({
      title,
      content,
      postedBy: user.id,
    });
    res.json({ success: "Posts created successfully" });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
