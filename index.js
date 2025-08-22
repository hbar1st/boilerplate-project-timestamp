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

/**
 * 
 * A request to /api/:date? with a valid date should return a JSON object 
 * with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number)
 */
app.get("/api/:date", (req, res) => {
  const { date } = req.params;
  const now = new Date().toString();
  let dateResponse = {
    unix: now,
    utc: now,
  };
  if (date !== "") {
    const dateObj = new Date(date);
    if (isNaN(dateObj)) {
      dateResponse = { error: "Invalid Date" };
    } else {
      dateResponse = { unix: "good Date", utc: "good time" };
    }
    
  }
  res.json(dateResponse);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
