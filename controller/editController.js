const express=require('express');
const app=express()
const XLSX = require('xlsx');
const imageSize = require('image-size');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const ExcelJS=require('exceljs');
const editModel = require('../Model/editModel');



exports.edit=async(req,res,next)=>{



    try {
        //const workbook = new xl.Workbook();
        //const worksheet = workbook.addWorksheet('Training Attendance Sheet');
    
        const existingWorkbook = new ExcelJS.Workbook();

        const url=req.body.url;
        console.log("url",url)
    await existingWorkbook.xlsx.readFile(url).then(()=>{
    
      console.log("Existing Excel file read successfully.");
    //res.status(200).json(existingWorbook)
    })
    const existingWorksheet = existingWorkbook.getWorksheet('Sheet1');
    
    if (!existingWorksheet) {
      console.log("Error: Existing worksheet not found.");
      res.status(500).send("Error editing Excel file: Existing worksheet not found.");
      return;
    }
    
    //create a new workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        //workbook.xlsx.readFile('path/to/existing/file.xlsx')
    
        const worksheet = workbook.addWorksheet('Sheet1');
    
        // Set header name
        const headerName='backend developer'
        worksheet.getCell('I1').value = headerName;
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
        worksheet.getCell('H1').font = {
          size: 50, // Customize the font size
          bold: true, // Make the text bold
        };
    
    
    // Customize cell padding
    worksheet.getCell('H1').alignment = {
      wrapText: true, // Wrap text within the cell
      vertical: 'middle', // Vertically center the text
      horizontal: 'center', // Horizontally center the text
    };
    
    worksheet.getRow(1).height = 100; // Customize row height
    worksheet.getColumn('I').width = 50; // Customize column width
    
    
    
    
    
    
    
    //method 3
    
    
    // Remove all borders from row 1
    //worksheet.getRow(1).eachCell(cell => {
    //  cell.alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
    //  cell.value = cell.value; // Reset cell value to apply formatting
    //});
    
    //worksheet.getRow(1).removeAllBorders();
    
    
    
    //method 4
    
    // Remove all borders from row 1
    //worksheet.getRow(1).eachCell(cell => {
    //  cell.border = {
    //    top: null,
    //    bottom: null,
    //    left: null,
    //    right: null
    //  };
    //});
    
    
    
    //method 5
    
    // Clear styles and borders from row 1
    //const row1 = worksheet.getRow(1);
    //row1.eachCell(cell => {
    //  cell.value = cell.value; // Reset cell value to clear formatting
    //  cell.alignment = {}; // Clear alignment
    //});
    
    // Clear borders individually
    // Get a specific range of cells (for example, row 1)
    //const row1 = worksheet.getRow(1);
    
    //// Remove borders using the approach you've mentioned
    //row1.eachCell(cell => {
    //  cell.format.border.getItem('InsideHorizontal').style = 'None';
    //  cell.format.border.getItem('InsideVertical').style = 'None';
    //  cell.format.border.getItem('EdgeBottom').style = 'None';
    //  cell.format.border.getItem('EdgeLeft').style = 'None';
    //  cell.format.border.getItem('EdgeRight').style = 'None';
    //  cell.format.border.getItem('EdgeTop').style = 'None';
    //});
    
    
    
    
    //const row1 = worksheet.getRow(1);
    
    //worksheet.getCell('B1').border = {
    //  top: {style:'none', color: {argb:'FF00FF00'}},
    //  left: {style:'none', color: {argb:'FF00FF00'}},
    //  bottom: {style:'none', color: {argb:'FF00FF00'}},
    //  right: {style:'none', color: {argb:'FF00FF00'}}
    //};
    
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
const newfilePath=
'C:/Users/vashisht yadav/Desktop/excel/uploads/'+`output_${timestamp}.xlsx`
    console.log(newfilePath)
        await workbook.xlsx.writeFile(newfilePath).then(() => {
          console.log('Excel file edited successfully');
          
          const newData = new editModel({
            name:req.body.name ,
            url: `uploads/output_${timestamp}.xlsx`,
            tags: 'copy',
          });
          newData.save();
          
          res.status(200).send(newfilePath);




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