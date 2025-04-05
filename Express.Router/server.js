const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const loginRouter = require("./routes/login");

const app = express();
app.use(cors());
app.use("/", loginRouter);

app.listen(4567,()=>{
    console.log("Server is running on port 4567")
});