var express = require('express');
var router = express.Router();
// var pool = require('../connections/mysql')
var mysql = require('mysql')
var mongoose = require('mongoose');
var kafka = require('../kafka/client');


//var { User } = require('../models/userInfo');
var bcrypt = require('bcryptjs')
var UserInfo = require('../models/userInfo').users


// var redisClient = require('redis').createClient;
// var redis1 = redisClient(6379, 'localhost');


/* User Sign up */
router.post('/', async function (req, res, next) {

  console.log('\n\nIn user signup');
  console.log("Request Got: ", req.body)
  const email = req.body.email
  const pwd = bcrypt.hashSync(req.body.pwd, 10)
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const type = req.body.type
  const username = req.body.username


//mongo query here
var user = new UserInfo({
    fname: firstName,
    lname: lastName,
    type: type,
    email: email,
    password: pwd,
    username:username
  })
  console.log(`user ${user}`);

  user.save().then(user => {
    console.log("user created in mongo");
    // console.log(`user in then is ${user}`);

    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    const data = {
      "status": 1,
      "msg": "Successfully Signed Up",
      "info": {
        "id": user._id,
        "fullname": user.fname + " " + user.lname,
        "username":user.username,
        "type": type,
        "email": email
      }
    }
    console.log("data being sent to frontend:\n", JSON.stringify(data))
    res.end(JSON.stringify(data))


  }, (err) => {
    console.log("__________err___________", err)
    console.log(`Signup Failed in mongo`);
    console.log("User already exists ", err.errmsg)
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    const data = {
      "status": 0,
      "msg": err.errmsg,
      "info": {
        "error": err.errmsg
      }
    }
    console.log("data being sent to frontend:\n", JSON.stringify(data))
    res.end(JSON.stringify(data))


  })








});

// /* User Login */

// router.post('/login', async function (req, res, next) {

//   console.log('\n\nIn user login');
//   console.log("Request Got: ", req.body)
//   const email = req.body.email
//   const pwd = req.body.pwd;

//   pool.getConnection((
//     err, connection) => {
//     if (connection) {
//       console.log("Connection obtained for Login")
//       const sql = "select * from userinfo WHERE email = " + mysql.escape(email);
//       connection.query(sql,
//         (err, result) => {
//           const password = bcrypt.compareSync(pwd, result[0].pwd);
//           if (result && password) {
//             console.log("Successfully Logged In")
//             res.writeHead(200, {
//               'Content-Type': 'application/json'
//             })
//             const data = {
//               "status": 1,
//               "msg": "Successfully Logged In",
//               "info": {
//                 "fullname": result[0].firstName + " " + result[0].lastName,
//                 "email": email,
//                 "type": result[0].type
//               }
//             }
//             console.log("data being sent to frontend:\n", JSON.stringify(data))
//             res.end(JSON.stringify(data))
//           } else if (err) {
//             console.log("Some error in sql query", err.sqlMessage)
//             res.writeHead(400, {
//               'Content-Type': 'application/json'
//             })

//             res.end("some error in sql query")
//           } else {
//             //password doesn't match
//             console.log("Password doesn't match!")
//             res.writeHead(200, {
//               'Content-Type': 'application/json'
//             })
//             const data = {
//               "status": 0,
//               "msg": "Error in login,Incorrect  password",
//               "info": {}
//             }
//             console.log("data being sent to frontend:\n", JSON.stringify(data))
//             res.end(JSON.stringify(data))

//           }
//         })
//     } else {
//       console.log("Connection Refused ", err)
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Connection Refused")
//     }
//   })
// });

/*
mongo.connect(function(err,db){
        if(err){
            callback(null,"Cannot connect to db");
        }
        else{
            console.log('Connected to mongodb');
            var query = {Email : msg.username};
            var dbo = db.db('usersignup');
            dbo.collection("usersignup").find(query).toArray(function(err,result){
                if(err){
                    //throw err;
                    callback(err,"Error");
                }
                if(result.length > 0){
                    var hash = result[0].Password;
                    bcrypt.compare(msg.password,hash,function(err,doesMatch){
                        if(doesMatch){
                            console.log("Inside result.length",result[0].userID);
                          
                            callback(null,result);
                        } else {
                            callback(null,[]);
                        }
                    });
                }
                else{
                    callback(null,[]);
                }
            });
        }
    });

*/

module.exports = router;