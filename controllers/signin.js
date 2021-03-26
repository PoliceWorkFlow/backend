const challan = {overloading: '0', withoutHelmet: '0', drunken: '0', covid19: '0', overspeed: '0', others: '0'};
const recovery = { illict: '0', licit: '0', lahan: '0', ganja: '0', poppy: '0', heroin: '0', opium: '0', charas: '0', tablets: '0', injections: '0', others: '0' };
const ipc = {underInvPend: '0', underInvDisp: '0', cancelledPend: '0', cancelledDisp: '0', underInv1YrPend: '0', underInv1YrDisp: '0', underInv6monPend: '0', underInv6monDisp: '0', underInvo3monPend: '0', underInvo3monDisp: '0', underInvl3monPend: '0', underInvl3monDisp: '0'};
const local = {underInvPend: '0', underInvDisp: '0', cancelledPend: '0', cancelledDisp: '0', underInv1YrPend: '0', underInv1YrDisp: '0', underInv6monPend: '0', underInv6monDisp: '0', underInvo3monPend: '0', underInvo3monDisp: '0', underInvl3monPend: '0', underInvl3monDisp: '0'};

const handleSignin = (req, res, db) => {
    const {username, password} = req.body;
    const cases = [];
 
    db.select('*').from('Users')
       .where('username', '=', username)
       .then(data => {
          //console.log(data[0].id);
           if(data[0].password === password){
              
              if(data[0].id === '11'){ 
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
                       //console.log(data[0]); 
                        cases.push(data[0]); 
                        if(cases.length === 10)
                          res.json(cases);
                        }) 
                      .catch(err => res.status(400).json('unable to login')) 
                     }) 
                  }
               }

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
           else
             res.status(400).json('unable to login')
          })
        .catch(err => res.status(400).json('unable to login'))
}

module.exports = {
    handleSignin: handleSignin
  };