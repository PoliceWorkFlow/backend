//const police_station = ['Nangal', 'City Morinda', 'Sri Anandpur Sahib', 'City Rupnagar', 'Kiratpur Sahib', 'Sri Chamkaur Sahib', 'Sadar Rupnagar', 'Sadar Morinda', 'Nurpurbedi', 'Singh Bhagwantpur'];
const police_station = ['PS1','PS2','PS3','PS4','PS5','PS6','PS7','PS8','PS9','PS10'];
const handleDetails = (req, res, db) => {
    const { ps1, ps2, date } = req.body;
    const index1 = police_station.indexOf(ps1) + 1;
    const index2 = police_station.indexOf(ps2) + 1;
 
    const report1 = [];
    const report2 = [];

    db.select('*').from('ProgressReport')
        .where({
            id: index1,
            monYear: date
        })
        .then(data => {
            if (data[0] === undefined) {
                report1.push({
                    id: index1, POarrested: 0, arm: 0, caseincourt: 0, cleaniness: 0, commercial: 0, compDisp: 0, datemod: " ",
                    excise: 0, feedback: 0, gambling: 0, handling: 0, heniusCrime: 0, ndps: 0, propCrime: 0,
                    propDisp: 0, score: 0, untraceInCourt: 0, monYear: date
                });
            }
            else
                report1.push(data[0]);
            if (report1.length === 1 && report2.length === 1)
                res.json({ report1: report1, report2: report2 });
        })
        .catch(err => console.log(err))

    db.select('*').from('ProgressReport')
        .where({
            id: index2,
            monYear: date
        })
        .then(data => {
            if (data[0] === undefined) {
                report2.push({
                    id: index2, POarrested: 0, arm: 0, caseincourt: 0, cleaniness: 0, commercial: 0, compDisp: 0, datemod: " ",
                    excise: 0, feedback: 0, gambling: 0, handling: 0, heniusCrime: 0, ndps: 0, propCrime: 0,
                    propDisp: 0, score: 0, untraceInCourt: 0, monYear: date
                });
            }
            else
                report2.push(data[0]);
            if (report1.length === 1 && report2.length === 1)
                res.json({ report1: report1, report2: report2 });
        })
        .catch(err => console.log(err))

}

module.exports = {
    handleDetails: handleDetails
};



