const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { validateRegister, validateLogin } = require("../validations");

const User = require("../model/user");

router.post("/register", validateRegister, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);
    const doc = await User.create({ name, email, password: hashPassword });
    res.status(200).json({ user: doc._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User doesn't exist" });
    }

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      return res.status(400).json({ error: "Password doesn't match" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.TOKEN_SECRET
    );

    res.json({ token });
  } catch (error) {
    res.json({ error: error.message });
  }
});
module.exports = router;
