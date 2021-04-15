const challan = {overloading: '0', withoutHelmet: '0', drunken: '0', covid19: '0', overspeed: '0', others: '0'};
const recovery = { illict: '0', licit: '0', lahan: '0', ganja: '0', poppy: '0', heroin: '0', opium: '0', charas: '0', tablets: '0', injections: '0', others: '0' };
const ipc = {underInvPend: '0', underInvDisp: '0', cancelledPend: '0', cancelledDisp: '0', underInv1YrPend: '0', underInv1YrDisp: '0', underInv6monPend: '0', underInv6monDisp: '0', underInvo3monPend: '0', underInvo3monDisp: '0', underInvl3monPend: '0', underInvl3monDisp: '0'};
const local = {underInvPend: '0', underInvDisp: '0', cancelledPend: '0', cancelledDisp: '0', underInv1YrPend: '0', underInv1YrDisp: '0', underInv6monPend: '0', underInv6monDisp: '0', underInvo3monPend: '0', underInvo3monDisp: '0', underInvl3monPend: '0', underInvl3monDisp: '0'};
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const handleSignin = (req, res, db) => {
    const {username, password} = req.body;
    const monYear = months[new Date().getMonth()] + ' ' + new Date().getFullYear();
    //console.log(monYear);
    var id;
    const report = [];
    const cases = [];
    const IPC = [];
    const Local = [];
    const Recovery = [];
    const Challan = [];
    var id1 = 1;
    var id2 = 1;
    var id3 = 1;
    var id4 = 1;

 
    db.select('*').from('Users')
       .where('username', '=', username)
       .then(data => {
           if(data[0].password === password){
                id = data[0].id;
              
                for(var i = 1; i<11; i++){
                  db.select('id','dateprogress').from('Users')
                  .where('id', '=', i)
                  .then(data => {

                        db.select('*').from('ProgressReport')
                        .where({
                            id: data[0].id,
                            datemod: data[0].dateprogress
                          })
                        .then( data => {
                          report.push(data[0]); 

                        if(report.length === 10 && Challan.length === 10 && Recovery.length === 10 && IPC.length === 10 && Local.length === 10)
                            res.json({ id:id, report: report, challan: Challan, recovery: Recovery, ipc: IPC, local: Local});
                          }) 
                        .catch(err => res.status(400).json('unable to login1')) 
                   })
                   .catch(err => res.status(400).json('unable to login6')) 
                  }
                 
                  for(var i=1; i<11; i++){
                    
                      db.select('*').from('Challan')
                      .where({
                          id: i,
                          monYear: monYear
                        })
                      .then( data => {
            
                        if(data[0] === undefined){
                          Challan.push({
                            id: id1, overloading: '0', withoutHelmet: '0', drunken: '0', covid19: '0', overspeed: '0', others: '0', type: 'Not Filled'
                          });          
                         }
                        else  
                           Challan.push(data[0]);

                          id1++;

                        if(report.length === 10 && Challan.length === 10 && Recovery.length === 10 && IPC.length === 10 && Local.length === 10)
                           res.json({ id:id, report: report, challan: Challan, recovery: Recovery, ipc: IPC, local: Local});
                        }) 
                      .catch(err => console.log(err)) 
                      }
                   
                  for(var i=1; i<11; i++){
                       
                      db.select('*').from('Recovery')
                      .where({
                          id: i,
                          monYear: monYear
                        })
                      .then( data => {
                        if(data[0] === undefined){
                          Recovery.push({
                            id: id2, illict: '0', licit: '0', lahan: '0', ganja: '0', poppy: '0', heroin: '0', opium: '0', charas: '0', tablets: '0', injections: '0', others: '0', type: 'Not Filled'
                          });
                         }
                        else 
                           Recovery.push(data[0]); 
                        
                          id2++;

                        if(report.length === 10 && Challan.length === 10 && Recovery.length === 10 && IPC.length === 10 && Local.length === 10)
                           res.json({ id:id, report: report, challan: Challan, recovery: Recovery, ipc: IPC, local: Local});
                        }) 
                      .catch(err => res.status(400).json('unable to login3')) 
                    }

                    for(var i=1; i<11; i++){
                      db.select('*').from('IPC')
                      .where({
                             id: i,
                             monYear: monYear
                        })
                      .then( data => {

                        if(data[0] === undefined){
                          IPC.push({
                            id:id3, underInvPend: '0', underInvDisp: '0', cancelledPend: '0', cancelledDisp: '0', underInv1YrPend: '0', underInv1YrDisp: '0', underInv6monPend: '0', underInv6monDisp: '0', underInvo3monPend: '0', underInvo3monDisp: '0', underInvl3monPend: '0', underInvl3monDisp: '0', type: 'Not Filled'
                          });
                        }
                        else
                          IPC.push(data[0]); 
                        
                          id3++;

                        if( report.length === 10 &&  Challan.length === 10 && Recovery.length === 10 && IPC.length === 10 && Local.length === 10)
                          res.json({ id:id, report: report, challan: Challan, recovery: Recovery, ipc: IPC, local: Local});
                        }) 
                      .catch(err => res.status(400).json('unable to login4'))
                    }
                    
                    for(var i=1; i<11; i++){
                      db.select('*').from('Local')
                      .where({
                            id: i,
                            monYear: monYear
                        })
                      .then( data => {

                        if(data[0] === undefined){
                          Local.push({
                            id:id4, underInvPend: '0', underInvDisp: '0', cancelledPend: '0', cancelledDisp: '0', underInv1YrPend: '0', underInv1YrDisp: '0', underInv6monPend: '0', underInv6monDisp: '0', underInvo3monPend: '0', underInvo3monDisp: '0', underInvl3monPend: '0', underInvl3monDisp: '0', type: 'Not Filled'
                          });
                         }
                        else 
                          Local.push(data[0]); 
                          id4++;

                        if(report.length === 10 && Challan.length === 10 && Recovery.length === 10 && IPC.length === 10 && Local.length === 10)
                          res.json({ id:id, report: report, challan: Challan, recovery: Recovery, ipc: IPC, local: Local});
                        }) 
                      //  .catch(err => console.log(err));
                      .catch(err => res.status(400).json('unable to login5'))
                    }
                   }   
           else
             res.status(400).json('unable to login')
          })
        // .catch(err => console.log(err));
        .catch(err => res.status(400).json('unable to login'))
}

module.exports = {
    handleSignin: handleSignin
  };

    
      /* 
               else{
                  cases.push( data[0].id );
 
                 db.select('*').from('Challan')
                 .where({
                     id: data[0].id,
                     datemod: data[0].dateChallan
                   })
                 .then( data => {
                    //console.log(data[0]); 
                    if(data[0] === undefined)
                        cases.push(challan);
                    else
                       cases.push(data[0]);

                    cases[cases.length - 1].type = 'Challan';
                   
                    if(cases.length == 5)
                      res.json(cases);
                    }) 
                 .catch(err => res.status(400).json('unable to login')) 
             
                 db.select('*').from('Recovery')
                 .where({
                     id: data[0].id,
                     datemod: data[0].daterecovery
                    })
                 .then( data =>{ 
                      if(data[0] === undefined)
                         cases.push(recovery);
                      else
                        cases.push(data[0]);

                      cases[cases.length - 1].type = 'Recovery';
 
                     if(cases.length == 5)
                      res.json(cases);
                    }) 
                 .catch(err => res.status(400).json('unable to login')) 
             
                 db.select('*').from('IPC')
                 .where({
                     id: data[0].id,
                     datemod: data[0].dateipc
                    })
                 .then( data =>{ 
                      if(data[0] === undefined)
                        cases.push(ipc);
                      else
                        cases.push(data[0]);

                       cases[cases.length - 1].type = 'IPC';
 
                      if(cases.length == 5)
                      res.json(cases);
                   }) 
                 .catch(err => res.status(400).json('unable to login')) 
             
                 db.select('*').from('Local')
                 .where({
                     id: data[0].id,
                     datemod: data[0].datelocal
                   })
                 .then( data =>{ 
                      if(data[0] === undefined)
                        cases.push(local);
                      else
                          cases.push(data[0]);
                      
                          cases[cases.length - 1].type = 'Local';
 
                    if(cases.length == 5)
                      res.json(cases);
                  }) 
                 .catch(err => res.status(400).json('unable to login')) 
                }  
             }
             */ 