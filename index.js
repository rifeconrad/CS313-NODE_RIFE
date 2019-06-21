const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({extended: false}))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/getRate', jsonParser, function(req, res) {

    price_param = {total: 0};

    res.render('pages/rate', price_param);
  })
  .post('/getRate', jsonParser, function(req, res) {
    const mail_type = req.body.mail_type;
    const weight = req.body.weight;

    const price = calculateRate(mail_type, weight);

    var price_param = {total: price};

    res.render('pages/rate', price_param);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));


  const letters_stamped_rates     = [0.55, 0.70, 0.85, 1.00]; // total 4
  const letters_metered_rates     = [0.50, 0.65, 0.80, 0.95]; // total 4
  const large_envelope_rates      = [1.00, 1.15, 1.30, 1.45, 1.60, 1.75, 1.90, 2.05, 2.20, 
                                     2.35, 2.50, 2.65, 2.80]; // total 13
  const first_class_package_rates = [3.66, 4.39, 5.19, 5.71]; // total 4
  function calculateRate(mail_type, weight) {
    if (weight <= 0)
      return -1;

  	if (mail_type == "letters_stamped") {
  		if      (weight <= 1)   return letters_stamped_rates[0];
  		else if (weight <= 2)   return letters_stamped_rates[1];
  		else if (weight <= 3)   return letters_stamped_rates[2];
  		else if (weight <= 3.5) return letters_stamped_rates[3];
  	} else if (mail_type == "letters_metered") {
  		if      (weight <= 1)   return letters_metered_rates[0];
  		else if (weight <= 2)   return letters_metered_rates[1];
  		else if (weight <= 3)   return letters_metered_rates[2];
  		else if (weight <= 3.5) return letters_metered_rates[3];
  	} else if (mail_type == "large_envelope") {
  		if      (weight <= 1)   return large_envelope_rates[0];
  		else if (weight <= 2)   return large_envelope_rates[1];
  		else if (weight <= 3)   return large_envelope_rates[2];
  		else if (weight <= 4)   return large_envelope_rates[3];
  		else if (weight <= 5)   return large_envelope_rates[4];
  		else if (weight <= 6)   return large_envelope_rates[5];
  		else if (weight <= 7)   return large_envelope_rates[6];
  		else if (weight <= 8)   return large_envelope_rates[7];
  		else if (weight <= 9)   return large_envelope_rates[8];
  		else if (weight <= 10)  return large_envelope_rates[9];
  		else if (weight <= 11)  return large_envelope_rates[10];
  		else if (weight <= 12)  return large_envelope_rates[11];
  		else if (weight <= 13)  return large_envelope_rates[12];
  	} else if (mail_type == "package") {
  		if      (weight <= 4)   return first_class_package_rates[0];
  		else if (weight <= 8)   return first_class_package_rates[1];
  		else if (weight <= 12)  return first_class_package_rates[2];
  		else if (weight <= 13)  return first_class_package_rates[3];
  	}

    return -1;
  }