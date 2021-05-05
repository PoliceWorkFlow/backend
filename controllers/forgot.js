const police_station = ['Nangal', 'City Morinda', 'Sri Anandpur Sahib', 'City Rupnagar', 'Kiratpur Sahib', 'Sri Chamkaur Sahib', 'Sadar Rupnagar', 'Sadar Morinda', 'Nurpurbedi', 'Singh Bhagwantpur', 'SSP Office'];
var nodemailer = require('nodemailer');

const handleForgot = (req, res, db) => {
    const { station } = req.body;
    const index = police_station.indexOf(station) + 1;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ssprupnagar123@gmail.com',
            pass: 'Ssprupnagar@123'
        }
    });

    db.select('*').from('Users')
        .where('id', '=', index)
        .then(data => {
            //console.log(data[0]);
            //var email = data[0].email;
            var email = '2018csb1085@iitrpr.ac.in'
            var currentDate = new Date();
            var mailOptions = {
                to: email,
                from: "ssprupnagar123@gmail.com",
                subject: "Password Reset",
                html: `
             <p>You requested for password reset</p>
             <h4>Click on this <a href = 'http://localhost:3001/change-password/${currentDate}+++${data[0].email}++${station}' >link</a> to reset password</h4>
             <h4>Link will be active for only 15 minutes</h4>
             <h4>Link can be used only once to change the password!!!</h4>
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


