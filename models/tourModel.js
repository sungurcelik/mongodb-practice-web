/**
 * !Mongoose'da neden modele ihtiyaç duyarız ?
 * Bir koleksiyona yeni bir veri eklerken bunu bir kısıtlamaya tabi tutulmasını isteriz.
 * örneğin users koleksiyonundaki her bir nesnenin name, surname, age değerlerinin olmasını isteriz.
 * Kaydedilecek olan her bir veri bu şemadaki kısıtlamalara uygun ise kaydedilip aksi taktirde hata fırlatır.
 * Bu sayede koleksiyonda tutulan dökümanların daha tutarlı olmasını sağlarız.
 */

const mongoose = require("mongoose");
const validator = require("validator");

// veritabanına kaydedilecek olan verilerin kısıtlamalarını yazarız
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Bu tur ismi zaten mevcut"],
      required: [true, "Tur isim değerine sahip olmalı"],
      validate: [
        validator.isAlphanumeric,
        "Tur ismi özel karakter içermemeli!",
      ],
    },

    price: {
      type: Number,
      required: [true, "Tur fiyat değerine sahip olmalı"],
    },

    priceDiscount: {
      type: Number,
      //custom validator (kendi yazdığımız kontrol methodları)
      // doğrulama fonksiyonları false return ederse doğrulamadan geçmedi anlamına gelir ve belge veritabanına kaydedilmez true return ederse doğrulamadan geçti anlamına gelir
      validate: {
        validator: function (value) {
          return value < this.price;
        },
        message: "İndirim fiyatı asıl fiyattan büyük olamaz.",
      },
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

    startDates: {
      type: [Date],
    },
    durationHour: { type: Number },
  },
  // şema ayarları
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// !Virtual Property
// Örn: Şu an veritabanında turların fiyatlarını ve indiriö fiyatını tutuyoruz maa frontent bizden ayrıca indirimli fiyatı da istedi.
// Bu noktada indirimli fiyatı DN'de tutmak gereksiz maaliyet olur.(Asıl fiyat ve indirim elimizde mevcut)
// bunun yerine cevap gönderme sırasında bu değeri hesaplayıp eklersek hem frontend'in ihtiyacını karşılamış oluruz hem de dn'de gereksiz yer kaplamamış oluruz.

tourSchema.virtual("discountedPrice").get(function () {
  return this.price - this.priceDiscount;
});

// Örn: şu an db'de tur ismini tutuyoruz ama client ekstra olarak slug istedi.
// The City Wanderer: the-city-wanderer

tourSchema.virtual("slug").get(function () {
  return this.name.replaceAll(" ", "-").toLowerCase();
});

// !Document Middleware
// Bir Belgenin kaydedilme, güncelleme, silinme, okuma gibi olaylarından önce veya sonra işlem gerçekleştirmek istiyorsak kullanırız
// Örn: Client'dan gelen tur verisini veritabanına kaydedilmeden önce kaç saat sürdüğünü hesaplayalım.

tourSchema.pre("save", function (next) {
  // gerekli işlemler
  this.durationHour = this.duration * 24;
  //sonraki adıma devam et
  next();
});

//! pre() işlemden önce post() işlemden sonra md'i çalıştırmaya yarar
tourSchema.post("updateOne", function (doc, next) {
  // kullanıcının şifresini güncelleme işleminden sonra haber veya doğrulama maili gönderilir.
  console.log("Şifreniz güncellendi Maile gönderildi.");
  next();
});

//! Query Middleware
// Sorgulardan önce veya sonra çalıştırdığımız md'lerdir.
tourSchema.pre("find", function (next) {
  // premium olanları her kullanıcıya göndermek istemediğimizden yapılan sorgularda otomatik olarak premium olmayanları filtrele
  this.find({ premium: { $ne: true } });
  next();
});

//! Aggregate Middleware
// Rapor oluşturma işlemlerinden önce veya sonra çalıştırdığımız md'ler

tourSchema.pre("aggregate", function (next) {
  // premium olan turları rapora dahil etmesin
  this.pipeline().unshift({ $match: { premium: { $ne: true } } });

  next();
});

// şemayı kullanarak model oluşturuyoruz
// "Tour" -> tours diye çalışıyor
const Tour = mongoose.model("Tour", tourSchema);

// export işlemi
module.exports = Tour;
