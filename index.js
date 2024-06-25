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

let date;
const isInvalidDate = date => date.toUTCString() === 'Invalid Date'
// your first API endpoint... 

app.get('/api/:date', (req, res) => {
  date = new Date(req.params.date)
  let input = req.params.date

  if(isInvalidDate(date)) {
    date = new Date(+input)
  }

  if(isInvalidDate(date)) {
    res.json({error: 'Invalid Date'})
  }

  res.json({unix: date.getTime(), utc: date.toUTCString()})
})

// app.get('/api/:date', (req, res) => {
//   let input = req.params.date
//   date = new Date(req.params.date)

//   if(input.includes('-')) {
//     date = new Date(input);
//   }
//   else {
//     date = new Date(+input);
//   }
//   if(!date.getTime() || !date.toUTCString()) {
//     res.json({error: 'Invalid Date'})
//   }
//     res.json({unix: date.getTime(), utc: date.toUTCString()})
// })

app.get('/api', (req, res) => {
  date = new Date()
  res.json({unix: date.getTime(), utc: date.toUTCString()})
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

