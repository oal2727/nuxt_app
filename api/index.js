const express = require('express')
const app = express()
require("dotenv").config()
const morgan = require("morgan")
const mongoose = require("mongoose")


const options = {useNewUrlParser:true,useUnifiedTopology:true}
mongoose.connect(process.env.MONGOURI,options).then(()=>{
     console.log("connected db")
}).catch(er => console.log("err conected",er))
app.use(morgan("dev"))

app.use(require("./routers/route"))



  
module.exports = {
    path:"/api/",
    handler:app
};




//uso de express

