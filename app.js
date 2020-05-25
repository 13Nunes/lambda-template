const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const { RateLimiterMemory } = require('rate-limiter-flexible');

// Init app
const app = express();

// Security headers
app.use(helmet());

// Protects from DDoS and brute force attacks
const rateLimiter = new RateLimiterMemory({
  points: 10, // 10 points
  duration: 1, // Per second
});
app.use((req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send('Too Many Requests');
    });
})

// Set Cors
app.use(cors());

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// For parsing json body of POST requests (with 16 MB of dimension limit)
app.use(bodyParser.json({ limit: '16mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Favicon
app.use(favicon(__dirname + '/views/favicon.ico'));

// Root response (Documentation)
app.get('/', (req, res) => {
  //res.send('Endpoint /GET v0.0.1');
  res.render('documentation');
})

// Import route resources
const products = require('./controllers/products');

// Route resources setup
app.use('/products', products);


// Export app
module.exports = app;