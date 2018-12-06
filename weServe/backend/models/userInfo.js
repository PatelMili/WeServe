var mongoose =require('mongoose');
 
var users= mongoose.model('Users',{
    email : {
        type : String,
        unique:true
    },
    fname : {
        type : String,
        required: true
    },
    lname : {
        type : String,
        required: true     
    },
    type : {
        type : String,
        required: true
    },
    password : {
        type : String
    },
    username : {
        type : String,
        required: true,
        unique:true
    },
    gender : {
        type : String
    },
    country : {
        type : String
    },
    city : {
        type : String
    },
    interested_in : {
        type : String
    },
    causes : {
        type : Array
    },
    organisation_name : {
        type : String
    },
    contact_person : {
        type : String
    },
    description : {
        type : String
    },
    mission : {
        type : String
    },
    vision : {
        type : String
    },  
    age:{
        type:Number
    },
    lat:{
        type:String
    },
    long:{
        type:String
    },
    opportunities_enrolled : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Opportunity'
        }
    ],
    opportunities_posted : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Opportunity'
        }
    ]
})

// mongoose.model('Users',users);

module.exports = {users};