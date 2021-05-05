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

const handleReport = (req, res, db) => {
    const{policeStation, report, type} = req.body;
   
    var score = (report.casesubmitted/10) + (2*report.henious) + (report.propertyCrime/10) + (report.disposal_compl/10) + (report.propertyDisp/10) + (2*report.POarrested) + (report.untrace_in_court/5) + (1*report.feedback) + (1*report.cleaniness) + (1*report.handling) + ((2*report.ndps)/5) + (1*report.arm) + (2*report.commercial) + (report.excise/5) + (report.gambling/5);
    score = score.toFixed(2);
    console.log("Score: ", score);

    if(type === 'update'){
        db('ProgressReport')
        .returning('*')
        .where({id: policeStation, monYear: report.monYear})
        .update({
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
            datemod: getDateTime(),
            monYear: report.monYear 
        })
        .then(data => {
            res.json(data[0]);
        }) 
        .catch(err => res.status(400).json('Error in adding details'))
    }
    
    else{
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
            datemod: getDateTime(),
            monYear: report.monYear 
        })
        .then(data => {
            res.json(data[0]);
        }) 
        //.catch(err => console.log(err))
        .catch(err => res.status(400).json('Error in adding details'))
    }
}

module.exports = {
    handleReport: handleReport
};