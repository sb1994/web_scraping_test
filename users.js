const axios = require("axios");
const pg = require("pg");
const csv = require("csvtojson");
const connectionString =
  "postgres://postgres:postgres@localhost:5432/movie_recommender";

let users={}
let id 
const client = new pg.Client(connectionString);
client.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("connected");
    axios
      .get('https://randomuser.me/api/?results=2000')
      .then(result => {
        users = result.data.results
        for(let i =0;i<users.length;i++){
          // console.log(users[i].name.first);
          let sql = "INSERT INTO auth_user(email,password,username,first_name,last_name,is_superuser,is_staff,is_active,date_joined)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id"
          let values = [users[i].email,users[i].login.password,users[i].login.username,users[i].name.first,users[i].name.last,false,false,true,users[i].registered.date]
          client.query(sql, values, (err, res) => {
            if (err) {
              console.log(err.stack);
            }
            else{
              let sql = "INSERT INTO accounts_userprofile(bio,avatar,status,name,fav_quote,user_id)VALUES($1,$2,$3,$4,$5,$6)"
              // if(i===0){
              //   id =i+1
              // }else{
              //   id=i
              // }
              let values = ['This is my bio, my name is '+users[i].login.username ,users[i].picture.medium,'Member',users[i].login.username,'Ill be back',res.rows[0].id]
              client.query(sql, values, (err, res) => {
                if (err) {
                  console.log(err.stack);
                }
              })
              console.log(res.rows[0].id)
              
            }
          });
        }
        
        
      })
      .catch(err=>{
        console.log(err);
        
      })
  }
})