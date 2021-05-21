const police_station = ['Nangal', 'City Morinda', 'Sri Anandpur Sahib', 'City Rupnagar', 'Kiratpur Sahib', 'Sri Chamkaur Sahib', 'Sadar Rupnagar', 'Sadar Morinda', 'Nurpurbedi', 'Singh Bhagwantpur', 'SSP Office'];
//const police_station = ['PS1','PS2','PS3','PS4','PS5','PS6','PS7','PS8','PS9','PS10','SSP Office']

var jwt = require('jsonwebtoken');

const handleForgot = (req, res, db) => {
    const { station, token } = req.body;
    const index = police_station.indexOf(station) + 1;

    if (!token)
       return res.status(403).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, 'forgot', function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
     
    if(decoded.id === index)
      return res.json('success');
    else  
        res.json('failure');
    });
       
}
module.exports = {
    handleForgot: handleForgot
};
   