var http = require('http');//load http
var express = require('express');//load express

var app = express();

app.set('port', process.env.PORT || 8080);//port used 8080 as per Freecode camp

function timeConverter(UNIX_timestamp){
var a = new Date(UNIX_timestamp);
		 console.log(a);
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var year = a.getFullYear();
var month = months[a.getMonth()];
var date = a.getDate();
var time = date +"th"+ ' ' + month + ', ' + year;//used for different time 
if(date==21){
return date + "st" + " "   + month + ', ' + year;  
}
else if(date==22){
 return date + "nd" + " "   + month + ', ' + year;    
}
else if(date==23){
    return date + "rd" + " "   + month + ', ' + year; 
}
else if(date===1){
	return	 date + "st" + " " +month +', ' + year;
}
else
return time;
}

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something Not right!')//output in case of error.
});

app.get('/:date', function(req, res) {
	 	var formattedDate = '';
	 		if(!isNaN(req.params.date)) { // check if user put in a number (Unix time)

			 formattedDate = timeConverter(Number(req.params.date) * 1000); // format unix time to text
	
		  	 retObj = { "unix" 	: Number(req.params.date),
		  	 				"natural": formattedDate
		  	 				}
				res.end(JSON.stringify(retObj));
			} 		
        var dateValue = req.params.date; // get parameter passed
        dateValue = dateValue.match(/[a-zA-Z]+|[0-9]+/g).join(" "); // convert to array
		  dateValue = Date.parse(dateValue); // convert to UNIX time
		  var retObj = {};
		  if (!isNaN(dateValue)) {
		  		formattedDate = timeConverter(dateValue); // format unix time to text
		  	 retObj = { "unix" 	: dateValue / 1000,
		  	 				"natural": formattedDate
		  	 				}
		  } else {
		  		res.end("Dude Enter some valid date ");  // warn user if entered date is invalid .
		  	}
        res.end(JSON.stringify(retObj));  // Used to Stringify object
});

app.get('/', function(req, res) {

	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hey!! - to get the timestamp put a valid date after url eg after(.io in https://knrt-api-project-knrt.c9users.io ) put (/) and enter unix timestamp or just enter date ');
});

app.listen(8080, function(){  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl+C to terminate');//used to pass in terminal.
});