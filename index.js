const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000


express().use(express.static(path.join(__dirname, 'public')));

express().set('views', path.join(__dirname, 'views'));

express().set('view engine', 'ejs');

express().get('/', function (req, res) {
   res.render('pages/index');
});

express().get('/getRate', function (req, res) {
   res.render('pages/rate');
});

express().listen(PORT, () => console.log(`Listening on ${ PORT }`));
