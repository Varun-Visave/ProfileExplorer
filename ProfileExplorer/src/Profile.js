import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    id:{
        type:Number,
    },
    name:{
        type:String,
    },
    photo:{
        type:String
    },
    description:{
        type:String
    },
    address:{
        type:String
    }
}, {timestamps:true})

module.exports = mongoose.model('Profile', ProfileSchema)
