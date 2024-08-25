const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://learning:GNO0z745ZWvgVARG@cluster0.stznz.mongodb.net/linkedin");


const userSchema = new mongoose.Schema({
    user_name:{
        type:String,
        required:true,
        lowercase:true
    },
    user_image:{
        // data:buffer,
        // contentType:String
        type:String
    },
    user_age:{
        type:Number
    },
    user_mobileNo:{
        type:String,
        required:true
    },
    user_email:{
        type:String,
        required:true,
        lowercase:true
    },
    user_password:{
        type:String,
        required:true
    },
    user_website:{
        type:String
    },
    user_bio:{
        type:String
    },
    name:{
        type:String
    }
},{timestamps:true})

const postSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    post_text:{
        type:String,
        required:true
    },
    post_url:{
        type:String,
        required:true
    },
    likes_count:{
        type:Number,
        default:0
    }
},{timestamps:true})

const Users = mongoose.model('Users',userSchema)
const Posts = mongoose.model('Posts',postSchema)

module.exports = {
    Users, 
    Posts
}