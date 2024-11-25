const Tour = require("../models/tourModel.js");
const APIFeatures = require("../utils/apiFeatures.js");

exports.getAllTours = async (req, res) => {
  try {
    // class'tan örnek al
    const features = new APIFeatures(Tour.find(), req.query, req.formattedQuery)
      .filter()
      .limit()
      .sort()
      .pagination();

    // sorguyu çalıştır
    const tours = await features.query;

    // client'a veritabanından gelen verileri gönder
    res.json({ message: "getAllTours Başarılı", results: tours.length, tours });
  } catch (error) {
    res
      .status(400)
      .json({ message: "getAllTours Başarısız", error: error.message });
  }
};

exports.createTour = async (req, res) => {
  try {
    // isteğin body kısmından gelen dataya eriş
    // console.log(req.body);
    // veritabanına yeni turu kaydet
    const newTour = await Tour.create(req.body);

    // client'a cevap gönder
    res.json({ text: "createTour Başarılı", tour: newTour });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ text: "createTour Başarısız", error: error.message });
  }
};

exports.getTour = async (req, res) => {
  // 671cc24d31b27340fb7e4a84
  try {
    const tour = await Tour.findById(req.params.id);
    res.json({ text: "getTour Başarılı", tour });
  } catch (error) {
    res.status(400).json({ text: "getTour Başarısız", error: error.message });
  }
};

exports.deleteTour = async (req, res) => {
  // 671cc24d31b27340fb7e4a84
  try {
    await Tour.deleteOne({ _id: req.params.id });
    res.status(204).json({ message: "SİLİNDİ GARDAŞ" });
  } catch (error) {
    res.status(400).json({ text: "DeleteTour Başarısız" });
  }
};

exports.updateTour = async (req, res) => {
  // 671cc24d31b27340fb7e4a84
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({ text: "updateTour Başarılı", tour });
  } catch (error) {
    res.status(400).json({ text: "updateTour Başarısız" });
  }
};

// istek parametrelerini frontendin oluşturması yerine bu middleware ile biz tanımlayacağız
exports.aliasTopTours = async (req, res, next) => {
  req.query.sort = "-ratingsAverage";
  req.query["price[lte]"] = "1200";
  req.query.limit = 5;
  req.query.fields = "name, price, ratingsAverage, summary, difficulty";
  next();
};

// rapor oluşturup göndermek
// zorluğa göre gruplandırarak istatistik hesapladık.
exports.getTourStats = async (req, res) => {
  try {
    // Aggregation Pipeline (Raporlama Adımları)
    const stats = await Tour.aggregate([
      //1. adım (ratingi 4 ve üzeri olan turlar)
      { $match: { ratingsAverage: { $gte: 4.0 } } },
      //2. adım (zorluklara göre gruplandırıp ortalama değerlerini hesapla)
      {
        $group: {
          _id: "$difficulty",
          count: { $sum: 1 },
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minRating: { $min: "$price" },
          maxRating: { $max: "$price" },
        },
      },
      //3. adım (gruplanan veriyi fiyata göre sırala)
      { $sort: { avgPrice: 1 } },
      //4. adım (fiyatı 500den büyük olanları kaldır)
      { $match: { avgPrice: { $gte: 500 } } },
    ]);
    return res.status(200).json({ message: "Rapor oluşturuldu", stats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Rapor OluşturulaMAdı" });
  }
};

// rapor aluşturup gönder
// belirli bir yıl için o yılın her ayında kaç tane ve hangi turlar başlayacak.
exports.getMonthlyPlan = async (req, res) => {
  try {
    //parametre olarak gelen yılı al
    const year = Number(req.params.year);
    console.log(year);
    // raporu oluştur
    const stats = await Tour.aggregate([
      {
        $unwind: {
          path: "$startDates",
        },
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: {
            $month: "$startDates",
          },
          count: {
            $sum: 1,
          },
          tours: {
            $push: "$name",
          },
        },
      },
      {
        $addFields: {
          month: "$_id",
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: {
          month: 1,
        },
      },
    ]);

    if (stats.length === 0) {
      res
        .status(404)
        .json({ message: `${year} yılında herhangi bir tur başlamıyor` });
      return;
    }

    res
      .status(200)
      .json({ message: `${year} yılı için aylık plan oluşturuldu.`, stats });
  } catch (error) {
    res.status(404).json({
      message: `${year} yılı için aylık plan oluşturulamadı.`,
      error: error.message,
    });
  }
};
