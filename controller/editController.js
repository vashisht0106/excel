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
  let worksheetNames = [];
  const jsonData = JSON.parse(req.headers['x-json-data']); // JSON data from headers
    const name = jsonData.name; // Name from JSON data
const compname=jsonData.compname;
    console.log('name',name)
    const url = jsonData.url; // URL from JSON data

    try {
      
    
        const existingWorkbook = new ExcelJS.Workbook();

      



   
  

var wb=xlsx.readFile(url)
var wbNames=wb.SheetNames[0]
worksheetNames.push(wbNames);
var wbName=worksheetNames[0]
console.log('worksheetname:',wbName)




console.log('oldurl',url)
const ext=path.extname(url)

console.log('extname',ext)
if (ext=== '.xls'){
  try {
  var newurl = url.replace('.xls', '.xlsx');
  xlsx.writeFile(wb,newurl, { bookType: 'xlsx' })
  console.log('new url saved',newurl)
} catch (error) {
//console.log('newUrl',newurl) 
  console.log(error)
}

}
else if (ext==='.xlsx'){

newurl=url;

}




await existingWorkbook.xlsx.readFile(newurl).then(()=>{

console.log('Existing Excel file read sucessfuly')

})

let existingWorksheet = existingWorkbook.getWorksheet(wbName);

    if (!existingWorksheet) {
      console.log("Error: Existing worksheet not found.");
      res.status(500).send("Error editing Excel file1: Existing worksheet not found.");
      return;
    }
    








    //create a new workbook and worksheet
        //const workbook = new ExcelJS.Workbook();
        //workbook.xlsx.readFile('path/to/existing/file.xlsx')
    
        //const worksheet = workbook.addWorksheet(wbName);
    
        // Set header name
        //const companyName=req.body.compname;

        const cellToUpdate1 = existingWorksheet.getCell('B1');    
        const cellToUpdate3 = existingWorksheet.getCell('C1');    
        const cellToUpdate2 = existingWorksheet.getCell('B3');      
        const cellToUpdate4 = existingWorksheet.getCell('C3');      
        cellToUpdate1?cellToUpdate1.value = compname : cellToUpdate3.value=compname;
        cellToUpdate2?cellToUpdate2.value=name:cellToUpdate4.value=name
        //worksheet.getCell('B1').value = compname;
        //worksheet.getCell('B2').value = name;
     
        // add logo to excel

  const imageId1 = existingWorkbook.addImage({
        filename: 'R.jpeg',
        extension: 'jpeg',
      });

existingWorksheet.addImage(imageId1,'A1:A4')

    
      
        
        const sharp = require('sharp');

        const imagePath = req.file.path;
        // Convert image to PNG format
        try {
          const imageBuffer = fs.readFileSync(imagePath);
          console.log('imageBuffer',imageBuffer)
          // Convert image to PNG format
  const pngImageBuffer = await sharp(imageBuffer).toFormat('png').toBuffer();
  const imageId1 = existingWorkbook.addImage({
    buffer:pngImageBuffer,
    extension: 'png',        
  });
  existingWorksheet.addImage(imageId1,"A1:A4");


  const cellA1=existingWorksheet.getCell('A1')
  cellA1.alignment={horizontal:'center'}

  // Rest of your code to add image to Excel
} catch (error) {
  console.error('Error adding image to Excel:',error);
  // Handle the error appropriately
}

       



//let newRowNumber = 0; // Initialize the row number for the new worksheet
    
//worksheet.mergeCells('B1:J1');
//worksheet.mergeCells('B2:J2');
//worksheet.mergeCells('A1:A2');
//existingWorksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {

  
  
//  if (rowNumber > 1) { // Skip the first row (header) in existing file
//    // Increment the row number for the new worksheet
    
//    const newRow = worksheet.getRow(newRowNumber); // Get the corresponding row in the new worksheet

//    //const newRow = worksheet.addRow()
//    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
//      //const newCell = worksheet.getCell(colNumber, newRowNumber);
//      const newCell = newRow.getCell(colNumber); // Get the corresponding cell in the new row
      
//      // Copy value
//      if(rowNumber>4){

//        newCell.value = cell.value;
//      }
//      newCell.style=cell.style;

////console.log('cell,colNumber',cell,colNumber)

//newCell.alignment=cell.alignment;
//newCell.fill=cell.fill;
//newCell.font={size:10};
     

 
//if (cell.isMerged) {
////console.log(`Cell at row ${rowNumber}, column ${colNumber} is part of a merged cell`);
//const mergeCount = cell.master._mergeCount;
////const mergeRange = existingWorksheet.getMerge(cell);
//const add =cell.master.address
//// console.log('mergeRangeStart=' ,mergeRange)


//if(mergeCount>1) {
//// Calculate the end cell address based on mergeCount
//const endCell = existingWorksheet.getCell(cell.master._address);

////console.log('endcell',endCell.master.address)

//const endColumnIndex = cell.master._column.number + mergeCount - 1;
//const endRowNumber = rowNumber + mergeCount - 1;
//const endCellAddress = existingWorksheet.getCell(endRowNumber, endColumnIndex)._address;




//console.log(`Merged Range in Row ${rowNumber}: ${cell._address}:${endCellAddress}`);

//}



//} else {
//console.log(`Cell at row ${rowNumber}, column ${colNumber} is not merged`);




//}


      //newCell.height = existingWorksheet.getRow(rowNumber).height;
      //console.log('newcell Width',newCell.height)
      // Copy style from the source cell to the target cell
      //const sourceCellStyle = existingWorksheet.getCell(colNumber, rowNumber).style;
      //newCell.style = sourceCellStyle;
//    });
//    newRowNumber++;
//  }
//});
  






//// Set column widths based on the existing worksheet (optional)
//existingWorksheet.columns.forEach((column, index) => {
//  worksheet.getColumn(index+1).width = column.width;

////console.log('column',column.width)

//});












     








        
        
    
    //    let newRowNumber = 0; // Initialize the row number for the new worksheet
    
    //    existingWorksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    //      if (rowNumber > 2) { // Skip the first row (header) in existing file
    //        // Increment the row number for the new worksheet
    
    //        const newRow = worksheet.getRow(newRowNumber); // Get the corresponding row in the new worksheet
    
    //        //const newRow = worksheet.addRow()
    //        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
    //          //const newCell = worksheet.getCell(colNumber, newRowNumber);
    //          const newCell = newRow.getCell(colNumber); // Get the corresponding cell in the new row
              
    //          // Copy value
    //          if(newRo>0){

    //            newCell.value = cell.value;

    //          }
    //          console.log('rowNumber',rowNumber)
    //           newCell.width = existingWorksheet.getColumn(colNumber).width;
    //           newCell.height = existingWorksheet.getRow(rowNumber).height;
    //           newCell.style = cell.style;
    //          // Copy style from the source cell to the target cell
    //          //const sourceCellStyle = existingWorksheet.getCell(colNumber, rowNumber).style;
    //        });
    //        newRowNumber++;
    //      }
    //    });
          



        
    ////  //customize font size and boldness of font
    //    worksheet.getCell('B1').font = {
    //      size: 20, // Customize the font size
    //      //bold: true, // Make the text bold
    //    };
    //    worksheet.getCell('B2').font = {
    //      size: 15, // Customize the font size
    //      //bold: true, // Make the text bold
    //    };
    
    ////// Customize cell padding
    //worksheet.getCell('B1').alignment = {
    //  wrapText: true, // Wrap text within the cell
    //  vertical: 'middle', // Vertically center the text
    //  horizontal: 'center', // Horizontally center the text
    //};




    //worksheet.getCell('B2').alignment = {
    //  wrapText: true, // Wrap text within the cell
    //  vertical: 'middle', // Vertically center the text
    //  horizontal: 'center', // Horizontally center the text
    //};

    
    //worksheet.getRow(1).height = 50; // Customize row height
    //worksheet.getRow(2).height = 40; // Customize row height
    ////worksheet.mergeCells('C1:J1') // Customize column width
    
    //////worksheet.getColumn('A').width=40;
    
    
    
    
    
    
    //const backgroundColor = { argb: 'FFFFFF' };
    
    //worksheet.eachRow((row, rowNumber) => {
    //  if (rowNumber === 1) {
    //    // Apply border style to the first row
    //    row.eachCell(cell => {
    //      if (cell.value) {
    //        // Cell has content, apply border
    //        cell.border = {
    //          top: { style: 'thin'   ,color:backgroundColor },
    //          //bottom: { style: 'thin',color:backgroundColor },
    //          left: { style: 'thin'  ,color:backgroundColor },
    //          right: { style: 'thin' ,color:backgroundColor }
    //        };
    //      } else {
    //        // Empty cell, no border
    //        cell.border = {
    //          top: { style: 'thin',  color: backgroundColor },
    //          left: {style: 'thin',  color: backgroundColor},
    //          right:{style: 'thin', color: backgroundColor}
    //          //bottom:{ color: backgroundColor},
    //        };
    //      }
    //    });
    //  } else {
    //    // Other rows, no border style applied
    //  }
    //});
    
    
    
    const timestamp = new Date().getTime();
    //const filePath = path.join(__dirname,`output_${timestamp}.xlsx`);
const newfilePath=
'/root/excel/uploads/'+`output_${timestamp}.xlsx`
    //console.log(newfilePath)
        await existingWorkbook.xlsx.writeFile(newfilePath).then(() => {
          console.log('Excel file edited successfully');
          
          const newData = new editModel({
            name:name ,
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