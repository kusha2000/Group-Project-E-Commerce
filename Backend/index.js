const PORT = process.env.PORT ;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const connectDB = require("./db");
require("dotenv").config();

app.use(express.json());
app.use(cors());

connectDB();

// const uri = process.env.MONGODB_URI || "";
// try {
//   mongoose.connect(uri);
//   // console.log("Connected to DB");
// } catch (error) {
//   console.log(error);
// }

app.get("/", (req, res) => {
  res.send("Express App is Running");
});

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload=multer({storage:storage})

app.use('/images',express.static('upload/images'))

app.post("/upload", upload.single("product"), (req, res) => {
  console.log(req.file); // Log the file to see if it's being processed
  if (!req.file) {
    return res.status(400).json({ success: false, errors: "No file uploaded." });
  }
  res.json({
    success: 1,
    image_url: `http://localhost:${PORT}/images/${req.file.filename}`
  });
});


//Product Schema
const Product =mongoose.model("Product",{
  id:{
    type:Number,
    required:true,
  },
  name:{
    type:String,
    required:true,
  },
  image:{
    type:String,
    required:true,
  },
  category:{
    type:String,
    required:true,
  },
  new_price:{
    type:Number,
    required:true,
  },
  old_price:{
    type:Number,
    required:true,
  },
  date:{
    type:Date,
    default:Date.now,
  },
  available:{
    type:Boolean,
    default:true,
  },
})

//Add Products
app.post('/addproduct',async (req,res)=>{
  let products=await Product.find({});
  let id;
  if(products.length >0){
    let last_product_array=products.slice(-1);
    let last_product=last_product_array[0];
    id=last_product.id+1;
  }else{
    id=1;
  }
  const product=new Product({
    id:id,
    name:req.body.name,
    image:req.body.image,
    category:req.body.category,
    new_price:req.body.new_price,
    old_price:req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("New Product Added");
  res.json({
    success:true,
    name:req.body.name,
  })
})

// Delete Products
app.post('/removeproduct',async (req,res)=>{
  await Product.findOneAndDelete({
    id:req.body.id
  })
  console.log("Deleted the product");
  res.json({
    success:true,
    name:req.body.name
  })
})

//Getting All Products
app.get('/allproducts',async (req,res)=>{
  let product=await Product.find({});
  console.log("All Products Fetched");

  res.send(product)
})


//User Schema
const Users=mongoose.model('Users',{
  name:{
    type:String
  },
  email:{
    type:String,
    unique:true,
  },
  password:{
    type:String,
  },
  cartData:{
    type:Object,
  },
  date:{
    type:Date,
    default:Date.now(),
  }
})

//Register User
app.post('/signup',async (req,res)=>{
  let check=await Users.findOne({email:req.body.email});

  if(check){
    return res.status(400).json({success:false,errors:"existing user found with same email"})
  }
  let cart={}
  for (let i = 0; i < 300; i++) {
    cart[i]=0; 
  }
  const user =new Users({
    name:req.body.username,
    email:req.body.email,
    password:req.body.password,
    cartData:cart,
  })

  await user.save();
  const data={
    user:{
      id:user.id
    }
  }

  const token=jwt.sign(data,'secret_ecom');
  res.json({success:true,token})
  console.log("New User Created Successfully");

})

//user login
app.post('/login',async (req,res)=>{
  let user=await Users.findOne({email:req.body.email});
  if(user){
    const passCompare=req.body.password === user.password;
    if(passCompare){
      const data={
        user:{
          id:user.id
        }
      }
      const token = jwt.sign(data,'secret_ecom');
      res.json({success:true,token});
      console.log("Login Successfully");

    }else{
      res.json({success:false,errors:"Wrong Password"});
    }
  }else{
    res.json({success:false,errors:"Wrong Email ID"})
  }
})

//newCollection Data
app.get('/newcollection',async (req,res)=>{
  let products=await Product.find({});
  let newCollection=products.slice(1).slice(-8);
  console.log("NewCollection Fetched");
  res.send(newCollection);
})

//newCollection Data
app.get('/popularinwomen',async (req,res)=>{
  let products=await Product.find({category:"women"});
  let popular_in_women=products.slice(0,4);
  console.log("Popular in women fetched");
  res.send(popular_in_women);
})

//create a middleware to fetch user
const fetchUser=async(req,res,next)=>{
  const token =req.header('auth-token');
  if(!token){
    res.status(401).send({error:"No token Given"})
  }else{
    try {
      const data=jwt.verify(token,'secret_ecom');
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({errors:"Please authenticate using valid token"})
    }
  }
}

//add the product to the cart
app.post('/addtocart',fetchUser,async(req,res)=>{
  let userData=await Users.findOne({_id:req.user.id});
  if (!userData || !userData.cartData) {
    return res.status(404).send("User or cart data not found");
  }
  userData.cartData[req.body.itemId] +=1;
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
  res.send("Added the product to the cart");

})

//remove the product from the cart
app.post('/removefromcart',fetchUser,async(req,res)=>{
  console.log("removed",req.body.itemId);
  let userData=await Users.findOne({_id:req.user.id});
  if (!userData || !userData.cartData) {
    return res.status(404).send("User or cart data not found");
  }
  if(userData.cartData[req.body.itemId]>0){
    userData.cartData[req.body.itemId] -=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Removed the product from the cart");
  }
})

//get Cart Data
app.post('/getcart',fetchUser,async (req,res)=>{
  console.log("GetCart");
  let userData=await Users.findOne({_id:req.user.id});
  res.json(userData.cartData);
})


app.listen(PORT, (error) => {
  if (!error) {
    console.log("Server is running on Port" + PORT);
    console.log("Connect to DB");
  } else {
    console.log("Error:" + error);
  }
});

module.exports = app;