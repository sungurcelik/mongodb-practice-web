const express = require("express");

const app = express();

app.get("/api/tours", (req, res) => {
  // veritabanından tur verilerini al

  // gelen datayı cliemt'a gönder

  res.status(200).json({ message: "Veriler..." });
});

module.exports = app;
