const express=require('express');

const app=express()
const dotenv=require('dotenv')
const cors=require('cors')
const mongoose=require('mongoose')
const image=require('./Route/imageRoute');
app.use(express.json())
dotenv.config();
//const mongo_url='mongodb+srv://modal:12301230@cluster0.hdgpi4p.mongodb.net/excel'
//const mongo_url='mongodb://localhost:27017/excel'
mongoose.connect(process.env.MONGO_URL, {
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
// Error handling middleware
app.use(cors())
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});


const corsOptions = {
  origin: 'https://example.com', // Replace with your allowed origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));




app.listen(process.env.PORT||8000,()=>{
  
  console.log("SERVER IS RUNNING ON PORT NUMBER  +"+`${process.env.PORT}`)
  
})