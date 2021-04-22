var nodemailer = require('nodemailer');

const handleDetails = (req, res, db) => {
    const {ps, monYear, type} = req.body;
   // console.log(ps);
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ssprupnagar123@gmail.com',
        pass: 'Ssprupnagar@123'
    }
    });

    var mailOptions = {
    from: 'ssprupnagar123@gmail.com',
    to: '2018csb1085@iitrpr.ac.in, 2018csb1173@iitrpr.ac.in, 2018csb1108@iitrpr.ac.in',
    subject: 'Update ' + monYear + ' Report for ' + type,
    html: 'Hi ' + ps + ' Police Station' + '.' +
         '<p> Kindly update ' + type + ' report for ' + monYear + ' ASAP. </p>' + 
         '<p> Regards  </p>' + '<p> SSP Office, Rupnagar  </p>'
         
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) 
        res.status(400).json('unable to send email')
    else 
        res.json('Email sent');
    });

 }

module.exports = {
    handleDetails: handleDetails
  };

    
 
