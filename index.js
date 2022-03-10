require('dotenv').config();
const AWS = require('aws-sdk');
const express = require('express');
const app = express();
const multer = require('multer');
const multerUploadPlaceholder = multer({

    limits: {
        fileSize: 2 * 1024 * 1024, // not greater than 2MB.
        files: 1, // max number of file fields.
    }
  
}).single('image');

app.post(
    '/media',
    multerUploadPlaceholder,
    async function (req, res) {
        try{
            AWS.config.update({
                accessKeyId: process.env.ACCESS_KEY_ID, secretAccessKey: process.env.SECRET_ACCESS_KEY,
                region: 'us-east-1'
            });
            const params = {
                FunctionName: 'uploadFilesToS3', /* required */
                Payload: JSON.stringify(req.file)
            };
       
            const result = await (new AWS.Lambda().invoke(params).promise());
            if(result.StatusCode) res.status(result.StatusCode).send({"result": JSON.parse(result.Payload)});
            else res.status(result.StatusCode).send(result);   
        } catch(error){
            console.log(error)
            res.status(500).send(`Error Uploading image ${error}`);
        }    
    },
    function(err, req, res, next) {
        if(err){
            //File upload encountered an error as returned by multer
          res.status(400).json({error: err.message});
        }
        next()
        
    }

)

app.listen(3000, function () {
    console.log("Connected")
})
