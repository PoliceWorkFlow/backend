const police_station = ['Nangal', 'City Morinda', 'Sri Anandpur Sahib', 'City Rupnagar', 'Kiratpur Sahib', 'Sri Chamkaur Sahib', 'Sadar Rupnagar', 'Sadar Morinda', 'Nurpurbedi', 'Singh Bhagwantpur', 'SSP Office'];
var nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");

const handleForgot = (req, res, db) => {
    const { station } = req.body;
    const index = police_station.indexOf(station) + 1;

    const payload = {
        id: index
    };

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ssprupnagar123@gmail.com',
            pass: ''
        }
    });

    db.select('*').from('Users')
        .where('id', '=', index)
        .then(data => {
            //console.log(data[0]);
            //var email = data[0].email;
            var email = '2018csb1085@iitrpr.ac.in'

            const token =  jwt.sign(payload, "forgot");

            var currentDate = new Date();
            var mailOptions = {
                to: email,
                from: "ssprupnagar123@gmail.com",
                subject: "Password Reset",
                html: `
             <p>You requested for password reset</p>
             <h4>Click on this <a href = 'http://103.118.50.49/change-password/${currentDate}+++${token}++${station}' >link</a> to reset password</h4>
             <h4>Link will be active for only 15 minutes</h4>
             `
            }

            transporter.sendMail(mailOptions, function (error, info) {
                if (error)
                    res.status(400).json('unable to send email')
                else
                    res.json('Email sent');
            });
        })


}

module.exports = {
    handleForgot: handleForgot
};


