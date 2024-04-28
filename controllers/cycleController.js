const { response } = require('express');
const cycleModel = require('../models/cycleModel');
const userModel = require('../models/userModel');
const { ok } = require('assert');


module.exports.getCyclesByLane = async function getCyclesByLane(req, res) {
    try {
        const { lane } = req.query;
        console.log(lane)
        const cycles = await cycleModel.find({ hostelLane: lane });
        res.json({ success: true, cycles });
    } catch (error) {
        console.error('Error fetching cycles:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch cycles' });
    }
};

module.exports.updateAvailability = async function updateAvailability(req, res) {
    try {
        const cycleId = req.params.id;
        const { availability } = req.body;

        // Update the availability of the cycle in the database
        const updatedCycle = await cycleModel.findOneAndUpdate(
            { userId: cycleId }, // Query condition
            { availability: availability }, // Update data
            { new: true } // Options: Return the modified document
        );

        console.log(updatedCycle)
        // Send a success response
        res.status(200).json({ message: "Cycle availability updated successfully" });
    } catch (error) {
        // If an error occurs, send an error response
        console.error("Error:", error);
        res.status(500).json({ message: "An error occurred while updating cycle availability" });
    }
};

module.exports.getCycleByUser = async function getCycleByUser (req, res) {
    try {
        const { userId } = req.query;
        
        // Fetch the cycle from the database based on the userId
        const cycle = await cycleModel.findOne({ userId: userId });

        if (!cycle) {
            return res.status(404).json({ message: 'Cycle not found for this user.' });
        }
        res.status(200).json({ cycle });
    } catch (error) {
        console.error('Error fetching cycle by user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports.getParticularCycle = async function getParticularCycle(req, res){
    try{
        let id = req.params.id;
        let plan = await cycleModel.findById(id);
        if(plan){
            return res.json({
                message: 'plan retreived',
                data: plan
            });
        }
        else{
            return res.json({
                message: 'plan not found'
            });
        }
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}


module.exports.createCycle = async function createCycle(req, res) {
    try {
        let cycleData = req.body;
        console.log(cycleData);

        let createdCycle = await cycleModel.create(cycleData);
        console.log("2");

        return res.json({
            details: createdCycle,
            message: 'Cycle created successfully',
            data: createdCycle,
            success: true
        });
    } catch (err) {
        console.error('Error creating cycle:', err);
        res.status(500).json({
            message: err.message,
            success: false
        });
    }
};


module.exports.updateCycleImage = function updateCycleImage(req, res){
    res.json({
        message: 'file uploaded succesfully'
    });
}

module.exports.deleteCycle = async function deleteCycle(req, res){
    try{
        let id = req.params.id;
        let deletePlan = await cycleModel.findByIdAndDelete(id);
        return res.json({
            message: 'plan deleted succesfully',
            data: deletePlan
        });
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports.updateCycle = async function updateCycle(req, res){
    try{
        let id = req.params.id;
        let dataToBeUpdated = req.body;
        let keys = [];
        for(let key in dataToBeUpdated){
            keys.push(key);
        }
        let plan = await cycleModel.findById(id);
        for(let i=0; i<keys.length; i++){
            plan[keys[i]] = dataToBeUpdated
            [keys[i]];
        }
        //doc
        await plan.save();
        return res.json({
             message: 'plan updated succesfully',
             data: plan
        });
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}

//get top 3 plans
module.exports.top12Cycles = async function top12Cycles(req, res){
    try{
        const plans = await cycleModel.find().sort({
            ratingsAverage: -1
        }).limit(12);
        return res.json({
            message: 'top12 plans',
            data: plans
        })
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}