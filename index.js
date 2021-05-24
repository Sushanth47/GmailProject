const express = require('express')
const app = express();
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2;
const nodemailer = require('nodemailer')

//i am using oauth2 credentials here and i have generated oauth2 credentials from the project in 
//google developers console where i have enabled gmail api in my project


const oauth2Client = new OAuth2(
  "294798513911-1rmb05f8vhntaokhbg8f5d3cepv8njl4.apps.googleusercontent.com",
  "pK40_Lyqp8Sgz9D9Rvc3-A0G",
  "https://developers.google.com/oauthplayground"

  //CLIENT_ID, CLIENT_SECRET, REDIRECT_URIS
)

oauth2Client.setCredentials({
  refresh_token: "1//04r2HtkB5U32XCgYIARAAGAQSNwF-L9IrXSs9PTfmLn_s5ojU5L6NRgh5xF10Dc3PR17Pg2hys9RkosijaVxTb1fPTtoSz1f85l4"
});
const accessToken = oauth2Client.getAccessToken()
const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "chandupopstar@gmail.com",//if any other users are required, we can go to OAuth consent screen
    //in the project and add another users gmail there ro send gmails to anyone
    //we can add a max of 100
    clientId: "294798513911-1rmb05f8vhntaokhbg8f5d3cepv8njl4.apps.googleusercontent.com",
    clientSecret: "pK40_Lyqp8Sgz9D9Rvc3-A0G",
    //both client id and client secret are generated in the credentials tab in developer console
    //in the project and are taken and pasted here
    //there is a credentials.json where you can find the client id and client secret
    refreshToken: "1//04r2HtkB5U32XCgYIARAAGAQSNwF-L9IrXSs9PTfmLn_s5ojU5L6NRgh5xF10Dc3PR17Pg2hys9RkosijaVxTb1fPTtoSz1f85l4",
    accessToken: accessToken
  },
  tls: {
    rejectUnauthorized: false
  }
})


const mailOptions = {
  from: "chandupopstar@gmail.com",
  to: "",
  //we can add the user to whom we want to send mail
  //we can send emails to multiple people by adding comma(,) after every gmail we entered
  subject: "Node.js Email with Secure OAuth",
  generateTextFromHTML: true,
  //the message is required to be written with html tags
  html: "<b>test teste test</b>"
};


// SMTP is a set of communication guidelines that allow software
// to transmit an electronic mail over the internet is called Simple Mail Transfer Protocol.
// It is a program used for sending messages to other computer users based on e-mail addresses.
smtpTransport.sendMail(mailOptions, (error, response) => {
  if (error) console.log(error) 
  else console.log(response);
  smtpTransport.close();
});
const port = process.env.PORT || 3000
app.listen(port, ()=>console.log(`this is our port: ${port}`))