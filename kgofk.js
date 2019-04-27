const fs = require('fs')
const axios = require('axios')
const mysql = require('mysql')

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "movie_recommender",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});
const netflix_user_ids = fs.readFileSync('C:/Users/sbboy/Desktop/web_scraping_test/Sean/04. All User IDs (without blank lines and duplicates)/result.txt').toString().split('\n')

// for (let i = 0; i < netflix_user_ids.length; i++) {
//   const sql = "INSERT INTO netflix_user (netflix_id) VALUES ('" + netflix_user_ids[i] + "')";
//   // console.log(sql);
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Inserted");
//   });
// }
console.log(netflix_user_ids.length);

// const sql = "DELETE FROM netflix_user";

// // console.log(sql);
// con.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("Deleted");
// });

// console.log(netflix_user_ids);