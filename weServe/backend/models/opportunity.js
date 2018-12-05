var mongoose =require('mongoose');

var opportunity= mongoose.Schema({
    opp_name:{
        type:String,
        required:true
    },
    opp_description:{
        type:String
    },
    posted_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    organisation_name:{
        type:String,
        required:true
    },
    cause:{
        type:String
    },
    start_date:{
        type:Date
    },
    end_date:{
        type:Date
    },
    hrs:{
        type:Number
    },
    lat:{
        type:String
    },
    long:{
        type:String
    },
    lat_long_flag:{
        type:Number
    },
    rating:{
        type:Number
    },
    location:{
          type:String
    },
    applicants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Users'
        }
    ]
})

module.exports = mongoose.model('Opportunity',opportunity);