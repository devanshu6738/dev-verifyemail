const nodemailer = require('nodemailer');
function otpGenerate(otpLength){
  let digits = '1234567890';
  let otp = '';  
  for (let i = 0; i < otpLength; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp
}

async function generateVerify(otpLength, service, Uremail, appPass, recipientEmail,Appname) {
  let otpVer=otpGenerate(otpLength);
  let transporter = nodemailer.createTransport({
    service: service,  
    auth: {
      user: Uremail,    
      pass: appPass,    
    },
  });

  
  let info = await transporter.sendMail({
    from: `${Appname} <${Uremail}>`, 
    to: recipientEmail,                  
    subject: 'Your OTP Code',
    text: `Your OTP is ${otpVer}`,          
  });
  return otpVer;
}
module.exports=generateVerify