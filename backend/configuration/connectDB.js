const mongoose = require("mongoose")

async function DataBase() {
    try {
        await mongoose.connect("mongodb+srv://riyarrrajput053:<db_password>@cluster0.x9ecs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        .then((value) => {
            console.log("Database connected");
        })
    } 
    catch (error) {
        console.log("Database could not connect");
    }
}

module.exports = DataBase