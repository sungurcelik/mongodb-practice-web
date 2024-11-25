const User = require("../models/userModel.js");

// Kayıt OL
exports.signUp = async (req, res) => {
  try {
    // yeni bir kullanıcı oluştur
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    res.status(201).json({
      message: "Hesabınız oluşturuldu",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Üzgünüz bir sorun oluştu",
      error: error.message
    });
  }
};

// GİRİŞ YAP
exports.login = async (req, res) => {
  try {
    res.status(201).json({
      message: "Kayıt olundu",
    });
  } catch (error) {
    res.status(500).json({
      message: "Üzgünüz bir sorun oluştu",
    });
  }
};

// ÇIKIŞ YAP
exports.logout = async (req, res) => {};
