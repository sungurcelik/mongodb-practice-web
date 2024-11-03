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
