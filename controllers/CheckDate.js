const handleCheckDate = (req, res, db) => {
    const {policeStation, monYear, type} = req.body;
    
    if(type === 'Challan'){
        db.select('*').from('Challan')
        .where({id: policeStation, monYear: monYear})
        .then(data => { 
            if(data.length === 0)
              res.json('No');
            else
              res.json('Yes'); 
        })
        .catch(err => res.status(400).json('Error'))
    } 
    else if(type === 'Recovery'){

        db.select('*').from('Recovery')
        .where({id: policeStation, monYear: monYear})
        .then(data => { 
            if(data.length === 0)
              res.json('No');
            else
              res.json('Yes');
        })
    }
    else if(type === 'Investigation'){
        
        db.select('*').from('IPC')
        .where({id: policeStation, monYear: monYear})
        .then(data => { 
            if(data.length === 0)
              res.json('No');
            else
              res.json('Yes');
        })
    }

    else if(type === 'Report'){
        
        db.select('*').from('ProgressReport')
        .where({id: policeStation, monYear: monYear})
        .then(data => { 
            if(data.length === 0)
              res.json('No');
            else
              res.json('Yes');
        })
    }
    
}

module.exports = {
    handleCheckDate: handleCheckDate
};