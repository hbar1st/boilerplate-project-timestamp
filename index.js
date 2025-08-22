// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api", (req, res) => {
  const now = new Date();
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  let dateResponse = {
    unix: now.getTime(),
    utc: now.toUTCString()
  };
  res.json(dateResponse);
});

/**
* 
* A request to /api/:date? with a valid date should return a JSON object 
* with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number)
*/
app.get("/api/:date?", (req, res) => {
  const { date } = req.params;
  let dateResponse = {};
  console.log("date is: ", date);
  const dateObj = new Date(date * 1); //coerce to number?
  
  console.log("dateObj is: ", dateObj);
  if (Number.isNaN(dateObj.valueOf())) {
    console.log("dateObj is not a number result: ",dateObj.valueOf());
    dateResponse = { error: "Invalid Date" };
  } else {
    dateResponse = { unix: dateObj.getTime(), utc: dateObj.toUTCString() };
  }
  
  res.json(dateResponse);
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
