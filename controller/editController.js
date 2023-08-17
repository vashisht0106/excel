const express=require('express');
const app=express()
const xlsx = require('xlsx');
const imageSize = require('image-size');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const ExcelJS=require('exceljs');
const editModel = require('../Model/editModel');

const multer=require('multer')

exports.edit=async(req,res,next)=>{

  const jsonData = JSON.parse(req.headers['x-json-data']); // JSON data from headers
    const name = jsonData.name; // Name from JSON data
    const url = jsonData.url; // URL from JSON data

    try {
        //const workbook = new xl.Workbook();
        //const worksheet = workbook.addWorksheet('Training Attendance Sheet');
    
        const existingWorkbook = new ExcelJS.Workbook();

        //const url='uploads/1691926223788Employee Joining form (1).xlsx';
        console.log("url",url)

//console.log("namenmbv",name)

    await existingWorkbook.xlsx.readFile(url).then(()=>{
    
      console.log("Existing Excel file read successfully.");
    //res.status(200).json(existingWorbook)
    })
    const existingWorksheet = existingWorkbook.getWorksheet('Sheet1');
    
    if (!existingWorksheet) {
      console.log("Error: Existing worksheet not found.");
      res.status(500).send("Error editing Excel file1: Existing worksheet not found.");
      return;
    }
    
    //create a new workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        //workbook.xlsx.readFile('path/to/existing/file.xlsx')
    
        const worksheet = workbook.addWorksheet('Sheet1');
    
        // Set header name
        //const companyName=req.body.compname;
        worksheet.getCell('D1').value = name;
     
        // add logo to excel



    
      
        
        const sharp = require('sharp');

        const imagePath = req.file.path;
        // Convert image to PNG format
        try {
          const imageBuffer = fs.readFileSync(imagePath);
          console.log('imageBuffer',imageBuffer)
          // Convert image to PNG format
  const pngImageBuffer = await sharp(imageBuffer).toFormat('png').toBuffer();
  const imageId1 = workbook.addImage({
    buffer:pngImageBuffer,
    extension: 'png',
  });
  worksheet.addImage(imageId1, {
    tl: { col: 0, row: 0 }, // Top-left cell coordinates
    ext: { width: 100, height: 100 }, // Image width and height
  });

  // Rest of your code to add image to Excel
} catch (error) {
  console.error('Error adding image to Excel:', error);
  // Handle the error appropriately
}

          //const imageId1 = workbook.addImage({
          //  buffer:pngImageBuffer,
          //  extension: 'png',
          //});
          //worksheet.addImage(imageId1, {
          //  tl: { col: 0, row: 0 }, // Top-left cell coordinates
          //  ext: { width: 100, height: 100 }, // Image width and height
          //});
      
        //  res.status(200).send('Image added to Excel file successfully.');
        //} catch (error) {
        //  res.status(500).send('Error editing Excel file');
        //}
      











        //const imageId1 = workbook.addImage({
        //  buffer:imageBuffer,
        //  extension: 'png',
        //});
        








        
        //worksheet.addImage(imageId1, {
        //  tl: { col: 0, row: 0 }, // Top-left cell coordinates
        //  ext: { width: 100, height: 100 }, // Image width and height
        //});

        
        // Edit or add data to the worksheet based on user input
        //worksheet.cell(1, 1).string('hello i am come from server');
    
        //const filePath = '"C:/Users/vashisht yadav/Downloads/Training Records & Attandance Sheet 1.xls""';
        //workbook.write(filePath);
    
        let newRowNumber = 2; // Initialize the row number for the new worksheet
    
        existingWorksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
          if (rowNumber > 1) { // Skip the first row (header) in existing file
            // Increment the row number for the new worksheet
    
            const newRow = worksheet.getRow(newRowNumber); // Get the corresponding row in the new worksheet
    
            //const newRow = worksheet.addRow()
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
              //const newCell = worksheet.getCell(colNumber, newRowNumber);
              const newCell = newRow.getCell(colNumber); // Get the corresponding cell in the new row
              
              // Copy value
              newCell.value = cell.value;
              
              // Copy style from the source cell to the target cell
              const sourceCellStyle = existingWorksheet.getCell(colNumber, rowNumber).style;
              newCell.style = sourceCellStyle;
            });
            newRowNumber++;
          }
        });
          
      //customize font size and boldness of font
        worksheet.getCell('D1').font = {
          size: 16, // Customize the font size
          bold: true, // Make the text bold
        };
    
    // Customize cell padding
    worksheet.getCell('D1').alignment = {
      wrapText: true, // Wrap text within the cell
      vertical: 'middle', // Vertically center the text
      horizontal: 'center', // Horizontally center the text
    };
    
    worksheet.getRow(1).height = 100; // Customize row height
    worksheet.getColumn('D').width = 50; // Customize column width
    
    worksheet.getColumn('A').width=40;
    
    
    
    
    
    
    const backgroundColor = { argb: 'FFFFFF' };
    
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        // Apply border style to the first row
        row.eachCell(cell => {
          if (cell.value) {
            // Cell has content, apply border
            cell.border = {
              top: { style: 'thin'   ,color:backgroundColor },
              //bottom: { style: 'thin',color:backgroundColor },
              left: { style: 'thin'  ,color:backgroundColor },
              right: { style: 'thin' ,color:backgroundColor }
            };
          } else {
            // Empty cell, no border
            cell.border = {
              top: { style: 'thin',  color: backgroundColor },
              left: {style: 'thin',  color: backgroundColor},
              right:{style: 'thin', color: backgroundColor}
              //bottom:{ color: backgroundColor},
            };
          }
        });
      } else {
        // Other rows, no border style applied
      }
    });
    
    
    
    const timestamp = new Date().getTime();
    const filePath = path.join(__dirname,`output_${timestamp}.xlsx`);
//const newfilePath=
//'/root/excel/uploads/'+`output_${timestamp}.xlsx`
    //console.log(newfilePath)
        await workbook.xlsx.writeFile(filePath).then(() => {
          console.log('Excel file edited successfully');
          
          const newData = new editModel({
            name:name ,
            url: `uploads/output_${timestamp}.xlsx`,
            tags: 'copy',
          });
          newData.save();
          
          res.status(200).send(filePath);




        })
        .catch(error => {
          console.error('Error writing Excel file:', error);
          res.status(500).send('Error writing Excel file.');
        });
      } catch (error) {
        console.error('Error editing Excel file:', error);
        res.status(500).send('Error editing Excel file.');
      }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    




}





exports.geteditfile=async(req,res,next)=>{

try {
  const data=await editModel.find()
res.status(200).json(data)

} catch (error) {
  res.status(401).json('something wrong')
}


}