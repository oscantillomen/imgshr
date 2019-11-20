const User = require("../models/users");

const ctrl = {};

ctrl.create = async (req, res) => {
  const {
    name,
    email,
    password,
    confirm_password,
    birthdate,
    phone
  } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(500).json({ error: `Email ${email} is already in use` });
  } else {
    if (password === confirm_password) {
      const newUser = new User({
        name,
        email,
        password,
        birthdate: Date(birthdate),
        phone
      });
      await newUser.save();
      res.redirect("/");
    } else res.status(500).json({ error: "Passwords don't match" });
  }
};

ctrl.login = async (req, res) => {
  const user = await User.findOne({ user: req.body.user });
  if (user && user.password === req.body.password) {
    req.session.user = user;
    res.redirect("/feed");
  } else {
    res.redirect("/");
  }
};

module.exports = ctrl;
