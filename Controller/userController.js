const User = require("../Model/userSchema");
const bcrypt = require("bcrypt");

module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, address, phone, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username is already taken", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email is already in use", status: false });
    const phoneCheck = await User.findOne({ phone });
    if (phoneCheck)
      return res.json({ msg: "Phone Number is already in use", status: false });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      address,
      phone,
      password: passwordHash,
    });
    delete user.password;
    return res.json({ user, status: true });
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({
        msg: "Invalid credentials username",
        status: false,
      });

    const mail = await User.findOne({ email });
    if (!mail)
      return res.json({
        msg: "Invalid credentials email",
        status: false,
      });

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck)
      return res.json({
        msg: "Invalid credentials password",
        status: false,
      });
    delete user.password;
    return res.json({ user, status: true });
  } catch (err) {
    next(err);
  }
};

module.exports.allData = async (req, res, next) => {
  try {
    const { username, email, address, phone } = req.body;
    const user = await User.find({ username, email, address, phone });
    res.json(user);
  } catch (error) {
    next(error);
  }
};
