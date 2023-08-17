const express=require('express');

const app=express()
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const image=require('./Route/imageRoute');

app.use(express.json())
dotenv.config();
const mongo_url='mongodb+srv://modal:12301230@cluster0.hdgpi4p.mongodb.net/excel'
//const mongo_url='mongodb://localhost:27017/excel'
mongoose.connect(mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => { console.log("database connected successfully done") })

app.use('/uploads', express.static('uploads'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/api/v1',image);

app.listen(process.env.port||4000,()=>{
  
  console.log("server is listening on  port 4000")
  
})