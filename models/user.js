const mongoose = require('mongoose');
const db = require('./db')


const User = mongoose.Schema({
    firstName:{type: 'string', min:3},
    lastName:{type: 'string', min:3},
    email:{type: 'string' , required: true},
    password:{type: 'string' , min:5 , required: true},
    userType:{type:Number , required: true},// user type will be  1 or 2  , 1 for admin and 2 for user
    imageUrl:{type: 'string'},
    status:{type:String, required: true},
    latitude:{type:Number, required: true},
    longitude:{type:Number, required: true}
})

const user = db.model('User',User)
module.exports = user