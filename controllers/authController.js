const express = require('express');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_KEY = 'HGTTnjs36y72njnj2R';
const {sendMail} = require('../utility/nodemailer');

//sign up user
module.exports.signup = async function signup(req, res){
    try{
        let dataObj = req.body;
        console.log(dataObj);
        let user = await userModel.create(dataObj);
        sendMail('signup', user);
        if(user){
            res.json({
                message: "user signed up",
                // data:user
                data: {
                    ...user._doc,
                    role: user.role
                }
            });
            // res.send({
            //     data:user.role
            // });
        }
        else{
            res.json({
                message: "error while signin"
            });
        }
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}

//login user
module.exports.login = async function loginUser(req, res) {
    try {
        let data = req.body;
        if (data.email && data.password) { // Check if email and password are provided
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                if (user.password === data.password) { // Check if passwords match
                    let uid = user._id; // Extract user ID
                    let token = jwt.sign({ payload: uid }, JWT_KEY);
                    res.cookie('login', token, { httpOnly: true });
                    return res.json({
                        success: true,
                        message: "user is logged in",
                        userDetails: data,
                        id:uid
                    });
                } else {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid credentials"
                    });
                }
            } else {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

//to check the users role
module.exports.isAuthorised = function isAuthorised(roles){
    return function(req, res, next){
        if(roles.includes(req.role)==true){
            next();
        }
        else{
            res.status(401).json({
                message: "operation not allowed"
            });
        }
    }
};

//protect route
module.exports.protectRoute = async function protectRoute(req, res,  next){
    try{
        let token;
        if(req.cookies.login){
            // console.log(req.cookies);
            token = req.cookies.login;
            //let isVerified = jwt.verify(req.cookies.login, JWT_KEY);
            let payload = jwt.verify(token, JWT_KEY);
            if(payload){
                // console.log('payload token',payload);
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;
                // console.log(req.role, req.id);
                next();
            }
            else{
                //browser
                const client = req.get('User-Agent');
                if(client.includes("Mozilla")==true){
                    return res.redirect('/login');
                }

                //postman
                return res.json({
                    message: "please login again"
                });
            }
        }
        else{
            res.json({
                meassage: "please login"
            });
        }
    }
    catch(err){
        return res.json({
            message: err.meassage
        });
    }
};

//forgetPassword
module.exports.forgetpassword = async function forgetpassword(req, res){
    let{email} = req.body;
    try{
        const user = await userModel.findOne({email:email});
        if(user){
            //createResetToken is used to create new token
            const resetToken = user.createResetToken();
            /*http://abc.com/resetpassword/resetToken*/
            let resetPasswordLink = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
            //send email to the user
            //nodemailer
            let obj = {
                resetPasswordLink: resetPasswordLink,
                email: email
            }
            sendMail("resetpassword", obj);
            return res.json({
                message: "forget password link has been sent to your email"
            });
        }
        else{
            return res.json({
                message: "please signup"
            });
        }
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}

//resetPassword
module.exports.resetpassword = async function resetpassword(req, res){
    try{    
        const token = req.params.token;
        let {password, confirmPassword} = req.body;
        const user = await userModel.findOne({resetToken:token});
        
        if(user){
            //resetPasswordHandler will update user new passwor in db
            user.resetPasswordHandler(password, confirmPassword);
            await user.save();
            res.json({
                message: "password changed successfully, login again"
            });
        }
        else{
            res.json({
                message: "user not found"
            });
        }
    }
    catch(err){
        res.json({
            message: err.message
        });
    }
}

module.exports.logout = function logout(req, res){
    res.cookie('login', ' ', {maxAge:1});
    req.json({
        message: "user logged out succesfully"
    });
}