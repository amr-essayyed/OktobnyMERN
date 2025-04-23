import mongoose from 'mongoose';

export default async function connectToDB(){
    mongoose.connect("mongodb://127.0.0.1:27017/TeleTech")
    .then(() => 
        {
            console.log("Connected to MongoDB!");
            //todo: emit event 'DBConnected'
        })
    .catch(err => console.error("Error connecting to MongoDB: ",err));

}