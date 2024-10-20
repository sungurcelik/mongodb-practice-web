require("dotenv").config();
const app = require("./app.js");
const mongoose = require("mongoose");

//local mongodb veritabanına bağlan
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Veritabanına Bağlandı");
  })
  .catch(() => {
    console.log("❌ Veritabanına bağlanamadı");
  });

// express uygulamasını ayağa kaldırma
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🥳 ${port}. Port dinlenmeye başlandı`);
});
