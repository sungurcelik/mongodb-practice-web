# Mongoose

- Node.js ortamında MongoDb veritabanının methodlarını kullanmamızı sağlayan bir kütüphanedir.
- ODM Kütüphanesi olarak geçer (Object Data Modeling)

## Mongoose Tmeel Özellikleri

1. Şema Tanımlama
2. Modelleme
3. Doğrulama (Validation)

# Environment Variables

- Ortam / Çevre Değişkenleri

- Projeyi paylaşırken admin şifresi / veritabanı bağlantı URL / API key gibi hassas bilgileri github'a göndermeyiz.

- Bu noktada projenin çalışması için gerekli olan ama githuba yüklemek istemedğimiz değişkenler var ise .env dosyasında bu değişkenler saklanmalı.

- .gitignore dosyasına .env dosyası eklenerek bu dosyanın githuba gönderilmesi engellenmeli.

# Operatorler

- gt (>): greater than
- gte (>=) greater than or equals
- lt (<): less than
- lte (>=): less than or equals
- ne (!=): not equals

# Alias Routes

- Bazı durumlarda client'in belirli parametreler ile API'ye istek atabilir.
- Bu parametrelerin sayısı fazla olucağı bazı senaryolarda parametre ekleme işlemini frontende bırakmak yerine takma isim olarak oluşturduğumuz bir route le yapılabilir.
- Karmaşık ve uzun url'leri daha anlaşılır hale getirmek için yapılır.
