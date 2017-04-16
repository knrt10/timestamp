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
var time = month + ' ' + date + ', ' + year;
return time;
}

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
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
		  		res.end("Not a valid date");  // warn user if invalid date
		  	}
        res.end(JSON.stringify(retObj));  // Stringify object
});

app.get('/', function(req, res) {

	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hi!! - to get the timestamp put a date as the 1st query string argument');
});

app.listen(8080, function(){  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate');
});