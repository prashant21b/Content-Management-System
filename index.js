const express = require('express');
require("dotenv").config();
const db=require('./config/db');
const userRoutes=require('./routes/userRoutes');
//const cloudinary=require('cloudinary');
const multer=require('multer');

const app = express();

db();
app.use('/uploads',express.static('uploads'))
const PORT = process.env.PORT || 8000;
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

//   cloudinary.v2.config({
//         cloud_name: 'dzk5ctb2k', 
//         api_key: '618897193879375', 
//         api_secret: 'rliPmld8U4yQtv4ZFALlrCXXN7w' 
//   });


app.get('/', (req, res) => {
    res.send("hello");
});

app.use(express.json());
app.use('/api/v1',userRoutes);

app.listen(PORT, () => {
    console.log(`app is listening at port ${PORT}`);
});
