const { Schema, default: mongoose } = require("mongoose");
const validator = require("validator");
// Kullanıcı Şeması
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Kullanıcı isim değerine sahip olmalıdır!"],
    minLength: [3, "Kullanıcı ismi en az 3 karakter olmalı!"],
    maxLength: [30, "Kullanıcı ismi en fazla 30 karakter olmalı!"],
  },
  email: {
    type: String,
    required: [true, "Kullanıcı email değerine sahip olmalı!"],
    unique: [true, "Bu eposta adresinde kayıtlı kulanıcı zaten var!"],
    validate: [validator.isEmail, "Lütfen geçerli bir mail giriniz!"],
  },
  photo: {
    type: String,
    default: "defaultpic.webp",
  },
  password: {
    type: String,
    required: [true, "Kullanıcı şifreye sahip olmalı!"],
    minLength: [8, "Şifre en az 8 karakter olmalı"],
    validate: [validator.isStrongPassword, "Şifreniz yeterince güçlü değil!"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Lütfen şifrenizi onaylayınız!"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Onay şifreniz eşleşmiyor",
    },
  },
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user",
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
