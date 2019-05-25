const nodemailer = require('nodemailer')

import emailHtml from './email-bao-hong.html'


  // send mail with defined transport object
  const sendEmail = async ()=>{
      // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });
  
    await transporter.sendMail({
    from: '"Fred Foo 👻" <vuonggl.it@gmail.com>', // sender address
    to: "bar@example.com, sangvo.k57@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: emailHtml // html body
  });
  }
   

export default {
  sendEmail
}