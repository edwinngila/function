const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const functions = require('firebase-functions');
const app = require('./server');

app.get('sendEmail',async (request,response)=>{
    try {
        const {securityCode,UserEmail}=request.body;
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
            text: `${securityCode}`,
          };
      
          // Send the email
          await transporter.sendMail(mailOptions);
      
          response.send('Email sent successfully!');
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

exports.app = functions.https.onRequest(app);
app.listen(4000,()=>{console.log(`you are now listening to http://localhost:4000`)})