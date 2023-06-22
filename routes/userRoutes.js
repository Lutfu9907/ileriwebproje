const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Kullanıcı kayıt sayfası
router.get("/register", (req, res) => {
  res.render("auth/register");
});

// Kullanıcı kayıt işlemi
router.post("/register", userController.registerUser);

// Kullanıcı giriş sayfası
router.get("/login", (req, res) => {
  res.render("auth/login");
});

// Kullanıcı girişi yeri
router.post("/login", userController.loginUser);
router.get("/logout", userController.logout);
module.exports = router;
