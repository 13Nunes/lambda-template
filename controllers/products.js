const express = require('express');
const { sendEmailMessage, getProductList } = require('../models/products');

// Router instance
const router = express.Router();

// Product List route
router.get('/', function (req, res) {
  getProductList('A')
  .then((productList) => {
    res.json({
      status: true,
      message: 'Product list.',
      productList
    });
  }).catch((err) => {
    res.json({
      status: false,
      message: err.message
    });
  });
});

// Send e-mail route
router.post('/sendEmail', function (req, res) {
  sendEmailMessage()
  .then((response) => {
    res.json({
      status: true,
      message: `Email has been sent.`,
      result: response
    });
  }).catch((err) => {
    res.json({
      status: false,
      message: err.message
    });
  });
});

module.exports = router;
