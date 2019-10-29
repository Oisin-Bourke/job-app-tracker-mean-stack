const express = require('express');
const app = express();
const path = require('path')

// Serve static files
app.use(express.static(__dirname + '/dist/angular-frontend'));

// default Heroku port
app.listen(process.env.PORT || 5000);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/angular-frontend/index.html'));
});

console.log('Console listening...');
