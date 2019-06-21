const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000


express()
  .use(express.static(path.join(__dirname, 'assignments/ponder')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/ponder09', (req, res) => res.render('ponder09/views/pages/rate'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
