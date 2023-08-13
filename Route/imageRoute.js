const express=require('express')
const { saveImageControle, original } = require('../Controller/imageController')
const multer=require('multer');
const { edit, geteditfile } = require('../Controller/editController');
const router=express.Router()
// Configure multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const add = Date.now() + file.originalname;
        cb(null, add);
    }
});
const upload = multer({ storage });

router.route('/upload').post(upload.single('excelfile'),saveImageControle)

router.route('/edit').post(upload.single(),edit)    

router.route('/get').get(geteditfile)
router.route('/getorg').get(original)
module.exports=router;