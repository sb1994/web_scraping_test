const axios = require("axios");
const pg = require("pg");
const mysql = require("mysql");
const csv = require("csvtojson");
const linksCsv = "./ml-latest-small/links.csv";
const moviesCsv = "./ml-20m/movies.csv";
let movie_ids = [];
let movies = [];
console.log("hello world");

csv()
  .fromFile(linksCsv)
  .then(jsonObj => {
    movie_ids = jsonObj;
    // console.log(movie_ids.length);

    // const url = `https://api.themoviedb.org/3/movie/${
    //   movie_ids[i]
    // }?api_key=a3abe9699d800e588cb2a57107b4179c`;
    const connectionString =
      "postgres://postgres:postgres@localhost:5432/movie_recommender";

    const client = new pg.Client(connectionString);
    client.connect(function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("connected");

        let i = 631;

        let interval = setInterval(() => {
          (i => {
            const url = `https://api.themoviedb.org/3/movie/${
              movie_ids[i].tmdbId
            }?api_key=a3abe9699d800e588cb2a57107b4179c`;
            // console.log(url);

            axios
              .get(url)
              .then(result => {
                let movie = result.data;
                if (movie) {
                  const sql =
                    "INSERT INTO movies_movie(title, poster_path, runtime, status, tagline, release_date, overview, popularity, tmdb_id,  budget, backdrop_path,orginal_title,video,vote_average,vote_count)"+
                    " VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)";
                  // console.log(sql);
                  let values=[];
                  if (movie.backdrop_path === null) {
                     values= [
                      movie.title,
                      movie.poster_path,
                      movie.runtime,
                      movie.status,
                      movie.tagline,
                      movie.release_date,
                      movie.overview,
                      movie.popularity,
                      movie.id,
                      movie.budget,
                      'not_found',
                      movie.original_title,
                      movie.video,
                      movie.vote_average,
                      movie.vote_count
                    ];  
                  } else {
                      values = [
                        movie.title,
                        movie.poster_path,
                        movie.runtime,
                        movie.status,
                        movie.tagline,
                        movie.release_date,
                        movie.overview,
                        movie.popularity,
                        movie.id,
                        movie.budget,
                        movie.backdrop_path,
                        movie.original_title,
                        movie.video,
                        movie.vote_average,
                        movie.vote_count
                      ];  
                    
                  }
                  
                  console.log(values);

                  client.query(sql, values, (err, res) => {
                    if (err) {
                      console.log(err.stack);
                    }
                  });
                } else {
                  console.log("Movie not found");
                }
              })
              .catch(err => {
                console.log(err);
              });
          })(i);
          if (i < 27278) i++;
          // if (i < 12) i++;
          else clearInterval(interval);
        }, 500);
      }
    });
  });
// csv()
//   .fromFile(moviesCsv)
//   .then(jsonObj => {
//     // console.log(jsonObj);
//     movies = jsonObj;
//   });

console.log(movie_ids);

// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "movie_recommender"
// });

// con.connect(function (err) {
//   if (err) throw err;
//   con.query("SELECT imdb_id FROM movie_ids", function (err, result, fields) {
//     if (err) throw err;
//     for (let i = 0; i < result.length; i++) {
//       movie_ids[i] = result[i].imdb_id
//     }
//     const url = "https://api.themoviedb.org/3/movie/" + movie_ids[1] + "?api_key=a3abe9699d800e588cb2a57107b4179c"
//     console.log(url);

//     // axios.get(url)
//     //   .then(result => {
//     //     console.log(result.data);

//     //   })
//     //   .catch(err => {
//     //     console.log(err);
//     //   });
//   });
// });
