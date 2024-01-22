const express=require('express');

const app=express()
const dotenv=require('dotenv')
const mongoose=require('mongoose')
//const image=require('./Route/imageRoute');
const folder=require('./Route/folderRoute')
const cors = require('cors');
app.use(express.json())
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => { console.log("database connected successfully done") })
//app.use('/uploads', express.static('uploads'));
app.use(cors())
//app.use('/api/v1',image);
app.use('/api/v1',folder);





app.listen(process.env.PORT||8000,()=>{
  
  console.log("SERVER IS RUNNING ON PORT NUMBER  +"+`${process.env.PORT}`)
  
})