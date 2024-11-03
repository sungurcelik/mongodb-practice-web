module.exports = (req, res, next) => {
  // 1-) istek ile gelen parametlere eriş
  let queryObj = { ...req.query };

  // 2-) Filtrelemeye tabii tutulmayacak parametreleri (sort, fieldsi page, limit) query nesnesinden kaldır.
  const fields = ["sort", "limit", "page", "fields"];
  fields.forEach((el) => delete queryObj[el]);

  // 3-) replace methodunu kullanabilmek için nesneyi stringe çevir
  let queryStr = JSON.stringify(queryObj);

  // 4-) bütün operatörlerib başına $ işareti koy
  queryStr = queryStr.replace(
    /\b(gt|gte|lte|lt|ne)\b/g,
    (found) => `$${found}`
  );

  // 5-) bu mw sonra çalışan methoda nesneyi aktar
  req.formattedQuery = JSON.parse(queryStr);

  // 6-) sonraki method çalışabilir.
  next();
};
