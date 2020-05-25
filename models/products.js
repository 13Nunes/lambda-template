const pool = require('../config/database');
const { sendEmail } = require('./email');

// Get product help text
const sendEmailMessage = (companyId, productId) => {
  return new Promise(function (resolve, reject) {
    // Mail settings
    const from = "SenderName <no_reply@senderdomain.com>";
    const to = [`RecipientName <RecipientEmail>`];
    const subject = "Email subject";
    const emailTemplate = './views/emailTemplate.ejs';

    // Mail data
    const emailData = {
      'title': 'Email title',
      'link': process.env.BASE_URL + '/custom-link-here'
    }

    // Send email
    sendEmail(emailTemplate, emailData, subject, from, to).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(new Error(err.message));
    });
  });
}

// Get products
const getProductList = (status) => {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      connection.query(`SELECT * FROM products WHERE status = ?;
        `, [status], (err, rows, fields) => {
        connection.release();
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(rows);
        }
      });
    });
  });
}

module.exports = {
  sendEmailMessage,
  getProductList
}