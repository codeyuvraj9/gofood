const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://knb10kagami:hOIgGXAkQMOsfjcX@cluster0.v9fszi5.mongodb.net/gofoomern?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
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
