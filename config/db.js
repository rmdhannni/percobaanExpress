let mysql = require('mysql'); // import library mysql
// membuat variabel connection yang isinya konfigurasi dari koneksi database mysql
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_express',
});

//membuat kndisi untuk melihat apakah koneksi berjalan atau tidak
connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log('Koneksi berhasil');
  }
});
//kita export module connection agar bisa digunakan di file lain
module.exports = connection;
