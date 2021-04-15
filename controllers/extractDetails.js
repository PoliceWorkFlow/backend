const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const handleDetails = (req, res, db) => {
    const {monYear} = req.body;
    const monYear1 = months[new Date().getMonth()] + ' ' + new Date().getFullYear();
    //console.log(monYear);
    var id;
    const IPC = [];
    const Local = [];
    const Recovery = [];
    const Challan = [];
    var id2 = 1;
    var id3 = 1;
    var id4 = 1;
    var id5 = 1;

               for(var i = 1; i<11; i++){
                      db.select('*').from('Challan')
                      .where({
                          id: i,
                          monYear: monYear
                        })
                      .then( data => {
                         // console.log(data[0]);
                        if(data[0] === undefined){
                          Challan.push({
                            id: id2, overloading: '0', withoutHelmet: '0', drunken: '0', covid19: '0', overspeed: '0', others: '0', type: 'Not Filled'
                          });          
                         }
                        else  
                           Challan.push(data[0]);

                          id2++;

                        if(Challan.length === 10 && Recovery.length === 10 && IPC.length === 10 && Local.length === 10)
                           res.json({ challan: Challan, recovery: Recovery, ipc: IPC, local: Local});
                        }) 
                      .catch(err => console.log(err)) 
                    }
                   
                for(var i = 1; i<11; i++){
                       
                      db.select('*').from('Recovery')
                      .where({
                          id: i,
                          monYear: monYear
                        })
                      .then( data => {
                        if(data[0] === undefined){
                          Recovery.push({
                            id: id3, illict: '0', licit: '0', lahan: '0', ganja: '0', poppy: '0', heroin: '0', opium: '0', charas: '0', tablets: '0', injections: '0', others: '0', type: 'Not Filled'
                          });
                         }
                        else 
                           Recovery.push(data[0]); 
                        
                          id3++;

                        if(Challan.length === 10 && Recovery.length === 10 && IPC.length === 10 && Local.length === 10)
                           res.json({ challan: Challan, recovery: Recovery, ipc: IPC, local: Local});
                        }) 
                      .catch(err => res.status(400).json('unable to login3')) 
                      }

                 for(var i = 1; i<11; i++){  
                      db.select('*').from('IPC')
                      .where({
                             id: i,
                             monYear: monYear
                        })
                      .then( data => {

                        if(data[0] === undefined){
                          IPC.push({
                            id:id4, underInvPend: '0', underInvDisp: '0', cancelledPend: '0', cancelledDisp: '0', underInv1YrPend: '0', underInv1YrDisp: '0', underInv6monPend: '0', underInv6monDisp: '0', underInvo3monPend: '0', underInvo3monDisp: '0', underInvl3monPend: '0', underInvl3monDisp: '0', type: 'Not Filled'
                          });
                        }
                        else
                          IPC.push(data[0]); 
                        
                          id4++;

                        if( Challan.length === 10 && Recovery.length === 10 && IPC.length === 10 && Local.length === 10)
                          res.json({ challan: Challan, recovery: Recovery, ipc: IPC, local: Local});
                        }) 
                      .catch(err => res.status(400).json('unable to login4'))
                    }

                 for(var i = 1; i<11; i++){
                      db.select('*').from('Local')
                      .where({
                            id: i,
                            monYear: monYear
                        })
                      .then( data => {

                        if(data[0] === undefined){
                          Local.push({
                            id:id5, underInvPend: '0', underInvDisp: '0', cancelledPend: '0', cancelledDisp: '0', underInv1YrPend: '0', underInv1YrDisp: '0', underInv6monPend: '0', underInv6monDisp: '0', underInvo3monPend: '0', underInvo3monDisp: '0', underInvl3monPend: '0', underInvl3monDisp: '0', type: 'Not Filled'
                          });
                         }
                        else 
                          Local.push(data[0]); 
                        
                          id5++;

                        if(Challan.length === 10 && Recovery.length === 10 && IPC.length === 10 && Local.length === 10)
                          res.json({ challan: Challan, recovery: Recovery, ipc: IPC, local: Local});
                        }) 
                        .catch(err => console.log(err));
                     // .catch(err => res.status(400).json('unable to login5')
                  }
               
           }

module.exports = {
    handleDetails: handleDetails
  };

    
 
