const express = require('express')
const cookieSession = require('cookie-session')
const path = require('path')
const bodyParser = require('body-parser');
const port = 3000
const fs = require('fs');
const app = express()

app.set('trust proxy', 1)

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('pages'))
app.use(cookieSession({
    name: 'session',
    secret: '1f232b3eqybfcmd123rythgfbdnvs',
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: false
}));

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/login.html'));
});
app.get('/extras', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/extras/extras.html'));
});
app.get('/forum', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/extras/mainforum.html'));
});
app.get('/wiki', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/extras/mainwiki.html'));
});
app.get('/wiki/items', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/extras/wikiitems.html'));
});
app.get('/wiki/gamemechanics', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/extras/wikigamemechanics.html'));
});
app.get('/wiki/authors', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/extras/wikiauthors.html'));
});
app.get('/wiki/browse/items', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/extras/browseitems.html'));
});
app.get('/wiki/browse/skills', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/extras/browseskills.html'));
});
app.get('/wiki/browse/enemys', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/extras/browseenemys.html'));
});
app.get('/wiki/items/talismans', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/extras/talismans.html'));
});
app.get('/wiki/items/armors', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/extras/armors.html'));
});
app.get('/wiki/items/weapons', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/extras/weapons.html'));
});
app.get('/wiki/items/talismans/bonetalisman', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/extras/bonetalisman.html'));
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/game/main.html'));
});

app.get('/nav', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/nav.html'));
});
app.get('/account', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/account.html'));
});
app.get('/play', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/game/play.html'));
});

app.get('/login/result', function (req, res) {
    //console.log("user:", req.session.user);
    res.setHeader('Content-Type', 'application/json');
    const user = req.session.user;
    const payload = typeof (user) == "undefined" || user == null ? {} : { id: user.id, name: user.name, email: user.email };
    res.end(JSON.stringify(payload, null, 3));
});
app.get('/api/items', function (req, res) {
    //console.log("user:", req.session.user);
    res.setHeader('Content-Type', 'application/json');
    fs.readFile(path.join(__dirname + '/data/items/items.json'), (err, data) => {
        if (err) throw err;
        const items = JSON.parse(data).items;
        res.end(JSON.stringify(items, null, 3));
    });
});
app.get('/api/items/:id', function (req, res) {
    console.log("Id:", req.params.id);
    res.setHeader('Content-Type', 'application/json');
    fs.readFile(path.join(__dirname + '/data/items/items.json'), (err, data) => {
        if (err) throw err;
        const items = JSON.parse(data).items;
        const result = items.filter(item => item.itemid == req.params.id);
        res.end(JSON.stringify(result[0], null, 3));
    });
});

app.get('/logout', function (req, res) {
    req.session.user = null;
    res.redirect('/');
});

app.post('/login', function (req, res) {
    fs.readFile(path.join(__dirname + '/data/accounts/accounts.json'), (err, data) => {
        if (err) throw err;
        const accounts = JSON.parse(data).accounts;
        let currentaccount = null;

        for (let i = 0; i < accounts.length; i++) {
            if (req.body.email == accounts[i].email) {
                if (req.body.password == accounts[i].password) {
                    console.log("Signed In!:", accounts[i].name);
                    req.session.user = accounts[i];
                    res.redirect('/')
                    currentaccount = accounts[i];
                } else {
                    res.status(403);
                    res.send("Wrong password");
                    return;
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