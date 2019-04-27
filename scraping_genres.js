const axios = require("axios");
const pg = require("pg");

const connectionString = "postgres://postgres:postgres@localhost:5432/movies";

const client = new pg.Client(connectionString);
client.connect(function (err) {
  if (err) {
    console.log(err);
  }
});


// console.log(all_movies);

let i = 0;

let interval = setInterval(() => {
  (i => {
    const url =
      "http://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=a3abe9699d800e588cb2a57107b4179c"
    axios.get(url)
      .then((res) => {
        res.data.genres[0].id
        return client.query(
          new pg.Query(
            "insert into genres(id,name) values('" +
            res.data.genres[i].id +
            "', '" +
            res.data.genres[i].name +
            "')"
          )
        );
      })


  })(i);
  if (i < 19) i++;
  else clearInterval(interval);
}, 500);
//https://api.themoviedb.org/3/movie/550?api_key=582a8603f59dea247ae6c02f648fccbf
//https://api.themoviedb.org/3/movie?api_key=582a8603f59dea247ae6c02f648fccbf&query=Epoch