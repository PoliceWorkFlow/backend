const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const handleDetails = (req, res, db) => {
    const {monYear} = req.body;

    const dates = [];
    const month = monYear.split(' ')[0];
    var year = monYear.split(' ')[1];
    var index = months.indexOf(month);

    for(var i=0; i<3; i++){
        if(index < 0){
            index = 11;
            year = year - 1;
          }
       dates.push(months[index] + ' ' + year);
       index--;
       }
     
    var id;
    const IPC = [];
    const Local = [];
    const Recovery = [];
    const Challan = [];
    const challanCheck = [];
    const ipcCheck = [];
    const localCheck = [];
    const recoveryCheck = [];
    
    var database = function(i){
          db.select('*').from('Challan')
          .where({
              id: i,
              monYear: monYear
            })
          .then( data => {
            // console.log(data[0]);
            if(data[0] === undefined){
              Challan.push({
                id: i, overloading: '0', withoutHelmet: '0', drunken: '0', covid19: '0', overspeed: '0', others: '0', type: 'Not Filled'
              });          
            }
            else  
              Challan.push(data[0]);

            if(Challan.length === 10 && Recovery.length === 10 && IPC.length === 10 && Local.length === 10 && challanCheck.length === 30 && recoveryCheck.length === 30 && ipcCheck.length === 30 && localCheck.length === 30 )
              res.json({ challan: Challan, recovery: Recovery, ipc: IPC, local: Local, challanCheck: challanCheck, ipcCheck:ipcCheck, localCheck:localCheck, recoveryCheck: recoveryCheck});
            }) 
          .catch(err => console.log(err)) 
          
          db.select('*').from('Recovery')
                      .where({
                          id: i,
                          monYear: monYear
                        })
                      .then( data => {
                        if(data[0] === undefined){
                          Recovery.push({
                            id: i, illict: '0', licit: '0', lahan: '0', ganja: '0', poppy: '0', heroin: '0', opium: '0', charas: '0', tablets: '0', injections: '0', others: '0', type: 'Not Filled'
                          });
                         }
                        else 
                           Recovery.push(data[0]); 
                      
                          if(Challan.length === 10 && Recovery.length === 10 && IPC.length === 10 && Local.length === 10 && challanCheck.length === 30 && recoveryCheck.length === 30 && ipcCheck.length === 30 && localCheck.length === 30 )
                          res.json({ challan: Challan, recovery: Recovery, ipc: IPC, local: Local, challanCheck: challanCheck, ipcCheck:ipcCheck, localCheck:localCheck, recoveryCheck: recoveryCheck});
                        }) 
                      .catch(err => res.status(400).json('unable to login3'))
           
            db.select('*').from('IPC')
                      .where({
                             id: i,
                             monYear: monYear
                        })
                      .then( data => {

                        if(data[0] === undefined){
                          IPC.push({
                            id:i, underInvPend: '0', underInvDisp: '0', cancelledPend: '0', cancelledDisp: '0', underInv1YrPend: '0', underInv1YrDisp: '0', underInv6monPend: '0', underInv6monDisp: '0', underInvo3monPend: '0', underInvo3monDisp: '0', underInvl3monPend: '0', underInvl3monDisp: '0', type: 'Not Filled'
                          });
                        }
                        else
                          IPC.push(data[0]); 

                        if(Challan.length === 10 && Recovery.length === 10 && IPC.length === 10 && Local.length === 10 && challanCheck.length === 30 && recoveryCheck.length === 30 && ipcCheck.length === 30 && localCheck.length === 30 )
                          res.json({ challan: Challan, recovery: Recovery, ipc: IPC, local: Local, challanCheck: challanCheck, ipcCheck:ipcCheck, localCheck:localCheck, recoveryCheck: recoveryCheck});
                        }) 
                      .catch(err => res.status(400).json('unable to login4'))

          db.select('*').from('Local')
                      .where({
                            id: i,
                            monYear: monYear
                        })
                      .then( data => {

                        if(data[0] === undefined){
                          Local.push({
                            id:i, underInvPend: '0', underInvDisp: '0', cancelledPend: '0', cancelledDisp: '0', underInv1YrPend: '0', underInv1YrDisp: '0', underInv6monPend: '0', underInv6monDisp: '0', underInvo3monPend: '0', underInvo3monDisp: '0', underInvl3monPend: '0', underInvl3monDisp: '0', type: 'Not Filled'
                          });
                         }
                        else 
                          Local.push(data[0]); 

                        if(Challan.length === 10 && Recovery.length === 10 && IPC.length === 10 && Local.length === 10 && challanCheck.length === 30 && recoveryCheck.length === 30 && ipcCheck.length === 30 && localCheck.length === 30 )
                          res.json({ challan: Challan, recovery: Recovery, ipc: IPC, local: Local, challanCheck: challanCheck, ipcCheck:ipcCheck, localCheck:localCheck, recoveryCheck: recoveryCheck});
                        }) 
                        .catch(err => console.log(err));
         }
    
    var checkDataChallan = function(i, date){

      db.select('*').from('Challan')
      .where({
          id: i,
          monYear: date
        })
       .then(data => {
        if(data[0] === undefined)
          challanCheck.push({
           id: i, monYear: date, status: 'Not Filled' 
          })
        else
          challanCheck.push({
           id:i, monYear: date, status: data[0].datemod.split(' ')[0]
           })
        if(Challan.length === 10 && Recovery.length === 10 && IPC.length === 10 && Local.length === 10 && challanCheck.length === 30 && recoveryCheck.length === 30 && ipcCheck.length === 30 && localCheck.length === 30 )
           res.json({ challan: Challan, recovery: Recovery, ipc: IPC, local: Local, challanCheck: challanCheck, ipcCheck:ipcCheck, localCheck:localCheck, recoveryCheck: recoveryCheck});
           //console.log(challanCheck); 
        })
        
      /*  db.select('*').from('Challan')
      .where({
          id: i,
          monYear: dates[1]
        })
       .then(data => {
        if(data[0] === undefined){
          challanCheck.push({
           id: i, monYear: dates[1], status: 'Not Filled' 
          }) 
        }
        else
          challanCheck.push({
           id:i, monYear: dates[1], status: 'Filled' 
           })
        })
        
        db.select('*').from('Challan')
                    .where({
                        id: i,
                        monYear: dates[2]
                      })
                     .then(data => {
                      
                      if(data[0] === undefined)
                        challanCheck.push({
                         id: i, monYear: dates[2], status: 'Not Filled' 
                        })
                      else
                        challanCheck.push({
                         id:i, monYear: dates[2], status: 'Filled' 
                         })
                       
                         if(Challan.length === 10 && Recovery.length === 10 && IPC.length === 10 && Local.length === 10 && challanCheck.length === 30 && recoveryCheck.length === 30 && ipcCheck.length === 30 && localCheck.length === 30 )
                           res.json({ challan: Challan, recovery: Recovery, ipc: IPC, local: Local, challanCheck: challanCheck, ipcCheck:ipcCheck, localCheck:localCheck, recoveryCheck: recoveryCheck}); 
                      })
          */
    }

    var checkDataRec = function(i, date){
      db.select('*').from('Recovery')
      .where({
          id: i,
          monYear: date
        })
       .then(data => {
        if(data[0] === undefined)
          recoveryCheck.push({
           id: i, monYear: date, status: 'Not Filled' 
          })
        else
           recoveryCheck.push({
           id:i, monYear: date, status: data[0].datemod.split(' ')[0]
           })

          if(Challan.length === 10 && Recovery.length === 10 && IPC.length === 10 && Local.length === 10 && challanCheck.length === 30 && recoveryCheck.length === 30 && ipcCheck.length === 30 && localCheck.length === 30 )
           res.json({ challan: Challan, recovery: Recovery, ipc: IPC, local: Local, challanCheck: challanCheck, ipcCheck:ipcCheck, localCheck:localCheck, recoveryCheck: recoveryCheck});  
        })
        
       /* db.select('*').from('Recovery')
        .where({
          id: i,
          monYear: dates[1]
         })
        .then(data => {
        
        if(data[0] === undefined){
          recoveryCheck.push({
           id: i, monYear: dates[1], status: 'Not Filled' 
          }) 
        }
        else
          recoveryCheck.push({
           id:i, monYear: dates[1], status: 'Filled' 
           })
          
           //console.log(recoveryCheck); 
        })

        db.select('*').from('Recovery')
      .where({
          id: i,
          monYear: dates[2]
        })
       .then(data => {
        
        if(data[0] === undefined)
          recoveryCheck.push({
           id: i, monYear: dates[2], status: 'Not Filled' 
          })
        else
          recoveryCheck.push({
           id:i, monYear: dates[2], status: 'Filled' 
           })

           if(Challan.length === 10 && Recovery.length === 10 && IPC.length === 10 && Local.length === 10 && challanCheck.length === 30 && recoveryCheck.length === 30 && ipcCheck.length === 30 && localCheck.length === 30 )
           res.json({ challan: Challan, recovery: Recovery, ipc: IPC, local: Local, challanCheck: challanCheck, ipcCheck:ipcCheck, localCheck:localCheck, recoveryCheck: recoveryCheck});
        })
        */
    }

    var checkDataIPC = function(i, date){
      db.select('*').from('IPC')
      .where({
          id: i,
          monYear: date
        })
       .then(data => {
        if(data[0] === undefined)
          ipcCheck.push({
           id: i, monYear: date, status: 'Not Filled' 
          })
        else
           ipcCheck.push({
           id:i, monYear: date, status: data[0].datemod.split(' ')[0] 
           })

        if(Challan.length === 10 && Recovery.length === 10 && IPC.length === 10 && Local.length === 10 && challanCheck.length === 30 && recoveryCheck.length === 30 && ipcCheck.length === 30 && localCheck.length === 30 )
           res.json({ challan: Challan, recovery: Recovery, ipc: IPC, local: Local, challanCheck: challanCheck, ipcCheck:ipcCheck, localCheck:localCheck, recoveryCheck: recoveryCheck});
           //console.log(challanCheck); 
        })
        
     /*   db.select('*').from('IPC')
      .where({
          id: i,
          monYear: dates[1]
        })
       .then(data => {
        
        if(data[0] === undefined){
          ipcCheck.push({
           id: i, monYear: dates[1], status: 'Not Filled' 
          }) 
        }
        else
          ipcCheck.push({
           id:i, monYear: dates[1], status: 'Filled' 
           })
          
        })

        db.select('*').from('IPC')
      .where({
          id: i,
          monYear: dates[2]
        })
       .then(data => {

        if(data[0] === undefined)
          ipcCheck.push({
           id: i, monYear: dates[2], status: 'Not Filled' 
          })
        else
          ipcCheck.push({
           id:i, monYear: dates[2], status: 'Filled' 
           })
         
          if(Challan.length === 10 && Recovery.length === 10 && IPC.length === 10 && Local.length === 10 && challanCheck.length === 30 && recoveryCheck.length === 30 && ipcCheck.length === 30 && localCheck.length === 30 )
           res.json({ challan: Challan, recovery: Recovery, ipc: IPC, local: Local, challanCheck: challanCheck, ipcCheck:ipcCheck, localCheck:localCheck, recoveryCheck: recoveryCheck}); 
        })*/
    }

    var checkDataLocal = function(i, date){
      db.select('*').from('Local')
      .where({
          id: i,
          monYear: date
        })
       .then(data => {
      
        if(data[0] === undefined)
          localCheck.push({
           id: i, monYear: date, status: 'Not Filled' 
          })
        else
           localCheck.push({
           id:i, monYear: date, status: data[0].datemod.split(' ')[0]
           })

         if(Challan.length === 10 && Recovery.length === 10 && IPC.length === 10 && Local.length === 10 && challanCheck.length === 30 && recoveryCheck.length === 30 && ipcCheck.length === 30 && localCheck.length === 30 )
           res.json({ challan: Challan, recovery: Recovery, ipc: IPC, local: Local, challanCheck: challanCheck, ipcCheck:ipcCheck, localCheck:localCheck, recoveryCheck: recoveryCheck});
           //console.log(challanCheck); 
          if(Challan.length === 10 && Recovery.length === 10 && IPC.length === 10 && Local.length === 10 && challanCheck.length === 30 && recoveryCheck.length === 30 && ipcCheck.length === 30 && localCheck.length === 30 )
           res.json({ challan: Challan, recovery: Recovery, ipc: IPC, local: Local, challanCheck: challanCheck, ipcCheck:ipcCheck, localCheck:localCheck, recoveryCheck: recoveryCheck});   
        })
        
     /*   db.select('*').from('Local')
      .where({
          id: i,
          monYear: dates[1]
        })
       .then(data => {
        if(data[0] === undefined){
          localCheck.push({
           id: i, monYear: dates[1], status: 'Not Filled' 
          }) 
        }
        else
          localCheck.push({
           id:i, monYear: dates[1], status: 'Filled' 
           })
          
         if(Challan.length === 10 && Recovery.length === 10 && IPC.length === 10 && Local.length === 10 && challanCheck.length === 30 && recoveryCheck.length === 30 && ipcCheck.length === 30 && localCheck.length === 30 )
           res.json({ challan: Challan, recovery: Recovery, ipc: IPC, local: Local, challanCheck: challanCheck, ipcCheck:ipcCheck, localCheck:localCheck, recoveryCheck: recoveryCheck}); 
        })

        db.select('*').from('Local')
      .where({
          id: i,
          monYear: dates[2]
        })
       .then(data => {
      
        if(data[0] === undefined)
          localCheck.push({
           id: i, monYear: dates[2], status: 'Not Filled' 
          })
        else
          localCheck.push({
           id:i, monYear: dates[2], status: 'Filled' 
           })
         if(Challan.length === 10 && Recovery.length === 10 && IPC.length === 10 && Local.length === 10 && challanCheck.length === 30 && recoveryCheck.length === 30 && ipcCheck.length === 30 && localCheck.length === 30 )
           res.json({ challan: Challan, recovery: Recovery, ipc: IPC, local: Local, challanCheck: challanCheck, ipcCheck:ipcCheck, localCheck:localCheck, recoveryCheck: recoveryCheck});
        })*/
    }
      
     for(var i = 1; i<11; i++){
              database(i);
        }

      for(var i=1; i<11; i++){ 
        for(var j=0; j<3; j++){  
          checkDataChallan(i, dates[j]);
          checkDataRec(i, dates[j]);
          checkDataIPC(i, dates[j]);
          checkDataLocal(i, dates[j]);
        }
      }
           
 }

module.exports = {
    handleDetails: handleDetails
  };

    
 
