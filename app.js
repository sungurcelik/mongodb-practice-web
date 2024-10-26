const express = require("express");
const tourRouter = require("./routes/tourRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const reviewRouter = require("./routes/reviewRoutes.js");

// express uygulaması
const app = express();

// middleware 
app.use(express.json())

// routerları projeye tanıt
app.use("/api/tours", tourRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);

// server.js'te kullanmak için
module.exports = app;
