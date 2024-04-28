const express = require('express');
// const multer = require('multer');
const path = require('path');
const cycleRouter = express.Router();


const {protectRoute, isAuthorised} = require('../controllers/authController');
const {getParticularCycle,updateAvailability,getCycleByUser, getCyclesByLane, createCycle, uploadImage, updateCycle, deleteCycle, top12Cycles} = require('../controllers/cycleController');

//all plans leke aayega
cycleRouter.route('/getCyclesByLane')
.get(getCyclesByLane)

cycleRouter.route('/getCycleByUser').get(getCycleByUser)
cycleRouter.route('/updateAvailability/:id').put(updateAvailability);

//own plan -> logged in necessary
cycleRouter.use(protectRoute);

cycleRouter.route('/cycle/:id')
.get(getParticularCycle)


cycleRouter
.route('/crudCycle')
.post(createCycle);

cycleRouter
.route('/crudCycle/:id')
.patch(updateCycle)
.delete(deleteCycle)

cycleRouter
.route('/top12')
.get(top12Cycles)


module.exports = cycleRouter;