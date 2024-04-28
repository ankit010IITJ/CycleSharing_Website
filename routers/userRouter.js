const express = require('express');
const multer = require('multer');
const path = require('path');


const {getUser, getAllUser, updateUser, deleteUser} = require('../controllers/userController');
const {signup, login, isAuthorised,protectRoute, forgetpassword, resetpassword, logout} = require('../controllers/authController');
//const { filter } = require('lodash');

const userRouter = express.Router();

//app.use('/user', userRouter);

//user ke options
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/signup')
.post(signup)

userRouter
.route('/login')
.post(login)

userRouter
.route('/forgetpassword')
.post(forgetpassword)

userRouter
.route('/resetpassword/:token')
.post(resetpassword)

userRouter
.route('/logout')
.get(logout)

//multer for fileupload

//upload -> storage, filter
const multerStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images')
    },
    filename: function(req, file, cb){
        cb(null, `user-${Date.now()}.jpeg`)
    }
});

// const filter = function(req, file, cb){
//     if(file.mimetype.startsWith("image")){
//         cb(null, true)
//     }
//     else{
//         cb(new Error("Not an Image! Please upload an image"), false)
//     }
// }

// const upload = multer({
//     storage: multerStorage,
//     fileFilter: filter
// });

// userRouter.post("/ProfileImage", upload.single("photo"), updateProfileImage);
// //get request
// userRouter.get('/ProfileImage', (req, res)=>{
//     const filePath = path.join(__dirname, '..', 'multer.html');
//     res.sendFile(filePath);
// });

//profile page
userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser)

//admin specific func
userRouter.use(isAuthorised(['admin']));
userRouter
.route('')
.get(getAllUser)

module.exports = userRouter;