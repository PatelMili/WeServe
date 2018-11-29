var express = require('express');
var router = express.Router();
// var pool = require('../connections/mysql')
var mysql = require('mysql')
var mongoose = require('mongoose');
var kafka = require('../kafka/client');


//var { User } = require('../models/userInfo');
var bcrypt = require('bcryptjs')
var UserInfo = require('../models/userInfo').users

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

module.exports = router;