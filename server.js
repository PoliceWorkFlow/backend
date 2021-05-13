const express = require('express');
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const schedule = require('node-schedule');

app.use(express.json());

// app.use(cors({
//   origin: 'http://localhost:3001',
// }));


app.use(cors({
  origin: 'http://103.118.50.49',
}));


const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '1234',
    database: 'postgres',
  }
});

const signin = require('./controllers/signin');
const forgot = require('./controllers/forgot');
const checkLink = require('./controllers/checkLink');
const Update = require('./controllers/update');
const check = require('./controllers/CheckDate');
const challan = require('./controllers/challan');
const recovery = require('./controllers/recovery');
const investigation = require('./controllers/investigation');
const progress = require('./controllers/ProgressReport');
const extractDetails = require('./controllers/extractDetails');
const extractDetailsPS = require('./controllers/extractDetailsPS');
const extractDetailsReport = require('./controllers/extractDetailsReport');
const extractReport = require('./controllers/extractReportDetails');
const notification = require('./controllers/sendNotification');
const notice = require('./controllers/sendNotice');
const monthly = require('./controllers/sendMonthly');
const compare = require('./controllers/compare');
const profile = require('./controllers/profile');
const verifyToken = require("./auth/verifyToken");

//db.select().from('Users').then(data => { console.log(data)})

const job = schedule.scheduleJob('00 12 26 * *', function(){
     monthly.handleMonthly(db);
});

app.get('/api', (req,res) => { res.send('it is working') });
app.listen(3000,'localhost',()=> { console.log('app is running on port 3000') });

app.post('/api/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)}) 

app.post('/api/forgot', (req, res) => { forgot.handleForgot(req, res, db) }) 

app.post('/api/profile', verifyToken, (req, res) => { profile.handleProfile(req, res, db, bcrypt) }) 

app.post('/api/checkLink', (req, res) => { checkLink.handleForgot(req, res, db) }) 

app.post('/api/update_password', (req, res) => { Update.handleUpdate(req, res, db, bcrypt) }) 

app.post('/api/addchallandetails', verifyToken, (req, res) => { challan.handleChallan(req, res, db) })

app.post('/api/checkMonthYear', verifyToken, (req, res) => { check.handleCheckDate(req, res, db) })

app.post('/api/addrecoverydetails', verifyToken, (req, res) => { recovery.handleRecovery(req, res, db)})

app.post('/api/addinvestigationdetails', verifyToken, (req, res) => { investigation.handleInv(req, res, db) })

app.post('/api/addProgressReport', verifyToken, (req,res) => {  progress.handleReport(req, res, db) })

app.post('/api/extractDetails', verifyToken, (req,res) => {  extractDetails.handleDetails(req, res, db) })

app.post('/api/extractDetailsPS', verifyToken, (req,res) => {  extractDetailsPS.handleDetails(req, res, db) })

app.post('/api/extractDetailsProgressReport', verifyToken, (req,res) => { extractDetailsReport.handleDetails(req, res, db) })

app.post('/api/extractReportDetails', verifyToken, (req,res) => {  extractReport.handleDetails(req, res, db) })

app.post('/api/sendNotification', verifyToken, (req,res) => {  notification.handleDetails(req, res, db) })

app.post('/api/notice', verifyToken, (req,res) => { notice.handleDetails(req, res, db) })

app.post('/api/compare', verifyToken, (req,res) => {compare.handleDetails(req, res, db) })


/*
/ --> res = this is working
/ signin --> POST = success/fail
/ PSmonthlyreport --> POST = add monthly report of each PS
/ PSwisereport --> POST = add progress report of each PS.


*/
