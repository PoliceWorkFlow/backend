const police_station = ['Nangal', 'City Morinda', 'Sri Anandpur Sahib', 'City Rupnagar', 'Kiratpur Sahib', 'Sri Chamkaur Sahib', 'Sadar Rupnagar', 'Sadar Morinda', 'Nurpurbedi', 'Singh Bhagwantpur', 'SSP Office'];

const handleUpdate = (req, res, db, bcrypt) => {
    const {station, new_pass} = req.body;
    const index = police_station.indexOf(station) + 1;

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
   
    const hash = bcrypt.hashSync(new_pass, salt);
    //console.log(hash);

    db.transaction(trx => {
        trx.where({id: index})
        .update({
          password: hash,
        })
        .into('Users')
        .then(data => {
            res.json('success')})
        .then(trx.commit)
        .catch(trx.rollback)
      })
      .catch(err => res.status(400).json('Error'))
}

module.exports = {
    handleUpdate: handleUpdate
  };

  
