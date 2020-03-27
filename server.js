const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const port = 3000
const fs = require('fs');
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('pages'))

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/login.html'));
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/game/main.html'));
});

app.post('/login', function (req, res) {
    fs.readFile(path.join(__dirname + '/data/accounts.json'), (err, data) => {
        if (err) throw err;
        const accounts = JSON.parse(data).accounts;

        console.log(accounts[0]);
        if (req.body.email == accounts[0].email) {
            console.log("Signed In!");
            res.redirect('/')
        } else {
            res.status(403);
            res.send("Wrong email");
        }
    });
});

app.listen(port, () => console.log(`Example app listening`))