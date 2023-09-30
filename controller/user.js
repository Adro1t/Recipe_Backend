const User = require("../model/userModel");
const jwt = require("jsonwebtoken"); //for authentication

//for authorizartion
// const expressJwt = require("express-jwt");{old}
const { expressjwt: expressJwt } = require("express-jwt"); //{new}

const Token = require("../model/token");
const sendEmail = require("../utils/verifyEmail");
const crypto = require("crypto");

// exports.postUser = (req, res) => {
//   const user = new User(req.body);
//   user
//     .save()
//     .then((users) => {
//       const token = new Token({
//         token: crypto.randomBytes(16).toString("hex"),
//         userId: users._id,
//       });
//       token.save((error) => {
//         if (error) {
//           return res.status(404).json({ error });
//         }
//         sendEmail({
//           from: "no-reply@recipe.com.np",
//           to: users.email,
//           subject: "Email Verification Link",
//           text: `Hello, \n\n Please verify your account by clicking below link: \n http://${req.headers.host}\/user\/confirmation\/${token.token}`,
//         });
//       });
//       res.json({ users });
//     })
//     .catch((error) => {
//       res.status(400).json({ error });
//     });
// };

exports.postUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();

    const token = new Token({
      token: crypto.randomBytes(16).toString("hex"),
      userId: savedUser._id,
    });

    await token.save();

    sendEmail({
      from: "no-reply@recipe.com.np",
      to: savedUser.email,
      subject: "Email Verification Link",
      text: `Hello, \n\n Please verify your account by clicking the link below: \n http://${req.headers.host}\/user\/confirmation\/${token.token}`,
    });

    res.json({ users: savedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;
  //at first, check if email exists
  User.findOne({ email })
    .then((user) => {
      if (!user.authenticate(password)) {
        return res.status(400).json({ error: "password error" });
      }
      //generate token with id and JWT_SECRET
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      //persist the token with expiry date using cookie
      res.cookie("C", token, { expire: Date.now() + 1800000 });
      //return response with userinfo and token to frontend
      const { _id, name, email, role } = user;
      res.json({ token, user: { name, _id, email, role } });
    })
    .catch((error) => {
      res.status(400).json({ error: "not found" });
    });
};

exports.signOut = (req, res) => {
  res.clearCookie("C");
  res.json({ message: "SignOut Success" });
};

exports.userList = (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

exports.userById = (req, res, next, id) => {
  User.findById(id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => {
      res.status(400).json({ error: "failed to find" });
    });
};

exports.userDetails = (req, res) => {
  //to hide salt and password
  req.user.hashed_password = req.user.salt = undefined;
  res.json(req.user);
};

//for authorization

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});
