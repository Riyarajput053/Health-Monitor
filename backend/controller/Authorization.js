const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")

const Authorizaton = async(req,res,next) =>{
    try {
        
        const {authToken} = req.cookies
        if(!authToken){
            return res.status(401).json({
                success : false,
                message : "Unauthorised Access"
            })
        }

        const decoded = jwt.verify(authToken, process.env.JWT_SECRET)
        console.log(decoded)

        const LoggedInUser = await userModel.findById(decoded.userId)
         console.log(LoggedInUser)
         req.user = LoggedInUser
         next()

    } catch (error) {

        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

module.exports = Authorizaton