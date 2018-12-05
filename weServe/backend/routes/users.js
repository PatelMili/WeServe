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
    const firstName = req.body.fname
    const lastName = req.body.lname
    const type = req.body.type
    const username = req.body.username

    //mongo query here
    var user = new UserInfo({
        fname: firstName,
        lname: lastName,
        type: type,
        email: email,
        password: pwd,
        username: username
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
                "username": user.username,
                "type": type,
                "email": email
            }
        }
        console.log("data being sent to frontend:\n", JSON.stringify(data))
        res.end(JSON.stringify(data))


    }, (err) => {
        console.log("__________err_______8787878____", err)
        console.log(`Signup Failed in mongo`);
        console.log("User already exists ", err.errmsg)
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        const data = {
            "status": 0,
            "msg": err.message,
            "info": {
                "error": err.message
            }
        }
        console.log("data being sent to frontend:\n", JSON.stringify(data))
        res.end(JSON.stringify(data))
    })

});

/*login  */
router.post('/login', async function (req, res, next) {

    console.log('\n\nIn user login');
    console.log("Request Got: ", req.body)
    const username = req.body.username;
    // const type = req.body.type
    const pwd = req.body.pwd;


    UserInfo.findOne({
        username: username
    }, function (err, user) {
        if (err) {
            console.log("error occured")
            res.writeHead(400, {
                'Content-Type': 'application/json'
            })

            res.end("some error in sql query")

        } else if (user && bcrypt.compareSync(pwd, user.password)) {
            console.log("login successfull")
            console.log("Successfully Logged In")
            console.log("_____________user__________________-", user)
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 1,
                "msg": "Successfully Logged In",
                "info": {
                    "userId": user._id,
                    "fullname": user.fname + " " + user.lname,
                    "email": user.email,
                    "username": username,
                    "type": user.type
                }
            }
            console.log("data being sent to frontend:\n", JSON.stringify(data))
            res.end(JSON.stringify(data))

        } else if ((user && !bcrypt.compareSync(pwd, user.password))) {
            console.log("password doesn't match");
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 0,
                "msg": "Error in login,Incorrect Password",
                "info": {}
            }
            console.log("data being sent to frontend:\n", JSON.stringify(data))
            res.end(JSON.stringify(data))

        } else {
            console.log("incorrect username!");
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 0,
                "msg": "Error in login,Incorrect  username",
                "info": {}
            }
            console.log("data being sent to frontend:\n", JSON.stringify(data))
            res.end(JSON.stringify(data))
        }
    })


});


/**
 * profile updation of volunteer route
 */
router.put('/:userId/profile_information', async function (req, res, next) {

    console.log('\n\nIn profile information filling request of the volunteer');
    console.log("Request Got: ", req.body)
    // const userId=mongoose.mongo.ObjectID(req.params.userId);
    const userId = req.params.userId;

    console.log("________req for user id__________", userId)
    const mobile_no = req.body.mobile_no;
    const fname = req.body.fname
    const lname = req.body.lname
    const gender = req.body.gender
    const birthdate = req.body.birthdate
    const country = req.body.country
    const city = req.body.city
    const profession = req.body.profession
    const interested_in = req.body.interested_in
    const cause = req.body.causes
    const skill = req.body.skills
    const language = req.body.languages
    const hear_about_us = req.body.hear_about_us

    UserInfo.update(
        { "_id": userId },
        {
            $set: {
                "fname": fname,
                "lname": lname,
                "gender": gender,
                "birthdate": birthdate,
                "country": country,
                "city": city,
                "profession": profession,
                "interested_in": interested_in,
                "causes": cause,
                "skills": skill,
                "languages": language,
                "hear_about_us": hear_about_us,
                "mobile_no": mobile_no
            },
        }, function (err, result) {
            if (err) {
                console.log("error occured", err)
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                })

                res.end("some error in sql query")

            } else if (result) {
                console.log("Successfully updated the profile")
                console.log("_____result_____", result)

                UserInfo.findById(userId)
                    .then(userInfo => {
                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        })
                        const data = {
                            "status": 1,
                            "msg": "Successfully updated the profile",
                            "info": {
                                result: userInfo
                            }
                        }
                        console.log("data being sent to frontend:\n", JSON.stringify(data))
                        res.end(JSON.stringify(data))
                    })
                    .catch(err => {
                        res.writeHead(400, {
                            'Content-Type': 'application/json'
                        })
                        const data = {
                            "status": 0,
                            "msg": "can't update the profile",
                            "info": {
                                result: userInfo
                            }
                        }
                        res.end("JSON.stringify(data)")
                    })

            }
        })
});

/**
 * profile updation of the ngo route
 */
router.put('/:userId/ngo_profile_information', async function (req, res, next) {

    console.log('\n\nIn profile information filling request of the ngo');
    console.log("Request Got: ", req.body)
    // const userId=mongoose.mongo.ObjectID(req.params.userId);
    const userId = req.params.userId;

    console.log("________req for user id__________", userId)
    const organisation_name = req.body.organisation_name;
    const contact_person = req.body.contact_person
    const mobile_no = req.body.mobile_no
    const email = req.body.email
    const description = req.body.description
    const mission = req.body.mission
    const vision = req.body.vision
    const skill = req.body.skills
    const industry = req.body.industry


    UserInfo.update({ "_id": userId }, {
        $set: {
            organisation_name: organisation_name,
            contact_person: contact_person,
            mobile_no: mobile_no,
            email: email,
            description: description,
            mission: mission,
            vision: vision,
            skills: skill,
            industry: industry

        }
    }, function (err, result) {
        if (err) {
            console.log("error occured", err)
            res.writeHead(400, {
                'Content-Type': 'application/json'
            })

            res.end("some error in query")

        } else if (result) {
            console.log("Successfully updated the profile of the ngo")
            console.log("_____result_____", result)

            UserInfo.findById(userId)
                .then(userInfo => {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    const data = {
                        "status": 1,
                        "msg": "Successfully updated the profile",
                        "info": {
                            result: userInfo
                        }
                    }
                    console.log("data being sent to frontend:\n", JSON.stringify(data))
                    res.end(JSON.stringify(data))
                })
                .catch(err => {
                    res.writeHead(400, {
                        'Content-Type': 'application/json'
                    })
                    const data = {
                        "status": 0,
                        "msg": "can't update the profile",
                        "info": {
                            result: userInfo
                        }
                    }
                    res.end("JSON.stringify(data)")
                })

        }
    })

});


/**
 * get ngo details
 */
router.get('/:userId/ngo_detail', function (req, res) {
    console.log("inside the get request for ngo details")

    const userId = req.params.userId
    console.log("_________userId___________",userId)
    UserInfo.findById(userId)
        .then(userInfo => {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 1,
                "msg": "Successfully fetched the ngo details",
                "info": {
                    result: userInfo
                }
            }
            console.log("data being sent to frontend:\n", JSON.stringify(data))
            res.end(JSON.stringify(data))
        })
        .catch(err => {
            res.writeHead(400, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 0,
                "msg": "can't fetch the ngo detail",
                "info": {
                    result: userInfo
                }
            }
            res.end("JSON.stringify(data)")
        })

})

/**
 * get volunteer details
 */
router.get('/:userId/volunteer_detail', function (req, res) {
    console.log("inside the get request for volunteer details")

    const userId = req.params.userId
    console.log("_________userId___________",userId)

    UserInfo.findById(userId)
        .then(userInfo => {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 1,
                "msg": "Successfully fetched the volunteer details",
                "info": {
                    result: userInfo
                }
            }
            console.log("data being sent to frontend:\n", JSON.stringify(data))
            res.end(JSON.stringify(data))
        })
        .catch(err => {
            res.writeHead(400, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 0,
                "msg": "can't fetch the volunteer detail",
                "info": {
                    result: userInfo
                }
            }
            res.end("JSON.stringify(data)")
        })

})

/**
 * post an opportunity by the ngo
 */





module.exports = router;