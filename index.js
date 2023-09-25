const express = require("express"); // membuat varibale baru dengan nama express dan nilainya kita memanggil Express.js
const app = express(); // membuat variable baru dengan nama app yang isinya variable express
const port = 3000; // membuat variable dengan nama port yang isinya 3000 port ini yang akan kita gunakan untuk menjalankan express

//membuat route baru dengan method GET yang isinya kalimat halo dek
// app.get('/', (req, res) => {
//     res.send('Halo lovedek')
// })

//import route posts

const bodyPs = require("body-parser"); //import body-parser
app.use(bodyPs.urlencoded({ extended: false }));
app.use(bodyPs.json());

const mhsRouter = require("./routes/mahasiswa");
app.use("/api/mhs", mhsRouter);

// kita listen Express.js kedalam port yang kita buat diatas
app.listen(port, () => {
  //dan kita tampilkan log sebagai penanda bahawa Express,js  berhasil dijalan kan di port 3000
  console.log(`aplikasi berjalan di http:://localhost:${port}`);
});
