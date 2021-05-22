const police_station = ['Nangal', 'City Morinda', 'Sri Anandpur Sahib', 'City Rupnagar', 'Kiratpur Sahib', 'Sri Chamkaur Sahib', 'Sadar Rupnagar', 'Sadar Morinda', 'Nurpurbedi', 'Singh Bhagwantpur', 'SSP Office'];
//const police_station = ['PS1','PS2','PS3','PS4','PS5','PS6','PS7','PS8','PS9','PS10','SSP Office']
var nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");

const handleForgot = (req, res, db) => {
    const { station } = req.body;
    const index = police_station.indexOf(station) + 1;

    const payload = {
        id: index,
        date: new Date() 
    };

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'no.reply.pprp@gmail.com',
            pass: 'pprp@123'
        }
    });

    db.select('*').from('Users')
        .where('id', '=', index)
        .then(data => {
            
            var email = data[0].email;
            const token =  jwt.sign(payload, "forgot");

            var mailOptions = {
                to: email,
                from: "no.reply.pprp@gmail.com",
                subject: "Password Reset (Testing)",
                html: `
             <p>You requested for password reset</p>
             <h4>Click on this <a href = 'http://103.118.50.49/change-password/${token}+++${station}' >link</a> to reset password</h4>
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


