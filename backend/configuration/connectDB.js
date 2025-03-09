const mongoose = require("mongoose")

async function DataBase() {
    try {
        await mongoose.connect("mongodb+srv://riyarrrajput053:iVIR5oQeR8TcmaLD@cluster0.x9ecs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
            useNewUrlParser: true,
            useUnifiedTopology: true})
        .then((value) => {
            console.log("Database connected");
        })
    } 
    catch (error) {
        console.log("Database could not connect");
    }
}

module.exports = DataBase
