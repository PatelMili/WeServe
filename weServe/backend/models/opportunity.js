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
        type:String
    },
    end_date:{
        type:String
    },
    hrs:{
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