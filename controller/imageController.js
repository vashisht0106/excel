const imageModel = require("../Model/imageSchema")




exports.saveImageControle=async(req,res)=>{


      
      const inputString=req.file.path;

      console.log('inputString',inputString)
      const urlc=inputString.replace(/\\/g,'/');
      const newImage = new imageModel({
        name: req.file.originalname,
        url: urlc,
        tags: req.body.tags || [],
      });
      await newImage.save();
      res.status(201).send("file uploaded success");
    
      console.log(req.file.path, req.file.originalname,urlc)


}



exports.original=async(req,res,next)=>{

try {
  const data=await imageModel.find()
  res.status(200).json(data)
  
} catch (error) {
 res.status(401).json("data not fetched") 
}
}