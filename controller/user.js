const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

exports.postUser = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((users) => {
      res.json({ users });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
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

      //return response with userinfo and token to frontend
      const { _id, name, email, role } = user;
      res.json({ token, user: { name, _id, email, role } });
    })
    .catch((error) => {
      res.status(400).json({ error: "not found" });
    });
};
