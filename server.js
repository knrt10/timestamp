var http = require('http');
var express = require('express');

var app = express();

app.set('port', process.env.PORT || 8080);

function timeConverter(UNIX_timestamp){
var a = new Date(UNIX_timestamp);
		 console.log(a);
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var year = a.getFullYear();
var month = months[a.getMonth()];
var date = a.getDate();
var time = date +"th"+ ' ' + month + ', ' + year;
if(date==21){
return date + "st" + " "   + month + ', ' + year;  
}
else if(date==22){
 return date + "nd" + " "   + month + ', ' + year;    
}
else if(date==23){
    return date + "rd" + " "   + month + ', ' + year; 
}
else
return time;
}

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something Not right!')
});

app.get('/:date', function(req, res) {
	 	var formattedDate = '';
	 		if(!isNaN(req.params.date)) { // check if user put in a number (unix time)

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
		  		res.end("Dude Enter some valid date ");  // warn user if invalid date
		  	}
        res.end(JSON.stringify(retObj));  // Stringify object
});

app.get('/', function(req, res) {

	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hey!! - to get the timestamp put a valid date after url eg after(.io in https://knrt-api-project-knrt.c9users.io ) put (/) and enter unix timestamp or just enter date ');
});

app.listen(8080, function(){  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate');
});