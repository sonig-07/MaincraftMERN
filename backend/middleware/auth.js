const jwt = require("jsonwebtoken");

function auth(req, res, next) {

  try {

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {

      return res.status(401).json({

        message:
          "No token provided"

      });
    }

    // Bearer token split
    const token =
      authHeader.split(" ")[1];

    if (!token) {

      return res.status(401).json({

        message:
          "Invalid token format"

      });
    }

    // VERIFY TOKEN
    const verified =
      jwt.verify(

        token,

        process.env.JWT_SECRET

      );

    console.log("VERIFIED USER:",
      verified);

    req.user = verified;

    next();

  } catch (err) {

    console.log(err);

    res.status(400).json({

      message:
        "Invalid token"

    });
  }
}

module.exports = auth;