const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => { res.send('it is working') });
app.listen(3000, ()=> { console.log('app is running on port 3000') });

const db = [
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

app.post('/signin', (req, res) => {
	const {username, password} = req.body;
    var flag = false;
    for(let i=0; i<11; i++){
        if(db[i].username === username && db[i].password === password){
          flag = true;  
          res.json(i+1);
         }
    }
    if(!flag)
       res.status(400).json('unable to login');

   /* db.select('username','password').from('users')
      .where('username', '=', username)
      .then(data => {
          if(data[0].password === password)
          	 res.json('success')
          else
          	res.status(400).json('unable to login')
      })
      .catch(err => res.status(400).json('unable to login'))*/
}) 

app.post('/addchallandetails', (req, res) => {
      const {policeStation, challan} = req.body;
      console.log('Police Station', policeStation);
      console.log(challan);
      res.json('success');
})

app.post('/addrecoverydetails', (req, res) => {
    const {policeStation, recovery} = req.body;
    console.log('Police Station', policeStation);
    console.log(recovery);
    res.json('success');
})

app.post('/addinvestigationdetails', (req, res) => {
    const {policeStation, ipc, local} = req.body;
    console.log('Police Station', policeStation);
    console.log(ipc);
    console.log(local);
    res.json('success');
})

app.post('/addProgressReport', (req,res) => {
    const{policeStation, report} = req.body;
    console.log('Police Station', policeStation);
    var score = (report.casesubmitted/10) + (2*report.henious) + (report.propertyCrime/10) + (report.disposal_compl/10) + (report.propertyDisp/10) + (2*report.POarrested) + (report.untrace_in_court/5) + (1*report.feedback) + (1*report.cleaniness) + (1*report.handling) + ((2*report.ndps)/5) + (1*report.arm) + (2*report.commercial) + (report.excise/5) + (report.gambling/5);
    console.log("Score: ", score);
    res.json('success');
})

/*
/ --> res = this is working
/ signin --> POST = success/fail
/ PSmonthlyreport --> POST = add monthly report of each PS
/ PSwisereport --> POST = add progress report of each PS.
*/