const police_station = ['Nangal', 'City Morinda', 'Sri Anandpur Sahib', 'City Rupnagar', 'Kiratpur Sahib', 'Sri Chamkaur Sahib', 'Sadar Rupnagar', 'Sadar Morinda', 'Nurpurbedi', 'Singh Bhagwantpur', 'SSP Office'];

const handleForgot = (req, res, db) => {
    const { station, pass } = req.body;
    const index = police_station.indexOf(station) + 1;
    console.log(pass);

    db.select('*').from('Users')
    .where('id', '=', index)
    .then(data => { 
        console.log(data[0].password)
        if(data[0].password === pass)
         res.json('success');
        else 
         res.json('failure');
    })
    .catch(err => res.status(400).json('failure'))

}
module.exports = {
    handleForgot: handleForgot
};
   