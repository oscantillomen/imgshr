const User = require('../models/user');

const ctrl = {};

ctrl.users = async (req, res) => {
    const users = await User.find();
    res.json(req.body);
};

ctrl.create = async (req, res) => {
    const {
        name,
        email,
        password,
        confirm_password,
        birthdate,
        phone
    } = req.body;
    const user  = User.find({ email })
    if(user){
        res.status(500).json({error: `Email ${email} is already in use`});
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
          res.status(200).json({ msg: "User created!" });
        } else res.status(500).json({ error: "Passwords don't match" });
    }
}

module.exports = ctrl;