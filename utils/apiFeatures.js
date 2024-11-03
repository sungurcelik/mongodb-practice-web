// sıralama, filtreleme, alan limitleme, sayfalama gibi özellikleri projede birden fazla noktada kullanmak isteyebiliriz. bu durumda kod tekrarına düşmemek için buütün bu methodları bir class içerisinde tanımlayalım.

class APIFeatures {
  constructor(query, params, formattedParams) {
    this.query = query; // oluşturulan DB sorgusu
    this.params = params; // api isteğinden gelen saf parametreler
    this.formattedParams = formattedParams; // mw'den gelen formatlanmış parametreler
  }

  filter() {
    this.query = this.query.find(this.formattedParams);
    return this;
  }

  sort() {
    // eğer sort parametresi varsa sırala
    if (this.params.sort) {
      this.query.sort(this.params.sort.split(",").join(" "));
    } else {
      this.query.sort("-createdAt");
    }
    return this;
  }

  limit() {
    // limit varsa limitle
    if (this.params.fields) {
      this.query.select(this.params.fields.replaceAll(",", " "));
    }
    return this;
  }

  pagination() {
    // page sayfala
    const page = Number(this.params.page) || 1; // mevcut sayfa sayısı
    const limitCount = Number(this.params.limit) || 10; // sayfa başına eleman sayısı
    const skipCount = (page - 1) * limitCount; // mevcut sayfadaki için kaç eleman atlanmalı

    this.query.skip(skipCount).limit(limitCount);
    return this;
  }
}

module.exports = APIFeatures;
