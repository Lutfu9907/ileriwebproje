const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// Kullanıcı kayıt işlemi
exports.registerUser = (req, res) => {
  const { email, password } = req.body;

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email,
        password: hashedPassword,
      });

      return user.save();
    })
    .then(() => {
      res.redirect("/announcements");
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/users/register");
    });
};

// Kullanıcı girişi işlemi
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.redirect("/users/login");
      }

      bcrypt.compare(password, user.password).then((doMatch) => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save(() => {
            res.redirect("/announcements");
          });
        }

        res.redirect("/users/login");
      });
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/users/login");
    });
};

// Kullanıcı çıkış işlemi
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/users/login");
  });
};
