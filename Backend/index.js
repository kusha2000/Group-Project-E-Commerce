const express=require('express')
require('dotenv').config()
const connectDB=require('./config/db')

const app = express();
const PORT =3000 || process.env.PORT


app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Connect to DB");
        console.log("Server is running");
    })
})
