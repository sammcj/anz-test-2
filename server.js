const express = require("express")
const packageJSON = require('./package.json');

const app = express()

// Get the current git SHA
revision = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString().trim()

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