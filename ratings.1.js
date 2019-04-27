const axios = require("axios");
const pg = require("pg");
// const ratingsJson = require("./ratings.json");





const connectionString ="postgres://postgres:postgres@localhost:5432/movie_recommender";

const client = new pg.Client(connectionString);
client.connect(function(err) {
  if (err) {
    console.log(err);
  }else{
    let sql="COPY ratings_rating(id,rating,movie_id,user_id) TO 'C:/Users/sbboy/Desktop/ratings_rating.csv' DELIMITER ',' CSV HEADER"
    client.query(sql, values, (err, res) => {
    if (err) {
        console.log(err.stack)
    }
    })
    console.log(values)
    }
    // console.log(ratings.length)
    console.log('connected')
  }
})