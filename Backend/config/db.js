const mongoose=require("mongoose")

async function connectDB(){
    const uri = process.env.MONGODB_URI || "";
    try {
        await mongoose.connect(uri);
        //console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
}

module.exports=connectDB;