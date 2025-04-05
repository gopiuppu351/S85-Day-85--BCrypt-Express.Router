const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
let jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const  app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/profilePics', express.static('profilePics'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "profilePics");
    },
    filename: (req, file, cb) => {
      console.log(file);  
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${Date.now()}_${file.originalname}`)
    },
  });
  
  const upload = multer({ storage: storage })

let userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    age:Number,
    email:String,
    password:String,
    mobileNo:String,
    profilePic:String,
});

let User = new mongoose.model("users",userSchema,"users"); 


app.post("/login", upload.none(), async(req,res)=>{
    console.log(req.body);

    let userDetails = await User.find().and({email:req.body.email});
    if(userDetails.length > 0){
        let isPasswordCorrect = await bcrypt.compare(req.body.password,userDetails[0].password);
        if(isPasswordCorrect == true){

            let token = jwt.sign({email:req.body.email,password:req.body.password}, "brn"); 

            let userDetailsToSend = {
                firstName:userDetails[0].firstName,
                lastName:userDetails[0].lastName,
                age:userDetails[0].age,
                email:userDetails[0].email,
                mobileNo:userDetails[0].mobileNo,
                profilePic:userDetails[0].profilePic,
                token:token,
            }
            res.json({status:"success", msg:"All are correct",userData:userDetailsToSend});
        }else{
            res.json({status:"failure", msg:"Invalid Password"});
        }
    }else{
        res.json({status:"failure",msg:"User doesnot exist."})
    }
    console.log(userDetails);
    
});

app.post("/validateToken", upload.none(), async(req,res)=>{
    console.log(req.body);

    let decryptedCredentials = jwt.verify(req.body.token,"brn")
    console.log(decryptedCredentials);

    let userDetails = await User.find().and({email:decryptedCredentials.email});
    if(userDetails.length > 0){
        if(userDetails[0].password == decryptedCredentials.password){
            let userDetailsToSend = {
                firstName:userDetails[0].firstName,
                lastName:userDetails[0].lastName,
                age:userDetails[0].age,
                email:userDetails[0].email,
                mobileNo:userDetails[0].mobileNo,
                profilePic:userDetails[0].profilePic,
                token:token,
            }      
            res.json({status:"success", msg:"All are correct",userData:userDetailsToSend});
        }else{
            res.json({status:"failure", msg:"Invalid Password"});
        }
    }else{
        res.json({status:"failure",msg:"User doesnot exist."})
    }
    console.log(userDetails);
    
});

app.post("/signup", upload.single("profilePic"), async(req, res)=>{
    console.log("Inside signup");
    console.log(req.body);
    console.log(req.file);

    let hashedPassword = await bcrypt.hash(req.body.password, 10);

    try{
        let newSignup = new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            age:req.body.age,
            email:req.body.email,
            password:hashedPassword,
            mobileNo:req.body.mobileNo, 
            profilePic:req.file.path
        });
        await newSignup.save();
        console.log("New User created");
        res.json({status: "success" , msg:"User Created Successfully"})
    }catch(err){
        console.log("Unable to save user");
        res.json({status: "failure" , msg:"Unable to Create User"})
    }

   
    
});

app.patch("/updateProfile",upload.single("profilePic"),async(req,res)=>{
    try{
        console.log(req.body);
    if(req.body.firstName.trim().length>0){
        await User.updateMany({email:req.body.email},{firstName:req.body.firstName})
    }
    if(req.body.lastName.trim().length>0){
        await User.updateMany({email:req.body.email},{lastName:req.body.lastName})
    }
    if(req.body.age.trim().length>0){
        await User.updateMany({email:req.body.email},{age:req.body.age})
    }
    if(req.body.password.length>0){
        await User.updateMany({email:req.body.email},{password:req.body.password})
    }
    if(req.body.mobileNo.trim().length>0){
        await User.updateMany({email:req.body.email},{mobileNo:req.body.mobileNo})
    }
    if(req.file){
        await User.updateMany({email:req.body.email},{profilePic:req.file.path})
    }
    res.json({status:"Success" , msg:"User Updated Successfully"})
    }catch(err){
        res.json({status:"Failure" , msg:"Nothing is Updated"})
    }
    
});

app.delete("/deleteProfile",upload.none(),async(req,res)=>{
    try{
        console.log(req.body.email)
        let deleteObj = await User.deleteMany({email:req.body.email});
    if(deleteObj.deletedCount>0){
        res.json({status:"Success" , msg:"User Deleted Successfully"});
    }else{
        res.json({status:"Success" , msg:"Nothing is Deleted Successfully"});
    }

    }catch(err){
        res.json({status:"Failure" , msg:"Nothing is Deleted Successfully"});
    }
});



app.listen(4567, ()=>{
    console.log("Listening to port 4567")
});

let connectedToMDB = async()=>{
    try{
        await mongoose.connect("mongodb+srv://gopiuppu:Gopiu@batch2411cluster.xa8nb.mongodb.net/MERN2411?retryWrites=true&w=majority&appName=Batch2411Cluster")
        console.log("Connected to MDB")
    }catch(err){
        console.log("Unable to connect to MDB")
    }
    
}

connectedToMDB();