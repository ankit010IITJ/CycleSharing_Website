const express = require('express');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const userRouter = require('../routers/userRouter');
const JWT_KEY = 'HGTTnjs36y72njnj2R';


module.exports.getUser = async function getUser(req, res){
    let id = req.id;
    console.log(id);
    console.log(req.id);
    let user = await userModel.findById(id);
    if (user) {
        return res.json(user);
      } else {
        return res.json({
          message: "user not found",
        });
      }
};


module.exports.updateUser = async function updateUser(req, res){
    try{
        let id = req.params.id;
        let user = await userModel.findById(id);
        console.log(user)
        console.log("1")
        console.log(id)
        let dataToBeUpdated = req.body;
        if(user){
            const keys = [];
            for(let key in dataToBeUpdated){
                keys.push(key);
                console.log(key)
            }
            
            for(let i=0; i<keys.length; i++){
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }

            const updatedData = await user.save();
            res.json({
                message: "data updated successfully"
            });
        }
        else{
            res.json({
                message: "users not found"
            });
        }
    }
    catch(err){
        res.json({
            message: err.message
        });
    }
};

module.exports.deleteUser = async function deleteUser(req, res){
    try{ 
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if(!user){
            res.json({
              message: "user not found"
            });
        }
        res.json({
            message: "data has been deleted",
            data: user
        });
    }
    catch(err){
        res.json({
            message: err.message
        });
    }
};

module.exports.getAllUser = async function getAllUser(req, res){
    let users = await userModel.find();
    if(users){
        res.json({
            message: "users retrieved",
            data: users
        });
    }
    res.send("user id recieved");
};

module.exports.updateProfileImage = function updateProfileImage(req, res){
    res.json({
        message: 'file uploaded succesfully'
    });
}