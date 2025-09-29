const mongoose = require("mongoose")

const connectdb = () => {
    try {
        mongoose.connect("mongodb+srv://nikhilthegreat42_db_user:o8LRXe6hm8gC7S0F@cluster0.alkep34.mongodb.net/vertoTask?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Database connected successfully!")
    } catch (error) {
        console.log("Database not connected!")
    }
}
 
module.exports = connectdb