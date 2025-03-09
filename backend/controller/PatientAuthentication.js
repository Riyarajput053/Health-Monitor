const jwt = require ("jsonwebtoken")
const patientModel = require ("../models/patientModel.js")


const patientAuthentication = async (req , res , next) =>{
    
      try {
         
          const {patientAuth} = req.cookies
           
          if (!patientAuth){
             return res.status (402).json ({
                success : false,
                message : "UnAuthorised Access denied"
            })

          }

          console.log("PatientAuth  " , patientAuth)

          const decoded = jwt.verify(patientAuth , process.env.JWT_SECRET)

          console.log(decoded)

          req.user = await patientModel.findById(decoded.patientId)

          console.log("the loggediN Patient is " , req.user)

          next()


      }
      catch (error) {
         return res.status (500).json ({
             success : false,
             message : error.message
         })
      }

}

module.exports = patientAuthentication