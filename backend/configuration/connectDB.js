const mongoose = require("mongoose")

async function DataBase() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/reportManager")
        .then((value) => {
            console.log("Database connected");
        })
    } 
    catch (error) {
        console.log("Database could not connect");
    }
}

module.exports = DataBase