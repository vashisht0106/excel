const imageModel = require("../Model/imageSchema")




exports.saveImageControle=async(req,res)=>{






  try {
    const uploadedFiles = req.files; // Array of uploaded files

    if (!uploadedFiles || uploadedFiles.length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

  //  const images = [];

    for (const file of uploadedFiles) {
      const inputString = file.path;
      console.log('file',req.files)
      const urlc = inputString.replace(/\\/g, '/');
      
      const newImage = new imageModel({
        name: file.originalname,
        url: urlc,
        tag: req.body.folderName,
      });

      await newImage.save();
      //images.push(newImage);
    }

    res.status(201).json({ message: "Files uploaded successfully", uploadedFiles });
  //} catch (error) {
  //  res.status(500).send(error);
  //}






















  //try {
        
  //  const inputString=req.file.path;

  //  console.log('inputString',inputString)
  //  const urlc=inputString.replace(/\\/g,'/');
  //  const newImage = new imageModel({
  //    name: req.file.originalname,
  //    url: urlc,
  //    tags: req.body.tags || [],
  //  });
  //  await newImage.save();
  //  res.status(201).send("file uploaded success");
  
    //console.log(req.files)

//res.status(200).json(req.files)

  } catch (error){
    
console.log(error)
res.status(500).send(error)

  }


}



exports.original=async(req,res,next)=>{

try {
  const data=await imageModel.find()
  res.status(200).json(data)
  
} catch (error) {
 res.status(401).json("data not fetched") 
}
}




exports.imagefilter=async(req,res)=>{


try {
  const rootfolder=req.query.rootfolder;
const childfolder=req.query.childfolder
  console.log('rootfolder',rootfolder)


  let query = {
    "url": { $regex: `uploads/${rootfolder}` }
  };




  if (childfolder) {
    query = {
      $and: [
        { "url": { $regex: `uploads/${rootfolder}/${childfolder}` } },
        //{ "url": { $regex: `uploads/${rootfolder}/.*` } } // Add any additional conditions for childfolder filtering
      ]
    };
  }






  const file=await  imageModel.find(query)
  res.status(200).json(file);



} catch (error) {
  res.status(500).json('something went wrong!')
}



}