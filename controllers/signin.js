const jwt = require("jsonwebtoken");
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const handleSignin = (req, res, db, bcrypt) => {
    const {username, password} = req.body;
    var id;
    const report = [];
    const dates = [];
    const IPC = [];
    const Local = [];
    const Challan = [];

    var monYear = months[new Date().getMonth()] + ' ' + new Date().getFullYear();
    var year = monYear.split(' ')[1];
    var index = new Date().getMonth();

    if(index === 0)
       year = year - 1;
    else
      index = index - 1;

    monYear = months[index] + ' ' + year;
  //  console.log(monYear)

    var answer = function(ind, token){

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
            res.json({ id:id, report: report, token:token});
          }) 
        .catch(err => res.status(400).json('unable to login')) 
    }

    db.select('*').from('Users')
       .where('username', '=', username)
       .then(data => {
           const isValid = bcrypt.compareSync(password, data[0].password.trim());
  
           if(isValid){
              id = data[0].id;
              
              const payload = {
                id: data[0].id
               };

              // Sign token
              jwt.sign( payload, "secret",
                {expiresIn: 31556926},
                (err, token) => {
                  token = token;
          
                  if(data[0].id === '11'){
                    for(var i = 1; i<11; i++)
                      answer(i, token);
                   }
                 else{
                   res.json({id: id, token: token})
                  }
                })
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
var answer2 = function(date, id){
      db.select('*').from('Challan')
      .where({
            id: id,
            monYear: date
       })
       .then(data => {
          if(data[0] === undefined){
              Challan.push({
                id: id, overloading: '0', withoutHelmet: '0', drunken: '0', covid19: '0', overspeed: '0', others: '0', monYear: date
              });          
             }
            else  
               Challan.push(data[0]);

          if(Challan.length === dates.length && IPC.length === dates.length && Local.length === dates.length)
              res.json({id:id, challan: Challan, ipc: IPC, local: Local})
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
              res.json({id:id, challan: Challan, ipc: IPC, local: Local})   
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
                res.json({ id:id,challan: Challan, ipc: IPC, local: Local})  
         })
         //.catch(err => console.log(err))
         .catch(err => res.status(400).json('error'))  
    }

*/