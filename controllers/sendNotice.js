var nodemailer = require('nodemailer');

const handleDetails = (req, res, db) => {
    const { message, subject, type } = req.body;
    const email = [];

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'no.reply.pprp@gmail.com',
            pass: 'pprp@123'
        }
    });

    if (type === 'all') {
        db.select('email').from('Users')
            .where('id', '!=', 11)
            .then(data => {
                data.map((det) => (
                    email.push(det.email)
                ))
               // console.log(email);
                var mailOptions = {
                    from: 'no.reply.pprp@gmail.com',
                    to: email,
                    subject: subject,
                    html: ` <p>${message}</p>` +
                        '<p> Regards  </p>' + '<p> SSP Office, Rupnagar  </p>'
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error)
                        res.status(400).json('unable to send email')
                    else
                        res.json('Email sent');
                });
            })
    }
    else {
        const ps_choosen = req.body.ps_choosen
        for (let i = 0; i < ps_choosen.length; i++) {
            db.select('email').from('Users')
                .where('id', '=', ps_choosen[i].value)
                .then(data => {
                    email.push(data[0].email)
                    if (email.length === ps_choosen.length) {
                       //console.log(email);
                        var mailOptions = {
                            from: 'no.reply.pprp@gmail.com',
                            to: email,
                            subject: subject,
                            html: ` <p>${message}</p>` +
                                '<p> Regards  </p>' + '<p> SSP Office, Rupnagar  </p>'

                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error)
                                res.status(400).json('unable to send email')
                            else
                                res.json('Email sent');
                        }); 
                    }
                })
        }

    }


}

module.exports = {
    handleDetails: handleDetails
};



