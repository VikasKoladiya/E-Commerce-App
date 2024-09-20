const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpController(req,res){
    try{
        const { name , email , password} = req.body;

        const user = await userModel.findOne({email})

        if(user){
            throw new Error("Already user exits.")
        }

        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password");
        }
        if(!name)
        {
            throw new Error("Please provide naame")
        }

        const salt = bcrypt.genSaltSync(10);
        const hasPassword = bcrypt.hashSync(password,salt);

        const playload = {
            ...req.body,
            role : "GENERAL",
            password: hasPassword
        }

        const userData = new userModel(playload);
        const saveData = await userData.save();

        res.json({  
            data: saveData,
            success: true,
            error: false,
            message:"User created successfully!"
        })

    }catch(err){
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = {
    userSignUpController
}