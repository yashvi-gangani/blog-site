const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (
      user &&
      (await bcrypt.compare(password, user.password))
    ) {
      const token = jwt.sign(
        {
          id: user._id
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d"
        }
      );

      res.json({
        token,
        user
      });
    } else {
      res.status(400).json({
        message: "Invalid Credentials"
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  register,
  login
};