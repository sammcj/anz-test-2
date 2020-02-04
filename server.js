const express = require("express")
const packageJSON = require('./package.json');

const app = express()
var fs = require('fs');

// Get the current git SHA
revision = fs.readFileSync('git-rev', 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);
  });

// Return JSON on GET of /version
app.get('/version', (req, res) => {
  const response = {
    myapplication: [{
      version: packageJSON.version,
      lastcommitsha: revision,
      description: 'pre-interview technical test',
    }],
  };
  res.json(response);
});

module.exports = app