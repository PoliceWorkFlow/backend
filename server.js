const express = require('express');
const knex = require('knex');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '1234',
    database: 'postgres',
  }
});

//db.select().from('Users').then(data => { console.log(data)})

app.get('/', (req,res) => { res.send('it is working') });
app.listen(3000, ()=> { console.log('app is running on port 3000') });

/*
const db2 = [
    {username : 'ps1', password: 'ps1'},
    {username : 'ps2', password: 'ps2'},
    {username : 'ps3', password: 'ps3'},
    {username : 'ps4', password: 'ps4'},
    {username : 'ps5', password: 'ps5'},
    {username : 'ps6', password: 'ps6'},
    {username : 'ps7', password: 'ps7'},
    {username : 'ps8', password: 'ps8'},
    {username : 'ps9', password: 'ps9'},
    {username : 'ps10', password: 'ps10'},
    {username : 'ssp', password: 'ssp'},
]
*/

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

app.post('/signin', (req, res) => {
	const {username, password} = req.body;
   const cases = [];
    
    var flag = 0;

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
                  cases.push(data[0]);
                   //console.log(data[0]); 
                   if(data[0]!==undefined)
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
                    cases.push(data[0]);

                    if(data[0]!==undefined)
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
                   cases.push(data[0]);

                   if(data[0]!==undefined)
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
                   cases.push(data[0]);

                   if(data[0]!==undefined)
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
        //.catch(err => console.log(err));
    .catch(err => res.status(400).json('unable to login'))
}) 

app.post('/addchallandetails', (req, res) => {
      const {policeStation, challan} = req.body;
     // console.log('Police Station', policeStation);
     // console.log(challan);
      
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
            datemod: getDateTime()
        })
        .then(user => {
            res.json('success');
        })
        //.catch(err => console.log(err))
        .catch(err => res.status(400).json('Error in adding details'))
})

app.post('/addrecoverydetails', (req, res) => {
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

})

app.post('/addinvestigationdetails', (req, res) => {
    const {policeStation, ipc, local} = req.body;
   // console.log('Police Station', policeStation);
    var flag = false;

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
        datemod: getDateTime()
    })
    .then(user => {
       flag = true;
      })
    //.catch(err => console.log(err))
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
        datemod: getDateTime()
      })
       .then(user => {
           if(flag)
            res.json('success');
        })
        .catch(err => res.status(400).json('Error in adding details2')) 
        
    })

app.post('/addProgressReport', (req,res) => {
    const{policeStation, report} = req.body;
   
    var score = (report.casesubmitted/10) + (2*report.henious) + (report.propertyCrime/10) + (report.disposal_compl/10) + (report.propertyDisp/10) + (2*report.POarrested) + (report.untrace_in_court/5) + (1*report.feedback) + (1*report.cleaniness) + (1*report.handling) + ((2*report.ndps)/5) + (1*report.arm) + (2*report.commercial) + (report.excise/5) + (report.gambling/5);
    console.log("Score: ", score);
    
    db('ProgressReport')
    .returning('*')
    .insert({
        id: policeStation ,
        caseincourt: report.casesubmitted,
        propDisp: report.propertyDisp,
        heniusCrime: report.henious,
        POarrested: report.POarrested,
        propCrime: report.propertyCrime,
        untraceInCourt: report.untrace_in_court,
        compDisp: report.disposal_compl,
        cleaniness: report.cleaniness,
        feedback: report.feedback,
        handling: report.handling,
        ndps: report.ndps,
        commercial: report.commercial,
        arm: report.arm,
        excise: report.excise,
        gambling: report.gambling,
        score: score,
        datemod: getDateTime() 
    })
    .then(user => {
        res.json('success');
    }) 
    //.catch(err => res.status(400).json('Error in adding details'))
    .catch(err => console.log(err))
})

/*
/ --> res = this is working
/ signin --> POST = success/fail
/ PSmonthlyreport --> POST = add monthly report of each PS
/ PSwisereport --> POST = add progress report of each PS.
*/