var nodemailer = require('nodemailer');

const handleDetails = (req, res, db) => {
    const {message, type} = req.body;
    const email = [];

    // if(type === 'all'){
    //     db.select('email').from('Users')
    //     .where('id', '!=', 11)
    //     .then(data => { 
    //         data.map((det) => (
    //             email.push(det.email)
    //         ))
    //     //  console.log(email);
    //      /* var mailOptions = {
    //         from: 'cktdilpreet@gmail.com',
    //         to: email,
    //         subject: 'Message from SP office',
    //         html: msg 
    //         };*/
    // })
    // }
    // else{
    //    const ps_choosen = req.body.ps_choosen
    //    for(let i=0; i<ps_choosen.length; i++){
    //         db.select('email').from('Users')
    //         .where('id', '=', ps_choosen[i].value)
    //         .then(data => { 
    //             email.push(data[0].email)
    //             if(email.length === ps_choosen.length){
    //                 /*var mailOptions = {
    //                     from: 'Message from SP office',
    //                     to: email,
    //                     subject: 'Update ' + monYear + ' Report for ' + type,
    //                     html: msg
                             
    //                     };*/
    //             } 
    //         })   
    //    }
      
    // }

    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ssprupnagar123@gmail.com',
        pass: 'Ssprupnagar@123'
    }
    });

    var email1 = ['2018csb1085@iitrpr.ac.in']
    var mailOptions = {
        from: 'ssprupnagar123@gmail.com',
        to: email1,
        subject: 'Message from SSP office',
        html: `<p>${message}</p>`
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

    
 
