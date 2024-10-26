/**
 * Mongoose'da neden modele ihtiyaç duyarız ?
 * Bir koleksiyona yeni bir veri eklerken bunu bir kısıtlamaya tabi tutulmasını isteriz.
 * örneğin users koleksiyonundaki her bir nesnenin name, surname, age değerlerinin olmasını isteriz.
 * Kaydedilecek olan her bir veri bu şemadaki kısıtlamalara uygun ise kaydedilip aksi taktirde hata fırlatır.
 * Bu sayede koleksiyonda tutulan dökümanların daha tutarlı olmasını sağlarız.
 */

const mongoose = require("mongoose");

// veritabanına kaydedilecek olan verilerin kısıtlamalarını yazarız
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Bu tur ismi zaten mevcut"],
      required: [true, "Tur isim değerine sahip olmalı"],
    },

    price: {
      type: Number,
      required: [true, "Tur fiyat değerine sahip olmalı"],
    },

    priceDiscount: {
      type: Number,
    },

    duration: {
      type: Number,
      required: [true, "Tur süre değerine sahip olmalı"],
    },

    difficulty: {
      type: String,
      required: [true, "Tur zorluk değerine sahip olmalı"],
      enum: ["easy", "medium", "hard", "difficult"],
    },

    maxGroupSize: {
      type: Number,
      required: [true, "Tur maksimum kişi sayısı değerine sahip olmalı"],
    },

    ratingsAverage: {
      type: Number,
      min: [1, "Rating değeri 1'den küçük olamaz"],
      max: [5, "Rating değeri 5'den büyük olamaz"],
      default: 4.0,
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    summary: {
      type: String,
      maxLength: [200, "Özet alanı 200 karakteri geçemez"],
      required: [true, "Tur özet değerine sahip olmalı"],
    },

    description: {
      type: String,
      maxLength: [1000, "Açıklama alanı 1000 karakteri geçemez"],
      required: [true, "Tur açıklama değerine sahip olmalı"],
    },

    imageCover: {
      type: String,
      required: [true, "Tur kapak fotoğrafına sahip olmalı"],
    },

    images: {
      type: [String],
    },

    startDate: {
      type: [Date],
    },
  },
  // şema ayarları
  { timestamps: true }
);

// şemayı kullanarak model oluşturuyoruz
// "Tour" -> tours diye çalışıyor
const Tour = mongoose.model("Tour", tourSchema);

// export işlemi
module.exports = Tour;
