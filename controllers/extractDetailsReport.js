const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const handleDetails = (req, res, db) => {
    const {id, monYear, range} = req.body;

    const dates = [];
    const month = monYear.split(' ')[0];
    var year = monYear.split(' ')[1];
    var index = months.indexOf(month);

    if(range === 'Last 3 Months Data'){
        dates.push(monYear);
        index--;
        for(var i=0; i<2; i++){
            if(index < 0){
              index = 11;
              year = year - 1;
            }
         dates.push(months[index] + ' ' + year);
         index--;
         }
    }

    else if(range === 'Last 6 Months Data'){
        dates.push(monYear);
        index--;
        for(var i=0; i<5; i++){
            if(index < 0){
              index = 11;
              year = year - 1;
            }
         dates.push(months[index] + ' ' + year);
         index--;
         }
    }

    else if(range === 'Last 9 Months Data') {
        dates.push(monYear);
        index--;
        for(var i=0; i<8; i++){
            if(index < 0){
              index = 11;
              year = year - 1;
            }
         dates.push(months[index] + ' ' + year);
         index--;
         }
    }

    else {
      dates.push(monYear);
      index--;
      for(var i=0; i<11; i++){
          if(index < 0){
            index = 11;
            year = year - 1;
          }
       dates.push(months[index] + ' ' + year);
       index--;
       }
    }

    const report = []

    var answer = function(date){
      db.select('*').from('ProgressReport')
      .where({
            id: id,
            monYear: date
       })
       .then(data => {
          if(data[0] === undefined){
              report.push({
                id: id, POarrested: 0, arm: 0, caseincourt: 0, cleaniness: 0, commercial: 0, compDisp: 0, datemod: " ",
                excise: 0, feedback: 0, gambling: 0, handling: 0, heniusCrime: 0, ndps: 0, propCrime: 0, 
                propDisp: 0, score: 0, untraceInCourt: 0, monYear: date
              });          
             }
            else  
               report.push(data[0]);

          if(report.length === dates.length)
              res.json({report})
       })
       .catch(err => res.status(400).json('error')) 
        
    }

    for(var i=0; i<dates.length; i++){
        answer(dates[i]);
      }
 }

module.exports = {
    handleDetails: handleDetails
  };

    
 
