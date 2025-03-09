const CardModel = require("../models/CardModel.js")
const patientModel = require("../models/patientModel.js")

const CreateImage = async(req,res) => {
    try {
         
       

         

          const loggedInPatient = await patientModel.findById(req.user._id)
          
          
        const{name,image} = req.body
        if(!name){
            return res.status(400).json({
                success : false,
                message : "please fill all the fields"
            })
        }

        const CardCreated = await CardModel.create({
            name : name,
            image : image,
            patientId : loggedInPatient._id
        })

        if(!CardCreated){
            return res.status(400).json({
                success : false,
                message : "Image could not be created"
            })
        }
      
        loggedInPatient.reports.push(CardCreated._id)

        await loggedInPatient.save()




        return res.status(200).json({
            success : true,
            message : "Card Created SuccessFully",
            CardCreated
        })
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
         
        })
        
    }
}


const getAllImage = async(req,res) => {

    try {
        const allCards = await CardModel.find()

        if(!allCards){
            return res.status(400).json({
                success : false,
                message : "Images could not get"
            })
        }

        return res.status(200).json({
            success :true,
            message : "All Images are here",
            allCards
        })
    } catch (error) {
        
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

const getAuthuserCard = async (req , res) =>{

    try {
        const loggedInPatient = await patientModel.findById(req.user._id).populate("reports")

        if (!loggedInPatient){
              return res.status(402).json({
                 success : false,
                 message : "Unauthorised access denied"
              })
        }
      
        console.log(loggedInPatient)
        return res.status(200).json({
             success : true ,
             message : "Auth User Reports" ,
             reports : loggedInPatient.reports
        })
    }
    catch (error){
        return res.status(500).json({
            success : false,
            message : error.message
        })
    } 
     
}


const DeleteImage = async(req,res) => {
    console.log(req.params.id)
    try {

        const {id} = req.params

        if(!id){
            return res.status(400).json({
                success : false,
            message : "Please provide the id"
            })
        }

        const DeleteCard = await CardModel.findByIdAndDelete(id, {new : true})
        if(!DeleteCard){
            return res.status(400).json({
                success : true,
                message : "Image could not be deleted"
            })
        }

        return res.status(200).json({
            success : true,
            message : "Image Deleted Successfully",
            DeleteCard
        })

    } catch (error) {
       res.status(500).json({
        success : false,
        message : error.message
       }) 
    }
}

module.exports = {CreateImage , getAllImage , DeleteImage , getAuthuserCard}