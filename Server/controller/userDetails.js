const userModel = require("../models/userModel");

async function userDetailsContoller(req,res){
    try{
        const user = await userModel.findById(req.userId);

        if(!user){
            throw new Error("User not exist");
        }

        res.json({
            message:"User details",
            data: user,
            success: true,
            error: false
        })
    }catch(err){
        res.json({
            message: err.message || err,
            success: false,
            error: true,
        })
    }
}

module.exports = {
    userDetailsContoller
}