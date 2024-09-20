const jwt = require("jsonwebtoken")

async function authToken(req,res,next){
    try{
        const token = req.cookies?.token;

        if(!token){
            return res.json({
                message:"User not Login",
                error: true,
                success: false,
            })
        }

        const data = jwt.verify(token,process.env.TOKEN_SECRET_KEY);
        if(!data){
            return res.json({
                message:"Token is invalid",
                error:true,
                success:false,
            })
        }

        req.userId = data?._id; 
        next();
    }catch(err){
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true,
        })
    }
}

module.exports = {
    authToken
}
