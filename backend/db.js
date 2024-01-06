const mongoose = require('mongoose');
require("dotenv").config();

const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
        console.log("Connected to MongoDB");

        //perform operations on the database
        const fetched_data = (await mongoose.connection.db.collection("food_items").find({}).toArray()).sort((a, b) => a.name.localeCompare(b.name));
        global.food_items = fetched_data;

        const foodCategory = (await mongoose.connection.db.collection("foodCategory").find({}).toArray())
        global.foodCategory = foodCategory;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = mongoDB;
