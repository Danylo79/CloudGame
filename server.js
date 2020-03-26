const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const port = 3000
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('pages'))

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/pages/login.html'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/pages/game/main.html'));
});

app.post('/login', function(req, res) {
    console.log(req.body);
    res.redirect('/')
});

app.listen(port, () => console.log(`Example app listening`))