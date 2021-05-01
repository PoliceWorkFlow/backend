const express = require('express');
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcrypt');
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

const signin = require('./controllers/signin');
const forgot = require('./controllers/forgot');
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

//db.select().from('Users').then(data => { console.log(data)})

app.get('/', (req,res) => { res.send('it is working') });
app.listen(3000, ()=> { console.log('app is running on port 3000') });

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)}) 

app.post('/forgot', (req, res) => { forgot.handleForgot(req, res, db) }) 

app.post('/update_password', (req, res) => { Update.handleUpdate(req, res, db, bcrypt) }) 

app.post('/addchallandetails', (req, res) => { challan.handleChallan(req, res, db) })

app.post('/checkMonthYear', (req, res) => { check.handleCheckDate(req, res, db) })

app.post('/addrecoverydetails', (req, res) => { recovery.handleRecovery(req, res, db)})

app.post('/addinvestigationdetails', (req, res) => { investigation.handleInv(req, res, db) })

app.post('/addProgressReport', (req,res) => {  progress.handleReport(req, res, db) })

app.post('/extractDetails', (req,res) => {  extractDetails.handleDetails(req, res, db) })

app.post('/extractDetailsPS', (req,res) => {  extractDetailsPS.handleDetails(req, res, db) })

app.post('/extractDetailsProgressReport', (req,res) => {  extractDetailsReport.handleDetails(req, res, db) })

app.post('/extractReportDetails', (req,res) => {  extractReport.handleDetails(req, res, db) })

app.post('/sendNotification', (req,res) => {  notification.handleDetails(req, res, db) })


/*
/ --> res = this is working
/ signin --> POST = success/fail
/ PSmonthlyreport --> POST = add monthly report of each PS
/ PSwisereport --> POST = add progress report of each PS.


*/