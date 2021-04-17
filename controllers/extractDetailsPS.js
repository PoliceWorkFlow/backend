const challan = require("./challan");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const handleDetails = (req, res, db) => {
    const {id, monYear, range} = req.body;

    const dates = [];
    const month = monYear.split(' ')[0];
    var year = monYear.split(' ')[1];
    var index = months.indexOf(month);

    if(range === 'Last 3 Months Data'){
        dates.push(monYear);
        index--;
        for(var i=0; i<2; i++){
            if(index < 0){
              index = 11;
              year = year - 1;
            }
         dates.push(months[index] + ' ' + year);
         index--;
         }
    }

    else if(range === 'Last 6 Months Data'){
        dates.push(monYear);
        index--;
        for(var i=0; i<5; i++){
            if(index < 0){
              index = 11;
              year = year - 1;
            }
         dates.push(months[index] + ' ' + year);
         index--;
         }
    }

    else {
        dates.push(monYear);
        index--;
        for(var i=0; i<8; i++){
            if(index < 0){
              index = 11;
              year = year - 1;
            }
         dates.push(months[index] + ' ' + year);
         index--;
         }
    }

    const IPC = [];
    const Local = [];
    const Challan = [];

    
    var answer = function(date){
      db.select('*').from('Challan')
      .where({
            id: id,
            monYear: date
       })
       .then(data => {
          if(data[0] === undefined){
              Challan.push({
                id: id, overloading: '0', withoutHelmet: '0', drunken: '0', covid19: '0', overspeed: '0', others: '0', type: 'Not Filled', monYear: date
              });          
             }
            else  
               Challan.push(data[0]);

          if(Challan.length === dates.length && IPC.length === dates.length && Local.length === dates.length)
              res.json({ challan: Challan, ipc: IPC, local: Local})
       })
       .catch(err => res.status(400).json('error')) 
      
       db.select('*').from('IPC')
       .where({
            id: id,
            monYear: date
        })
        .then(data => {
              if(data[0] === undefined){
                  IPC.push({
                    id:id, underInvPend: '0', underInvDisp: '0', cancelledPend: '0', cancelledDisp: '0', underInv1YrPend: '0', underInv1YrDisp: '0', underInv6monPend: '0', underInv6monDisp: '0', underInvo3monPend: '0', underInvo3monDisp: '0', underInvl3monPend: '0', underInvl3monDisp: '0', monYear: date
                  });
                }
                else
                  IPC.push(data[0]); 
        
          if(Challan.length === dates.length && IPC.length === dates.length && Local.length === dates.length)
              res.json({ challan: Challan, ipc: IPC, local: Local})   
       })
       .catch(err => res.status(400).json('error'))  
      
       db.select('*').from('Local')
         .where({
              id: id,
              monYear: date
          })
          .then(data => {
                if(data[0] === undefined){
                    Local.push({
                      id:id, underInvPend: '0', underInvDisp: '0', cancelledPend: '0', cancelledDisp: '0', underInv1YrPend: '0', underInv1YrDisp: '0', underInv6monPend: '0', underInv6monDisp: '0', underInvo3monPend: '0', underInvo3monDisp: '0', underInvl3monPend: '0', underInvl3monDisp: '0', monYear: date
                    });
                  }
                  else
                    Local.push(data[0]);  
            
              if(Challan.length === dates.length && IPC.length === dates.length && Local.length === dates.length)
                res.json({ challan: Challan, ipc: IPC, local: Local})  
         })
         //.catch(err => console.log(err))
         .catch(err => res.status(400).json('error'))  
    }

    for(var i=0; i<dates.length; i++){
        answer(dates[i]);
      }
 }

module.exports = {
    handleDetails: handleDetails
  };

    
 
