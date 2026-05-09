const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/User");


// REGISTER
router.post("/register", async (req, res) => {

  try {

    const { name, email, password } =
      req.body;

    // CHECK EXISTING USER
    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({

        message:
          "User already exists"

      });
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // CREATE USER
    const user = new User({

      name,
      email,
      password: hashedPassword,

      role: "user"

    });

    await user.save();

    res.json({

      message:
        "User Registered Successfully"

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      message:
        "Server Error"

    });
  }
});


// LOGIN
router.post("/login", async (req, res) => {

  try {

    const { email, password } =
      req.body;

    // FIND USER
    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({

        message:
          "User not found"

      });
    }

    // CHECK PASSWORD
    const isMatch =
      await bcrypt.compare(

        password,
        user.password

      );

    if (!isMatch) {

      return res.status(400).json({

        message:
          "Invalid Password"

      });
    }

    // CREATE TOKEN
    const token = jwt.sign(

      {

        id: user._id,

        role: user.role

      },

      process.env.JWT_SECRET,

      {

        expiresIn: "1d"

      }

    );

    // RESPONSE
    res.json({

      token,

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        role: user.role

      }

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      message:
        "Server Error"

    });
  }
});

module.exports = router;