const express = require('express');
const Router = express.Router();
const multer = require('multer');
const server = require('../models/conne');
const bcrypt = require('bcrypt');


const upload = multer({ dest: "upload" })
Router.get('/', (req, res) => {
    res.render('index')
});

Router.post('/upload', upload.single('file'), async (req, res) => {
    const path = req.file.path;
    const originalName = req.file.originalname;
    const password = req.body.password



    const file = new server({
        path,originalName,password
    })
    const fileData = await file.save();
    console.log(fileData);
   res.render('index' , {filelink : `${req.headers.origin}/fileData/${fileData.id}`});

    

}) 
 

Router.route('/fileData/:id').get(handlegetPost).post(handlegetPost)


async function handlegetPost(req,res) {
    const file = await server.findById(req.params.id);

    if(file.password != null ){
        if(req.body.password == null){
            res.render('password');
            return 
        }
   

    if(!(await bcrypt.compare(req.body.password , file.password))){
        res.render('password', {errors : true})
        return
    }
} 

    file.downloadCount++; 
    await file.save();
    console.log(file.downloadCount);
    res.download(file.path, file.originalName); 
}

module.exports = Router; 