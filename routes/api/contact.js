const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const keys = require('../../config/keys');

// Load Input Validation
const validateContactInput = require('../../validation/contact');


router.get('/contact', (req, res) => {
  res.json({msg:"Hello"})
});	
// @route   POST api/users/contact
// @desc    Register user
// @access  Public
router.post('/contact', (req, res) => {

  const { errors, isValid } = validateContactInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }  

 //console.log(req.body)
 
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var website = req.body.website;
    var subject = req.body.subject;
    var message = req.body.message;

    var msgBody = `
    	<table>
    		<tbody>
    			<tr><td>First Name</td><td>${fname}</td></tr>
    			<tr><td>Last Name</td><td>${lname}</td></tr>
    			<tr><td>Email</td><td>${email}</td></tr>
    			<tr><td>Website</td><td>${website}</td></tr>
    			<tr><td>Subject</td><td>${subject}</td></tr>
    			<tr><td>Message</td><td>${message}</td></tr>
    		</tbody>
    	</table>
    `;

async function main() {
    // Nodemailer
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: keys.smtpEmail,
        pass: keys.smtpPass
      }
    });
    
    var mailOptions = {
      from: `Bookstore <${keys.smtpEmail}>`,
      to: email,
      subject: subject,
      html: msgBody
    };
    
    await transporter.sendMail(mailOptions, function(error, info){
      if (error) {
      	res.json({email:"Unable to send email"});
        console.log("Mail error:",error);
      } else {
      	res.json({email:"Email sent successfully"});
        console.log('Email sent: ' + info.response);
      }
    });

 }

 main().catch(console.error);


 
});

module.exports = router;
