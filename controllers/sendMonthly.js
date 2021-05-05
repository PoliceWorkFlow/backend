var nodemailer = require('nodemailer');
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const police_station = ['Nangal', 'City Morinda', 'Sri Anandpur Sahib', 'City Rupnagar', 'Kiratpur Sahib', 'Sri Chamkaur Sahib', 'Sadar Rupnagar', 'Sadar Morinda', 'Nurpurbedi', 'Singh Bhagwantpur']

const handleMonthly = (db) => {
    var monYear = months[new Date().getMonth()] + ' ' + new Date().getFullYear();

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ssprupnagar123@gmail.com',
            pass: ''
        }
    });

    var sendData = function (status, index) {

        let type = '';
        if (!status.challan)
            type = type + 'Challan';
        if (!status.recovery){
            if(type === '')
              type = type + 'Recovery';
            else  
            type = type + ', Recovery';
        }

        if (!status.ipc){
            if(type === '')
              type = type + 'Under IPC';
            else  
            type = type + ', Under IPC';
        }

        if (!status.local){
            if(type === '')
              type = type + 'Under Local & Special';
            else  
            type = type + ', Under Local & Special';
        }

        db.select('email').from('Users')
            .where('id', '=', index)
            .then(data => {
                const email = data[0].email;
                console.log(email);
                 console.log(type);
                var mailOptions = {
                    from: 'ssprupnagar123@gmail.com',
                    to: '2018csb1085@iitrpr.ac.in',
                    subject: 'Update ' + monYear + ' Report',
                    html: 'Hi ' + police_station[index-1] + ' Police Station' + '.' +
                        '<p> Kindly update <b>' + type + '</b> Report for ' + monYear + ' ASAP. </p>' +
                        '<p> Regards  </p>' + '<p> SSP Office, Rupnagar  </p>'

                };

                transporter.sendMail(mailOptions, function(error, info){
                 if (error) 
                     res.status(400).json('unable to send email')
                 else 
                     res.json('Email sent');
                 });
 
            })
    }

    var check = function (i) {
        let status = { challan: false, recovery: false, ipc: false, local: false }
        let j = 0;

        db.select('*').from('Challan')
            .where({
                id: i,
                monYear: monYear
            })
            .then(data => {
                if (data.length !== 0)
                    status.challan = true;
                j++;
                if (j == 4)
                    sendData(status, i);
            })

        db.select('*').from('Recovery')
            .where({
                id: i,
                monYear: monYear
            })
            .then(data => {
                if (data.length !== 0)
                    status.recovery = true;
                j++;
                if (j == 4)
                    sendData(status, i);
            })

        db.select('*').from('IPC')
            .where({
                id: i,
                monYear: monYear
            })
            .then(data => {
                if (data.length !== 0)
                    status.ipc = true;
                j++;
                if (j == 4)
                    sendData(status, i);
            })

        db.select('*').from('Local')
            .where({
                id: i,
                monYear: monYear
            })
            .then(data => {
                if (data.length !== 0)
                    status.local = true;
                j++;
                if (j == 4)
                    sendData(status, i);
            })
    }

    for (let i = 1; i <11; i++)
        check(i);

}

module.exports = {
    handleMonthly: handleMonthly
};



