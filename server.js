var express = require("express")
var strftime = require('strftime')
var filePath = __dirname+'/public';
var unixVal;
var naturalVal;
var dateobj = {
    "unix": unixVal,
    "natural": naturalVal 
}
var app = express();

app.use('/',express.static(filePath));

app.get('/:datePas',function(req,res){
    var linkParams = req.params.datePas;
    if (isNaN(linkParams) == false){
        var mydate = parseInt(linkParams)*1000;
        unixVal = mydate/1000;
    }
    else {
        var mydate = linkParams;
        unixVal = (new Date(mydate).getTime())/1000;
    }
    if (!unixVal){
        naturalVal = null;
    }
    else {
    naturalVal = strftime('%B %d, %Y', new Date(mydate));
    }
    dateobj.unix = unixVal;
    dateobj.natural=naturalVal;
    res.send(dateobj);
})

app.listen(process.env.PORT,process.env.IP);

