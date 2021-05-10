const { compare } = require('bcrypt');
var nodemailer = require('nodemailer');
const police_station = ['Nangal', 'City Morinda', 'Sri Anandpur Sahib', 'City Rupnagar', 'Kiratpur Sahib', 'Sri Chamkaur Sahib', 'Sadar Rupnagar', 'Sadar Morinda', 'Nurpurbedi', 'Singh Bhagwantpur']

const handleDetails = (req, res, db) => {
    const { ps, monYear, type, status } = req.body;
   console.log(type);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cktdilpreet@gmail.com',
            pass: ''
        }
    });

    if (status === 'one') {
        const index = police_station.indexOf(ps) + 1;

        db.select('email').from('Users')
            .where('id', '=', index)
            .then(data => {
                // console.log(data[0].email);

                /* var mailOptions = {
                     from: 'cktdilpreet@gmail.com',
                     to: data[0].email,
                     subject: 'Update ' + monYear + ' Report for ' + type,
                     html: 'Hi ' + ps + ' Police Station' + '.' +
                         '<p> Kindly update <b>' + type + ' report for ' + monYear + '</b> ASAP. </p>' +
                         '<p> Regards  </p>' + '<p> SSP Office, Rupnagar  </p>'
     
                 };
     
                 transporter.sendMail(mailOptions, function (error, info) {
                     if (error)
                         res.status(400).json('unable to send email')
                     else
                         res.json('Email sent');
                 });*/
            })
    }

    else if (status === 'all') {
        const email = []

        for (let j = 0; j < ps.length; j++) {
            db.select('email').from('Users')
                .where('id', '=', ps[j])
                .then(data => {
                    email.push(data[0].email)
                    if(email.length === ps.length){
                      //console.log(email);
                       
                       /* var mailOptions = {
                     from: 'cktdilpreet@gmail.com',
                     to: email,
                     subject: 'Update ' + monYear + ' Report for ' + type,
                     html: 'Hi ' + ps + ' Police Station' + '.' +
                         '<p> Kindly update <b>' + type + ' report for ' + monYear + '</b> ASAP. </p>' +
                         '<p> Regards  </p>' + '<p> SSP Office, Rupnagar  </p>'
     
                 };
     
                 transporter.sendMail(mailOptions, function (error, info) {
                     if (error)
                         res.status(400).json('unable to send email')
                     else
                         res.json('Email sent');
                 });
                 */
                    }
                })
        }

    }

}

module.exports = {
    handleDetails: handleDetails
};



