const police_station = ['Nangal', 'City Morinda', 'Sri Anandpur Sahib', 'City Rupnagar', 'Kiratpur Sahib', 'Sri Chamkaur Sahib', 'Sadar Rupnagar', 'Sadar Morinda', 'Nurpurbedi', 'Singh Bhagwantpur', 'SSP Office'];

const handleProfile = (req, res, db, bcrypt) => {
    const { station, type } = req.body;
    
    if (req.userId !== station)
     res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
     
    else if (type === 'check') {
        db.select('id','email', 'username').from('Users')
            .where('id', '=', station)
            .then(data => {
                res.json(data);
            })
            .catch(err => res.status(400).json('failure'))
    }

    else if(type === 'email'){
        const {email, pass} = req.body;
        
        db.select('password').from('Users')
            .where('id', '=', station)
            .then(data => {
                const isValid = bcrypt.compareSync(pass, data[0].password.trim());
                if(isValid){
                    db('Users')
                    .where({id: station})
                    .update({
                        email: email
                    })
                    .then(data => {
                        res.json('success');
                    })
                    .catch(err => res.status(400).json('failure'))
                }
                else
                 res.status(400).json('Incorrect Password')
                
            })
            //.catch(err => console.log(err))
            .catch(err => res.status(400).json('failure'))
    }

    else if(type === 'username'){
        const {username, pass} = req.body;
        
        db.select('password').from('Users')
            .where('id', '=', station)
            .then(data => {
                const isValid = bcrypt.compareSync(pass, data[0].password.trim());
                if(isValid){
                    db('Users')
                    .where({id: station})
                    .update({
                        username: username
                    })
                    .then(data => {
                        res.json('success');
                    })
                    .catch(err => res.status(400).json('failure'))
                }
                else
                 res.status(400).json('Incorrect Password')
                
            })
            //.catch(err => console.log(err))
            .catch(err => res.status(400).json('failure'))
    }

    else if(type === 'pass'){
        const {pass, new_pass} = req.body;
        
        db.select('password').from('Users')
            .where('id', '=', station)
            .then(data => {
                const isValid = bcrypt.compareSync(pass, data[0].password.trim());
                if(isValid){
                    const saltRounds = 10;
                    const salt = bcrypt.genSaltSync(saltRounds);
                    const hash = bcrypt.hashSync(new_pass, salt);

                    db.transaction(trx => {
                        trx.where({id: station})
                        .update({
                          password: hash,
                        })
                        .into('Users')
                        .then(data => {
                            res.json('success')})
                        .then(trx.commit)
                        .catch(trx.rollback)
                      })
                      .catch(err => res.status(400).json('failure'))
                }
                else
                 res.status(400).json('Incorrect Password')
                
            })
            //.catch(err => console.log(err))
            .catch(err => res.status(400).json('failure'))
    }


}
module.exports = {
    handleProfile: handleProfile
};
