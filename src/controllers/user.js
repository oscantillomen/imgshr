const User = require("../models/user");

const ctrl = {};

ctrl.index = async (req, res) => {
  const user = await User.findOne({ user_id: req.params.user_id });
  user
    ? res.status(200).json(user)
    : res.status(404).json({ error: "User doesn´t exist" });
};

ctrl.login = (req, res) => {
    const user = User.findOne({ $and: [{ user: req.body.user }] });
}

ctrl.users = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

ctrl.create = async (req, res) => {
  const {
    name,
    email,
    user,
    password,
    confirm_password,
    birthdate,
    phone
  } = req.body;
  const userExist = await User.findOne({ $or: [{ user: req.body.user }, { email: req.body.email }]});
  if (userExist) {
    res.status(500).json({ error: `Email ${email} or user ${user} is already in use` });
  } else {
    if (password === confirm_password) {
      const newUser = new User({
        user,
        name,
        email,
        password,
        birthdate: Date(birthdate),
        phone
      });
      await newUser.save();
      res.status(200).json({ msg: "User created!" });
    } else res.status(500).json({ error: "Passwords don't match" });
  }
};

module.exports = ctrl;
