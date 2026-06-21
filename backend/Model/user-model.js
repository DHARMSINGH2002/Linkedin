import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstName :{
        type : String,
        required :true,
    },
    lastName :{
        type : String,
        required :true,
    },
    username :{
        type :String,
        required:true,
        unique :true,
    },
    email :{
        type: String,
        required:true,
        unique:true,
    },
    password :{
        type : String,
        required:true,
    },
    profileImage : {
        type : String,
        default : "",
    },
    coverImage : {
    type : String,
    default : "",
    },
    headLine:{
        type : String,
        default : "",
    },
    skills:[{type:String}],
    education:[{
        college : {type:String},
        degree : {type:String},
        field : {type:String},


    }],
    location : {
        type : String, 
        default : "INDIA"
    },
    gender : {
       type: String,
        enum:["Male","Female","Other"],
    } ,
    experience : [
        {
            title : {type:String},
            company : {type:String},
            description : {type:String},

        }],
    connections : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",

    }]

},{timestamps:true});

const User = mongoose.model("User", userSchema);
export default User;