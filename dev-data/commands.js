const mongoose = require("mongoose");
const Tour = require("../models/tourModel.js");
const fs = require("fs");

// Geliştirme aşamasında mongoDb'deki verilerin sıkça değişeceğğnden veya bozulacağından veritabanındakki verileri temizlemeye ve json dosyasındaki dosyaları veirleri veritabanına aktarmaya yarayan ve terminaldeki komutlarla çalışacak 2 fonksiyon yazılalım

//local mongodb veritabanına bağlan
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Veritabanına Bağlandı");
  })
  .catch(() => {
    console.log("❌ Veritabanına bağlanamadı");
  });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours-simple.json`));

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Bütün veriler Yüklendi");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const clearData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Bütün veriler temizlendi");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// console.log(process.argv);
/**
 * 
  '/opt/homebrew/Cellar/node/22.8.0/bin/node',
  '/Users/sungurcelik/Desktop/5-sezon-backend/nodejsMongodb/dev-data/commands',
  '--import'
 */

if (process.argv.includes("--import")) {
  importData();
} else if (process.argv.includes("--clear")) {
  clearData();
}
