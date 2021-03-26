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

const handleRecovery = (req, res, db) => {
    const {policeStation, recovery} = req.body;
    //console.log('Police Station', policeStation);
    //console.log(recovery);
    
    db('Recovery')
    .returning('*')
    .insert({
        id: policeStation ,
        illicit: recovery.illict,
        licit: recovery.licit,
        lahan: recovery.lahan,
        ganja: recovery.ganja,
        poppy: recovery.poppy,
        heroin: recovery.heroin,
        opium: recovery.opium,
        charas: recovery.charas,
        tablets: recovery.tablets,
        injections: recovery.injections,
        others: recovery.others,
        datemod: getDateTime()
    })
    .then(user => {
        res.json('success');
    }) .catch(err => res.status(400).json('Error in adding details'))
}

module.exports = {
    handleRecovery: handleRecovery
};