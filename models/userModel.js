const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const db_link='mongodb+srv://b22cs010:8D1dOHqceYvHZgxN@cluster0.1genmqi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(db_link)
.then(function(db){
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
});

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password: {
        type:String,
        required:true
    },
    confirmPassword: {
        type:String,
        required:true,
        validate:function(){
            return this.confirmPassword == this.password;
        }
    },
    role:{
        type:String,
        enum: ['admin', 'user', 'cycleowner'],
        default: 'user'
    },
    resetToken:String
});

//remove - explore on own

userSchema.pre('save', function(){
    this.confirmPassword=undefined;
});

userSchema.methods.createResetToken = function(){
    //creating unique token using npm i crypto
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.resetToken = resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandler = function(password, confirmPassword){
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.resetToken = undefined;
}

//model
const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;