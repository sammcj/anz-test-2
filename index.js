const express = require('express');
const packageJSON = require('./package.json');

const app = express();
const port = 8000;

// Get the current git SHA
// This could be improved by making an environment variable and passing through the CI build or similar
revision = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString().trim()

// Return JSON on GET of /version
app.get('/version', (req, res) => {
  const response = {
    myapplication: [{
      version: packageJSON.version,
      // Disabled as favouring reading the sha from git directly at present
      // expects an environment variable COMMIT_SHA
      // lastcommitsha: process.env.COMMIT_SHA, 
      lastcommitsha: revision,
      description: 'pre-interview technical test',
    }],
  };
  res.json(response);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
