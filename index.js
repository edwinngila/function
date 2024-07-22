const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const cors=require('cors');
const cryptojs = require('crypto-js')
require('dotenv').config();

app.use(express.json());
//*Code written for allowing the client to access the backend*/
const allowedOrigins='http://localhost:3000';
app.use(cors({
    origin:(origin,callback)=>{
        if(!origin||allowedOrigins.includes(origin)){
            callback(null,true);
        }
        else{
            callback(new error('not allowed by cors')); 
        }
    }
}));

app.post('/sendEmail',async (request,response,next)=>{
    try {
        const {UserEmail}=request.body;
        const randomNumber = String(Math.floor(100000 + Math.random() * 900000));
        const encryptionKey ='72ee941d66f446a7bcd354';
        const ciphertext = cryptojs.AES.encrypt(randomNumber,encryptionKey).toString();

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
              user: 'stockpilotorg@gmail.com',
              pass: 'pyxh jhtc eqfl autp',
            },
          });
      
          // Define the email options
          const mailOptions = {
            from: 'stockpilotorg@gmail.com',
            to: `${UserEmail}`,
            subject: 'Test Email from Firebase',
            text: `${randomNumber}`,
          };
      
          // Send the email
          await transporter.sendMail(mailOptions);
      
          response.send({
             ciphertext:ciphertext,
             massage:"Email has been send"
          });
    } catch (error) {
        console.error('Error sending email:', error);
        response.status(500).send('Error sending email');
    }
})
app.use((req,res,next)=>{
    const err = new Error("NOT FOUND");
    err.status=404;
    next(err);
})
app.use((err,req,res,next)=>{
    res.status(err.status||500);
    res.send({
        error:{
            status:err.status ||500,
            Message:err.Message
        }
    })
})
 // Adjust the path as necessary
app.listen(4000,()=>{console.log(`you are now listening to http://localhost:4000`)})