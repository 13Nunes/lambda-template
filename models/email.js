const aws = require('aws-sdk');
const ejs = require('ejs');
const ses = new aws.SES({
  region: 'us-east-1'
});

// Send email
const sendEmail = (emailTemplate, emailData, subject, from, to) => {
  return new Promise(function (resolve, reject) {
    ejs.renderFile(emailTemplate, emailData, function (err, emailContent) {
      if (err) reject(new Error(err.message));

      var eParams = {
        Destination: {
          ToAddresses: to
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: emailContent
            }
          },
          Subject: {
            Charset: 'UTF-8',
            Data: subject
          }
        },
        Source: from
      };

      ses.sendEmail(eParams, function (err, data) {
        if (err) reject(new Error(err.message));

        resolve(data);
      });
    });
  });
}

module.exports = {
  sendEmail
}