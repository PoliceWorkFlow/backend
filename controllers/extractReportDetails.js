const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const handleDetails = (req, res, db) => {
    const {monYear} = req.body;
    const report = [];
    console.log(req.userId);
   
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
            res.json(report);
          }) 
        .catch(err => res.status(400).json('error')) 
    }

    for(var i=1; i<11; i++){
        answer(i);
      }
 }

module.exports = {
    handleDetails: handleDetails
  };

    
 
