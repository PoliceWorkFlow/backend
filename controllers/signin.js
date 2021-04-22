const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const handleSignin = (req, res, db) => {
    const {username, password} = req.body;
    var id;
    const report = [];

    var monYear = months[new Date().getMonth()] + ' ' + new Date().getFullYear();

    var answer = function(ind){

        db.select('*').from('ProgressReport')
        .where({
            id: ind,
            monYear: monYear
          })
        .then( data => {
          if(data[0] === undefined){
            report.push({
              id: ind, POarrested: 0, arm: 0, caseincourt: 0, cleaniness: 0, commercial: 0, compDisp: 0, datemod: " ",
              excise: 0, feedback: 0, gambling: 0, handling: 0, heniusCrime: 0, monYear: monYear, ndps: 0, propCrime: 0, 
              propDisp: 0, score: 0, untraceInCourt: 0
            })
          }
          else
            report.push(data[0]); 

          if(report.length === 10)
            res.json({ id:id, report: report});
          }) 
        .catch(err => res.status(400).json('unable to login')) 
    }
 
    db.select('*').from('Users')
       .where('username', '=', username)
       .then(data => {
           if(data[0].password === password){
                id = data[0].id;
                for(var i = 1; i<11; i++)
                    answer(i);
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
                    } */
    
  