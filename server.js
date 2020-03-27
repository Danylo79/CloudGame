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
        let currentaccount = null;

        for (let i = 0; i < accounts.length; i++) {
            if (req.body.email == accounts[i].email) {
                if (req.body.password == accounts[i].password) {
                    console.log("Signed In!");
                    res.redirect('/')
                    currentaccount = accounts[i];
                    console.log(currentaccount);
                } else {
                    res.status(403);
                    res.send("Wrong password");
                }
                break;
            }
        }
        if (currentaccount == null) {
            res.status(403);
            res.send("Wrong email");
        }

    });
});

app.listen(port, () => console.log(`Example app listening`))