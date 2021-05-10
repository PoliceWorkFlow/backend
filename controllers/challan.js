function getDateTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    
    if(month.toString().length == 1) 
         month = '0'+month;
    
    if(day.toString().length == 1) 
         day = '0'+day;
       
    if(hour.toString().length == 1) 
         hour = '0'+hour;
    
    if(minute.toString().length == 1) 
         minute = '0'+minute;
    
    if(second.toString().length == 1) 
        second = '0'+second;
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
    return dateTime;
} 

const handleChallan = (req, res, db) => {
    const {policeStation, challan, type} = req.body;
    if (req.userId !== policeStation)
     res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    else{
    var dateChallan;

    db.select('id','dateChallan').from('Users')
       .where('id', '=', policeStation)
       .then(data => {
            dateChallan = data[0].dateChallan;
       })

    if(type === 'update'){
        db('Challan')
        .where({id: policeStation, monYear: challan.monYear})
        .update({
            overloading: challan.overLoading,
            drunken: challan.drunken,
            overspeed: challan.overspeed,
            withoutHelmet: challan.withoutHelmet,
            covid19: challan.covid19,
            others: challan.others,
            datemod: getDateTime(),
            monYear: challan.monYear
        })
        .then(data => {
            res.json('success');
        })
        .catch(err => res.status(400).json('Error in adding details'))
    }
    
    else{
     db('Challan')
       .returning('*')
       .insert({
           id: policeStation ,
           overloading: challan.overLoading,
           drunken: challan.drunken,
           overspeed: challan.overspeed,
           withoutHelmet: challan.withoutHelmet,
           covid19: challan.covid19,
           others: challan.others,
           datemod: getDateTime(),
           monYear: challan.monYear
       })
       .then(user => {
           res.json('success');
       })
       //.catch(err => console.log(err))
       .catch(err => res.status(400).json('Error in adding details'))
    }  

  }
}

module.exports = {
    handleChallan: handleChallan
};