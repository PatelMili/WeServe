var express = require('express');
var router = express.Router();
// var pool = require('../connections/mysql')
var mysql = require('mysql')
var mongoose = require('mongoose');
var kafka = require('../kafka/client');

//var { User } = require('../models/userInfo');
var bcrypt = require('bcryptjs')
var UserInfo = require('../models/userInfo').users
var Opportunity = require('../models/opportunity')

var ps = require('python-shell');
var path = require('path');
var python = require('python')

var weather = require('weather-js');
var Distance = require('geo-distance');
var getCoords = require('city-to-coords');

/* Volunteer Sign up */
router.post('/volunteer/signup', async function (req, res, next) {

    console.log('\n\nIn user signup');
    console.log("Request Got: ", req.body)
    const email = req.body.email
    const pwd = bcrypt.hashSync(req.body.pwd, 10)
    const firstName = req.body.fname
    const lastName = req.body.lname
    const type = req.body.type
    const username = req.body.username
    const city = req.body.city
    const cause = req.body.cause
    const age = req.body.age
    const gender = req.body.gender
    // const lat=req.body.lat
    // const long = req.body.long

    //mongo query here
    var user = new UserInfo({
        fname: firstName,
        lname: lastName,
        type: type,
        email: email,
        password: pwd,
        username: username,
        city: city,
        causes: cause,
        age: age,
        gender: gender
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

/**
 * NGO Signup
 */
router.post('/ngo/signup', async function (req, res, next) {

    console.log('\n\nIn user signup');
    console.log("Request Got: ", req.body)
    const email = req.body.email
    const pwd = bcrypt.hashSync(req.body.pwd, 10)
    const type = req.body.type
    const fname = req.body.fname
    const lname = req.body.lname
    const username = req.body.username
    const city = req.body.city
    const cause = req.body.cause
    const organisation_name = req.body.organisation_name;
    const contact_person = req.body.contact_person
    const description = req.body.description
    const mission = req.body.mission
    const vision = req.body.vision


    // const lat=req.body.lat
    // const long = req.body.long

    //mongo query here
    var user = new UserInfo({

        type: type,
        email: email,
        password: pwd,
        username: username,
        fname: fname,
        lname: lname,
        city: city,
        causes: cause,
        organisation_name: organisation_name,
        contact_person: contact_person,
        description: description,
        mission: mission,
        vision: vision
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

/**update in signup */
router.post('/signup_google', async function (req, res, next) {

    console.log('\n\nIn user signup');
    console.log("Request Got: ", req.body)
    const username = req.body.username
    const city = req.body.city
    const cause = req.body.cause
    const age = req.body.age
    const gender = req.body.gender

    UserInfo.update(
        { "username": username },
        {
            $set: {

                "gender": gender,
                "causes": cause,
                "city": city,
                "cause": cause

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

                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                const data = {
                    "status": 1,
                    "msg": "Successfully updated the profile",
                    "info": {
                        result: result
                    }
                }
                console.log("data being sent to frontend:\n", JSON.stringify(data))
                res.end(JSON.stringify(data))

            }
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

    const fname = req.body.fname
    const lname = req.body.lname
    const gender = req.body.gender
    const country = req.body.country
    const city = req.body.city
    const cause = req.body.causes
    const age = req.body.age


    const username = req.body.username;

    UserInfo.update(
        { "_id": userId },
        {
            $set: {
                "fname": fname,
                "lname": lname,
                "gender": gender,
                "country": country,
                "city": city,
                "causes": cause,
                "skills": skill,
                "languages": language,
                "hear_about_us": hear_about_us,
                "mobile_no": mobile_no,
                "username": username
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
router.put('/ngo_detail', function (req, res) {
    console.log("inside the get request for ngo details")

    const organisation_name = req.body.organisation_name
    console.log("_________organisation_name___________", organisation_name)
    UserInfo.find({ organisation_name: organisation_name })
        .populate('opportunities_posted')
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
    console.log("_________userId___________", userId)

    UserInfo.findById(userId)
        .populate('opportunities_enrolled')
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
        }, (err) => {
            console.log("______err caught here first____")
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
        .catch(err => {
            console.log("___________err____________")
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
router.post('/:userId/post_opportunity', async function (req, res, next) {

    console.log('in posting an opportunity request');
    console.log("Request Got: ", req.body);
    var userId = req.params.userId;
    console.log("_________userId__________", userId);

    var latitude = req.body.lat
    var longitude = req.body.long
    if (latitude == 0 || longitude == 0) {

        getCoords('San Jose')
            .then((coords) => {
                console.log(coords);
                latitude = coords.lat,
                    longitude = coords.lng

                var opportunity = new Opportunity({
                    opp_name: req.body.opp_name,
                    opp_description: req.body.opp_description,
                    posted_by: req.params.posted_by,
                    organisation_name: req.body.organisation_name,
                    cause: req.body.cause,
                    start_date: req.body.start_date,
                    end_date: req.body.end_date,
                    hrs: req.body.hrs,
                    location: req.body.location,
                    lat: latitude,
                    long: longitude,
                    rating: 0

                })
                opportunity.save()
                    .then(result => {
                        console.log("_________result_________", result)
                        UserInfo.findByIdAndUpdate(userId, {
                            $push: {
                                opportunities_posted: result._id
                            }
                        }).exec()
                            .then(userResult => {
                                res.writeHead(200, {
                                    'Content-Type': 'application/json'
                                })
                                const data = {
                                    "status": 1,
                                    "msg": "Successfully posted an opportunity",
                                    "info": {
                                        result: result
                                    }
                                }
                                console.log("data being sent to frontend:\n", JSON.stringify(data))
                                res.end(JSON.stringify(data))
                            })
                            .catch(err => {
                                console.log("_____________err_____________", err)
                                res.writeHead(400, {
                                    'Content-Type': 'application/json'
                                })
                                const data = {
                                    "status": 0,
                                    "msg": "can't fetch the volunteer detail",
                                    "info": {
                                        result: userResult
                                    }
                                }
                                res.end(JSON.stringify(data))
                            })

                    }, (err) => {
                        res.writeHead(400, {
                            'Content-Type': 'application/json'
                        })
                        const data = {
                            "status": 0,
                            "msg": "can't poste the opportunity",
                            "info": {
                                result: userInfo
                            }
                        }
                        res.end(JSON.stringify(data))
                    })
            });

    } else {
        var opportunity = new Opportunity({
            opp_name: req.body.opp_name,
            opp_description: req.body.opp_description,
            posted_by: req.params.posted_by,
            organisation_name: req.body.organisation_name,
            cause: req.body.cause,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            hrs: req.body.hrs,
            location: req.body.location,
            lat: latitude,
            long: longitude

        })
        opportunity.save()
            .then(result => {
                console.log("_________result_________", result)
                UserInfo.findByIdAndUpdate(userId, {
                    $push: {
                        opportunities_posted: result._id
                    }
                }).exec()
                    .then(userResult => {
                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        })
                        const data = {
                            "status": 1,
                            "msg": "Successfully posted an opportunity",
                            "info": {
                                result: result
                            }
                        }
                        console.log("data being sent to frontend:\n", JSON.stringify(data))
                        res.end(JSON.stringify(data))
                    })
                    .catch(err => {
                        console.log("_____________err_____________", err)
                        res.writeHead(400, {
                            'Content-Type': 'application/json'
                        })
                        const data = {
                            "status": 0,
                            "msg": "can't fetch the volunteer detail",
                            "info": {
                                result: userResult
                            }
                        }
                        res.end(JSON.stringify(data))
                    })

            }, (err) => {
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                })
                const data = {
                    "status": 0,
                    "msg": "can't poste the opportunity",
                    "info": {
                        result: userInfo
                    }
                }
                res.end(JSON.stringify(data))
            })
    }


});

/**
 * search the opportunity by location for volunteer
 */
router.put("/search/opportunity/location", async function (req, res, next) {

    console.log("\nInside the search request for opportunity");
    console.log("\nRequest obtained is : ");
    console.log(JSON.stringify(req.body.location));
    var place1 = {};
    var lat, long;

    weather.find({ search: req.body.location, degreeType: 'F' }, function (err, result) {
        if (err) console.log(err);

        console.log("~~~~~~~~~~~~~~~~~~~~~~", JSON.stringify(result[0].location.lat, null, 2));
        console.log(JSON.stringify(result[0].location.long, null, 2));
        // console.log("~~~~~~~~~result~~~~~~~~~~``",result)
        // lat = result[0].location
        long = result[0].location.long
        lat = JSON.stringify(result[0].location.lat, null, 2)

        place1 = {
            lat: result[0].location.lat,
            long: result[0].location.long
        }
        var Berlin = {
            lat: 52.523,
            lon: 13.412
        };
        place1;
        // console.log("~~~~~~~~~~~~~place1~~~~~~~~~~~~~`", place1, long)
        var dist = Distance.between(place1, Berlin)
        console.log('' + dist.human_readable());
        if (dist > Distance('800 km')) {
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Nice journey!');
        }


    });

    console.log("~~~~~~~~~~~~~place1~~~~~~~~~~~~~`", place1, long)


    // var Oslo = {
    //     lat: 59.914,
    //     lon: 10.752
    // };

    // var OsloToBerlin = Distance.between(Oslo, Berlin);

    // console.log('' + OsloToBerlin.human_readable());
    // if (OsloToBerlin > Distance('800 km')) {
    //     console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Nice journey!');
    // }




    Opportunity.find({
        location: { $regex: req.body.location, $options: 'i' }
    }).exec()
        .then((result, err) => {
            console.log("_______result_________", result)
            console.log("_______result length_________", result.length)

            if (!result.length == 0) {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                const data = {
                    "status": 1,
                    "msg": "Successfully fetched search results",
                    "info": {
                        result: result
                    }
                }
                console.log("data being sent to frontend:\n", JSON.stringify(data))
                res.end(JSON.stringify(data))
            } else {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                const data = {
                    "status": 0,
                    "msg": "No data in search query",
                    "info": {
                        result: result
                    }
                }
                console.log("data being sent to frontend:\n", JSON.stringify(data))
                res.end(JSON.stringify(data))
            }
        })
        .catch(err => {
            console.log("___________err____________", err)
            res.writeHead(400, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 0,
                "msg": "can't fetch the search results",
                "info": {
                    result: result
                }
            }
            res.end("JSON.stringify(data)")
        })



});

/**
 * get top volunteers with max no of opportunities enrolled
 */

router.get('/top_rated/opportunities', function (req, res) {
    console.log("inside the get top 6 opportunities")


    Opportunity.aggregate([
        { $match: { rating: { $gte: 2 } } },
        { $sort: { rating: 1 } },
        { $limit: 6 }
    ])
        .then(result => {
            console.log("_____________result__________", result)
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 1,
                "msg": "successfully found top 6 opportunities",
                "info": {
                    "result": result
                }
            }
            res.end(JSON.stringify(data))
        })
        .catch(err => {
            const data = {
                "status": 0,
                "msg": "Failed fetching the details of top 6 opportunities",
                "info": err
            }
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(data))
        })
        .catch(err => {
            res.send(400, err)
        })

})

/*get top 6 volunteers */
router.get('/top_volunteers', function (req, res) {
    console.log("inside the get top volunteers")

    // Job.aggregate([
    //     { $match: { postedBy: id1 } },
    //     { $project: { jobTitle: 1, count: { $size: '$jobApplied' } } },
    //     { $sort: { count: 1 } },
    //     { $limit: 5 }

    //   ])


    // db.collection.aggregate([
    //     // Project with an array length
    //     { "$project": {
    //         "title": 1,
    //         "author": 1,
    //         "votes": 1,
    //         "length": { "$size": "$votes" }
    //     }},

    //     // Sort on the "length"
    //     { "$sort": { "length": -1 } },

    //     // Project if you really want
    //     { "$project": {
    //         "title": 1,
    //         "author": 1,
    //         "votes": 1,
    //     }}
    // ])



    UserInfo.aggregate([

        { $match: { type: "V" } },
        {
            $project: {
                username: 1,
                // opportunities_enrolled: 1,
                // fname: 1,
                // lname: 1,
                // gender: 1,
                // country: 1,
                city: 1,
                causes: 1,
                count: { $size: '$opportunities_enrolled' }
            }
        },
        { $sort: { count: -1 } },
        { $limit: 6 }
    ])
        .then(result => {

            var i;
            var id = [];
            for (i = 0; i < result.length; i++) {
                id.push(result[i]._id);
            }

            // db.getCollection('feed').
            // find({"_id" : {"$in" : [ObjectId("55880c251df42d0466919268"), ObjectId("55bf528e69b70ae79be35006")]}});
            UserInfo.find({ "_id": { "$in": id } })
                .populate('opportunities_enrolled')
                .exec()
                .then(result => {
                    console.log("~~~~~~~~~~result~~~~~~~~~~````", JSON.stringify(result))
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    const data = {
                        "status": 1,
                        "msg": "successfully found top 6 volunteers",
                        "info": {
                            "result": result
                        }
                    }
                    res.end(JSON.stringify(data))
                })

            console.log("_______id_______", id)
            console.log("_____________result__________", result)

        })
        .catch(err => {
            console.log("___________________errr_____________-", err)
            const data = {
                "status": 0,
                "msg": "Failed fetching the details of top 6 opportunities",
                "info": err
            }
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(data))
        })
        .catch(err => {
            res.send(400, err)
        })

})


/**
 * apply for the opportunity
 */
router.put("/:userId/apply/opportunity", async function (req, res, next) {

    console.log("\nInside the apply request of opportunity");
    console.log("\nRequest obtained is : ");
    console.log(JSON.stringify(req.body.opportunityId));

    const userId = req.params.userId
    const opportunityId = req.body.opportunityId

    UserInfo.findByIdAndUpdate(userId,
        {
            $push: {
                opportunities_enrolled: opportunityId,
            }
        }).exec()
        .then(user_result => {
            console.log("____________user_result_________", user_result)
            Opportunity.findByIdAndUpdate(opportunityId, {
                $push: {
                    applicants: userId,

                }

            }).exec()
                .then(result => {
                    // callback(null, "Success")
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    const data = {
                        "status": 1,
                        "msg": "Successfully applied for the opportunity",
                        "info": {}
                    }
                    console.log("data being sent to frontend:\n", JSON.stringify(data))
                    res.end(JSON.stringify(data))
                })
                .catch(err => {
                    console.log("___________err____________", err)
                    res.writeHead(400, {
                        'Content-Type': 'application/json'
                    })
                    const data = {
                        "status": 0,
                        "msg": "can't apply for the job",
                        "info": {
                            result: result
                        }
                    }
                    res.end("JSON.stringify(data)")
                })
        })
        .catch(err => {

            console.log("___________err____________", err)
            res.writeHead(400, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 0,
                "msg": "can't apply for the job",
                "info": {
                    result: result
                }
            }
            res.end("JSON.stringify(data)")
        })



});

/**
 * get opportunity details
 */
router.get('/:opportunityId/opportunity_detail', function (req, res) {
    console.log("inside the get request for opportunity details")

    const opportunityId = req.params.opportunityId
    console.log("_________userId___________", opportunityId)

    Opportunity.findById(opportunityId)
        .then(userInfo => {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 1,
                "msg": "Successfully fetched the opportunity details",
                "info": {
                    result: userInfo
                }
            }
            console.log("data being sent to frontend:\n", JSON.stringify(data))
            res.end(JSON.stringify(data))
        }, (err) => {
            console.log("______err caught here first____")
            res.writeHead(400, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 0,
                "msg": "can't fetch the opportunity detail",
                "info": {
                    result: userInfo
                }
            }
            res.end("JSON.stringify(data)")
        })
        .catch(err => {
            console.log("___________err____________")
            res.writeHead(400, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 0,
                "msg": "can't fetch the opportunity detail",
                "info": {
                    result: userInfo
                }
            }
            res.end("JSON.stringify(data)")
        })

})

/**
 * search the opportunity by location
 * 
 */
router.put("/search/opportunity/location/lat_long", async function (req, res, next) {

    console.log("\nInside the search request for opportunity !!!!!!!!!!!!!!!");
    console.log("\nRequest obtained is : ");
    console.log(JSON.stringify(req.body));
    var place2 = {};
    var lat = req.body.lat;
    var long = req.body.long;

    var result_first;
    if (lat == 0 || long == 0) {
        getCoords('San Jose')
            .then((coords) => {
                console.log(coords);
                lat = coords.lat,
                    long = coords.lng
                place2 = {
                    lat: lat,
                    long: long
                }


                Opportunity.find().exec()
                    .then((result_o, err) => {
                        // console.log("_______result_________", result_o)
                        // console.log("_______result length_________", result_o.length)
                        //iterate throught the length of the result
                        //get the city name
                        //get the lat long of it
                        //if it matches the criteria store it in an array
                        //place1 is from data base, place2 if of user 
                        if (!result_o.length == 0) {
                            var i = 0;
                            let place1 = {};
                            var resultArr = [];
                            for (i = 0; i < result_o.length; i++) {
                                loc = result_o[i].location;
                                place1 = {
                                    lat: result_o[i].lat,
                                    long: result_o[i].location.long
                                }
                                var dist = Distance.between(place1, place2)
                                console.log('' + dist.human_readable());
                                if (dist > Distance('10km')) {
                                    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Nice journey!');
                                    resultArr.push(result_o);
                                }

                            }

                            first_result = result_o;


                            UserInfo.aggregate([

                                { $match: { type: "V" } },
                                {
                                    $project: {
                                        username: 1,
                                        city: 1,
                                        causes: 1,
                                        count: { $size: '$opportunities_enrolled' }
                                    }
                                },
                                { $sort: { count: -1 } },
                                { $limit: 6 }
                            ])
                                .then(result => {

                                    var i;
                                    var id = [];
                                    for (i = 0; i < result.length; i++) {
                                        id.push(result[i]._id);
                                    }

                                    UserInfo.find({ "_id": { "$in": id } })
                                        .populate('opportunities_enrolled')
                                        .exec()
                                        .then(result => {
                                            console.log("~~~~~~~~~~result~~~~~~~~~~````", JSON.stringify(result))
                                            res.writeHead(200, {
                                                'Content-Type': 'application/json'
                                            })
                                            const data = {
                                                "status": 1,
                                                "msg": "successfully found top 6 volunteers",
                                                "info": {
                                                    "result_volunteer": result,
                                                    "result_ngo": first_result
                                                }
                                            }
                                            res.end(JSON.stringify(data))
                                        })

                                    // console.log("_______id_______", id)
                                    // console.log("_____________result__________", result)

                                })
                                .catch(err => {
                                    console.log("___________________errr_____________-", err)
                                    const data = {
                                        "status": 0,
                                        "msg": "Failed fetching the details of top 6 opportunities",
                                        "info": err
                                    }
                                    res.writeHead(200, {
                                        'Content-Type': 'application/json'
                                    })
                                    res.end(JSON.stringify(data))
                                })
                                .catch(err => {
                                    res.send(400, err)
                                })
                        } else {

                            res.writeHead(200, {
                                'Content-Type': 'application/json'
                            })
                            const data = {
                                "status": 0,
                                "msg": "No data in search query",
                                "info": {
                                    "result_volunteer": result,
                                    "result_ngo": first_result
                                }
                            }
                            console.log("data being sent to frontend:\n", JSON.stringify(data))
                            res.end(JSON.stringify(data))
                        }
                    })
                    .catch(err => {
                        console.log("___________err____________", err)
                        res.writeHead(400, {
                            'Content-Type': 'application/json'
                        })
                        const data = {
                            "status": 0,
                            "msg": "can't fetch the search results",
                            "info": {
                                // "result_volunteer": result,
                                "result_ngo": first_result
                            }
                        }
                        res.end("JSON.stringify(data)")
                    })
            })
    }
    else {
        Opportunity.find().exec()
            .then((result_o, err) => {
                // console.log("_______result_________", result_o)
                // console.log("_______result length_________", result_o.length)
                //iterate throught the length of the result
                //get the city name
                //get the lat long of it
                //if it matches the criteria store it in an array
                //place1 is from data base, place2 if of user 
                if (!result_o.length == 0) {
                    var i = 0;
                    let place1 = {};
                    var resultArr = [];
                    for (i = 0; i < result_o.length; i++) {
                        loc = result_o[i].location;
                        place1 = {
                            lat: result_o[i].lat,
                            long: result_o[i].location.long
                        }
                        var dist = Distance.between(place1, place2)
                        console.log('' + dist.human_readable());
                        if (dist > Distance('10km')) {
                            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Nice journey!');
                            resultArr.push(result_o);
                        }

                    }


                    result_first = result_o


                    UserInfo.aggregate([

                        { $match: { type: "V" } },
                        {
                            $project: {
                                username: 1,
                                city: 1,
                                causes: 1,
                                count: { $size: '$opportunities_enrolled' }
                            }
                        },
                        { $sort: { count: -1 } },
                        { $limit: 6 }
                    ])
                        .then(result => {

                            var i;
                            var id = [];
                            for (i = 0; i < result.length; i++) {
                                id.push(result[i]._id);
                            }

                            UserInfo.find({ "_id": { "$in": id } })
                                .populate('opportunities_enrolled')
                                .exec()
                                .then(result => {
                                    // console.log("~~~~~~~~~~result~~~~~~~~~~````", JSON.stringify(result))
                                    res.writeHead(200, {
                                        'Content-Type': 'application/json'
                                    })
                                    const data = {
                                        "status": 1,
                                        "msg": "successfully found top 6 volunteers",
                                        "info": {
                                            "result_volunteer": result,
                                            "result_ngo": result_o
                                        }
                                    }
                                    res.end(JSON.stringify(data))
                                }).catch(e => {
                                    console.log("___________________errr_____________-", e)
                                    const data = {
                                        "status": 0,
                                        "msg": "Failed fetching the details of top 6 opportunities",
                                        "info": e
                                    }
                                    res.writeHead(200, {
                                        'Content-Type': 'application/json'
                                    })
                                    res.end(JSON.stringify(data))
                                })


                            // console.log("_______id_______", id)
                            // console.log("_____________result__________", result)

                        })
                        .catch(err => {
                            console.log("___________________errr_____________-", err)
                            const data = {
                                "status": 0,
                                "msg": "Failed fetching the details of top 6 opportunities",
                                "info": err
                            }
                            res.writeHead(200, {
                                'Content-Type': 'application/json'
                            })
                            res.end(JSON.stringify(data))
                        })
                        .catch(err => {
                            res.send(400, err)
                        })

                } else {

                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    const data = {
                        "status": 0,
                        "msg": "No data in search query",
                        "info": {
                            result: result_o
                        }
                    }
                    console.log("data being sent to frontend:\n", JSON.stringify(data))
                    res.end(JSON.stringify(data))
                }
            })
            .catch(err => {
                console.log("___________err____________", err)
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                })
                const data = {
                    "status": 0,
                    "msg": "can't fetch the search results",
                    "info": {
                        result: result_o
                    }
                }
                res.end("JSON.stringify(data)")
            })

    }




});

/**
 * get opportunities based on user's age
 */
router.get("/:userId/opportunities_by_age", async function (req, res, next) {

    console.log("\nInside the apply request of opportunity");

    const userId = req.params.userId
    // const opportunityId = req.body.opportunityId

    UserInfo.findById(userId, { age: 1 })
        .exec()
        .then(result => {
            var age = result.age
            if (age < 25) {

                Opportunity.find({
                    $or: [{ cause: { $regex: "Communication", $options: 'i' } }, { cause: { $regex: "Education and Literacy", $options: 'i' } }]
                })
                    .exec()
                    .then(res_user => {
                        console.log("!!!!!!!!!!!!!!!!!!!!!!!res_user!!!!!!!!!!!!!", res_user)
                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        })
                        const data = {
                            "status": 1,
                            "msg": "successfully found no of profile views of the user",
                            "info": {
                                "result": res_user
                            }
                        }
                        // console.log("____________data_________________", data)
                        res.end(JSON.stringify(data))
                    })

            } else {

                Opportunity.find({
                    $or: [{ cause: { $regex: "Animal", $options: 'i' } }, { cause: { $regex: "Children", $options: 'i' } }]
                })
                    .exec()
                    .then(res_user => {
                        console.log("!!!!!!!!!!!!!!!!!!!!!!!res_user!!!!!!!!!!!!!", res_user)
                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        })
                        const data = {
                            "status": 1,
                            "msg": "successfully found no of profile views of the user",
                            "info": {
                                "result": res_user
                            }
                        }
                        // console.log("____________data_________________", data)
                        res.end(JSON.stringify(data))
                    })
            }

        })
        .catch(err => {

            const data = {
                "status": 0,
                "msg": "Failed fetching the no of views of the user",
                "info": err
            }
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(data))
            console.log("______err__________", err)
        })




});

/**
 * get oppoertunities based on gender
 */
router.get("/:userId/opportunities_by_gender", async function (req, res, next) {

    console.log("\nInside the apply request of opportunity");

    const userId = req.params.userId
    // const opportunityId = req.body.opportunityId

    UserInfo.findById(userId, { gender: 1 })
        .exec()
        .then(result => {
            var gender = result.gender
            if (gender == "Male" || gender == "m") {

                Opportunity.find({
                    $or: [{ cause: { $regex: "Communication", $options: 'i' } }, { cause: { $regex: "Education and Literacy", $options: 'i' } }]
                })
                    .exec()
                    .then(res_user => {
                        console.log("!!!!!!!!!!!!!!!!!!!!!!!res_user!!!!!!!!!!!!!", res_user)
                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        })
                        const data = {
                            "status": 1,
                            "msg": "successfully found no of profile views of the user",
                            "info": {
                                "result": res_user
                            }
                        }
                        // console.log("____________data_________________", data)
                        res.end(JSON.stringify(data))
                    })

            } else {

                Opportunity.find({
                    $or: [{ cause: { $regex: "Animal", $options: 'i' } }, { cause: { $regex: "Children", $options: 'i' } }]
                })
                    .exec()
                    .then(res_user => {
                        console.log("!!!!!!!!!!!!!!!!!!!!!!!res_user!!!!!!!!!!!!!", res_user)
                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        })
                        const data = {
                            "status": 1,
                            "msg": "successfully found no of profile views of the user",
                            "info": {
                                "result": res_user
                            }
                        }
                        // console.log("____________data_________________", data)
                        res.end(JSON.stringify(data))
                    })
            }

        })
        .catch(err => {

            const data = {
                "status": 0,
                "msg": "Failed fetching the no of views of the user",
                "info": err
            }
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(data))
            console.log("______err__________", err)
        })




});


/**
 * get volunteer's based on the causes they support*/
router.put("/search/volunteer/causes", async function (req, res, next) {
    var causes1 = req.body.causes;
    console.log("___________causes___________", causes1)
    UserInfo.find({
        $and: [{ type: "V" }, { causes: { $regex: causes1, $options: 'i' } }]

    })

        .populate('opportunities_enrolled')

        .then(res_user => {
            console.log("!!!!!!!!!!!!!!!!!!!!!!!res_user!!!!!!!!!!!!!", res_user)
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 1,
                "msg": "successfully found no of profile views of the user",
                "info": {
                    "result": res_user
                }
            }
            // console.log("____________data_________________", data)
            res.end(JSON.stringify(data))
        })


});





/**get the recommendations from the array of ids */
router.get("/:userId/recommendations", async function (req, res, next) {

    console.log("\nInside the get recommendations");

    var userId=req.params.userId
    ////////////////////////////////////////////////////////////////////////////////////////////

    // console.log("Now will do the python calling")
    // // var firstname = "abc";
    // var user_Id = userId;
    // var options = {
    //     args:
    //     [
    //     user_Id
    //     ]
    // }

    // var opp_id_data = []

    // var python_path = path.join(__dirname+"/python/test.py")
    // console.log("_______python-path : "+python_path);
    // console.log("Now calling the PythonShell.run");
    // console.log("---------------- Just before PythonShell.run -------------------- ");
    // ps.PythonShell.run('C:/Users/DELL/Desktop/SJSU/python/test.py', options, function (err, data) {
    //     if (err) {
    //     console.log("Some error occured!");
    //     console.log(err);
    //     }
    //     else {
    //     console.log("Success");
    //     console.log("\n_________Without stringify_________");
    //     console.log(data)
    //     console.log("The length of the data obtained is  : "+data.length)
    //     opp_id_data = data
    //     }   
    // });

    //////////////////////////////////////////////////////////////////////////////////////////////

    console.log("Data obtained from python script is \n");
    // console.log(opp_id_data)

    var id = [ '5c08601ddd3f3f04281d78ae',
                '5c081d14c81b07033c27faf8',
                '5c08621d24108432004d598e',
                '5c081b4dc81b07033c27faf5',
                '5c081b9cc81b07033c27faf6',
                '5c0864c924108432004d5990',
                '5c08176ec81b07033c27faf1',
                '5c081d03c81b07033c27faf7',
                '5c081d22c81b07033c27faf9',
                '5c0861e724108432004d598d' ]

    // var id = [];

    Opportunity.find({ "_id": { "$in": id } })
        // .populate('applicants')
        .exec()
        .then(result => {
            console.log("~~~~~~~~~~result~~~~~~~~~~````", JSON.stringify(result))
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 1,
                "msg": "successfully found top 6 volunteers",
                "info": {
                    "result": result,
                    
                }
            }
            res.end(JSON.stringify(data))
        })


});

/**
 * get ngo's based on the causes they support*/

router.put("/search/ngo/causes", async function (req, res, next) {
    var causes1 = req.body.causes;
    console.log("___________causes___________", causes1)
    //
    // db.inventory.find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )
    UserInfo.find({
        $and: [{ type: "N" }, { causes: { $regex: causes1, $options: 'i' } }]
        // $and: [{ causes: { $regex: causes1, $options: 'i' } }]
    })



        // UserInfo.find({type:"N"},{ causes: { $regex: causes1, $options: 'i' } },{
        //     // $and: [{ causes: { $regex: causes1, $options: 'i' } }]
        // })

        .populate('opportunities_posted')

        .then(res_user => {
            console.log("!!!!!!!!!!!!!!!!!!!!!!!res_user!!!!!!!!!!!!!", res_user)
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            const data = {
                "status": 1,
                "msg": "successfully found no of profile views of the user",
                "info": {
                    "result": res_user
                }
            }
            // console.log("____________data_________________", data)
            res.end(JSON.stringify(data))
        })


});


function callPython(req, res) 
{
  console.log("Inside the function callPython")
  var firstname = "abc";
  var userId = 917;
  var options = {
    args:
    [
      userId
    ]
  }

  var python_path = path.join(__dirname+"/python/test.py")
  console.log("_______python-path : "+python_path);
  console.log("Now calling the PythonShell.run");
  console.log("---------------- Just before PythonShell.run -------------------- ");
  ps.PythonShell.run('C:/Users/DELL/Desktop/SJSU/python/test.py', options, function (err, data) {
    if (err) {
      console.log("Some error occured!");
      console.log(err);
    }
    else {
      console.log("Success");
      console.log("\n_________Without stringify_________");
      console.log(data)
      console.log("The length of the data obtained is  : "+data.length)
    }
    
  });
}


module.exports = router;