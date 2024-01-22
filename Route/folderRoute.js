const express=require('express')
const { createFolder, readfolder, readchildFolder, readfile } = require('../controller/folderController')
const router=express.Router()




router.route('/createfolder').post(createFolder)
router.route('/readfolder').get(readfolder)
router.route('/readfile').get(readfile)
//router.route('/download').post(download)
router.route('/readchildfolder/:rootfolder').get(readchildFolder)

module.exports=router;