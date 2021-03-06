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

const handleInv = (req, res, db) => {
    const {policeStation, ipc, local, type} = req.body;
    if (req.userId !== policeStation)
     res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    else{
    var flag = false;
   
    if(type === 'update'){
        db('IPC')
        .where({id: policeStation, monYear: ipc.monYear})
        .update({
            underInvPend: ipc.underinvPend,
            underInvDisp: ipc.underinvDisp,
            cancelledPend: ipc.cancelledPend,
            cancelledDisp: ipc.cancelledDisp,
            underInv1YrPend: ipc.over1yearPend,
            underInv1YrDisp: ipc.over1yearDisp,
            underInv6monPend: ipc.over6monthPend,
            underInv6monDisp: ipc.over6monthDisp,
            underInvo3monPend: ipc.over3monthPend,
            underInvo3monDisp: ipc.over3monthDisp,
            underInvl3monPend: ipc.less3monthPend,
            underInvl3monDisp: ipc.less3monthDisp,
            datemod: getDateTime(),
            monYear: ipc.monYear
        })
        .then(data => {
            flag = true;
        })
        .catch(err => res.status(400).json('Error in adding details'))

        db('Local')
        .where({id: policeStation, monYear: local.monYear})
        .update({
            underInvPend: local.underinvPend,
            underInvDisp: local.underinvDisp,
            cancelledPend: local.cancelledPend,
            cancelledDisp: local.cancelledDisp,
            underInv1YrPend: local.over1yearPend,
            underInv1YrDisp: local.over1yearDisp,
            underInv6monPend: local.over6monthPend,
            underInv6monDisp: local.over6monthDisp,
            underInvo3monPend: local.over3monthPend,
            underInvo3monDisp: local.over3monthDisp,
            underInvl3monPend: local.less3monthPend,
            underInvl3monDisp: local.less3monthDisp,
            datemod: getDateTime(),
            monYear: local.monYear
        })
        .then(data => {
            if(flag)
             res.json('success');
        })
        .catch(err => res.status(400).json('Error in adding details'))

    }
    
    else{
     db('IPC')
     .returning('*')
     .insert({
         id: policeStation ,
         underInvPend: ipc.underinvPend,
         underInvDisp: ipc.underinvDisp,
         cancelledPend: ipc.cancelledPend,
         cancelledDisp: ipc.cancelledDisp,
         underInv1YrPend: ipc.over1yearPend,
         underInv1YrDisp: ipc.over1yearDisp,
         underInv6monPend: ipc.over6monthPend,
         underInv6monDisp: ipc.over6monthDisp,
         underInvo3monPend: ipc.over3monthPend,
         underInvo3monDisp: ipc.over3monthDisp,
         underInvl3monPend: ipc.less3monthPend,
         underInvl3monDisp: ipc.less3monthDisp,
         datemod: getDateTime(),
         monYear: ipc.monYear
     })
     .then(user => {
        flag = true;
       })
      // .catch(err => console.log(err));
     .catch(err => res.status(400).json('Error in adding details1'))
    
     db('Local')
     .returning('*')
     .insert({
         id: policeStation ,
         underInvPend: local.underinvPend,
         underInvDisp: local.underinvDisp,
         cancelledPend: local.cancelledPend,
         cancelledDisp: local.cancelledDisp,
         underInv1YrPend: local.over1yearPend,
         underInv1YrDisp: local.over1yearDisp,
         underInv6monPend: local.over6monthPend,
         underInv6monDisp: local.over6monthDisp,
         underInvo3monPend: local.over3monthPend,
         underInvo3monDisp: local.over3monthDisp,
         underInvl3monPend: local.less3monthPend,
         underInvl3monDisp: local.less3monthDisp,
         datemod: getDateTime(),
         monYear: local.monYear
       })
       .then(user => {
           if(flag)
             res.json('success');
        })
        //.catch(err => console.log(err));
        .catch(err => res.status(400).json('Error in adding details')) 
    }
}

}

module.exports = {
    handleInv: handleInv
};