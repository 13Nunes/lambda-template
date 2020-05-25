const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');

// Create a server to be integrated with AWS API gateway
const server = awsServerlessExpress.createServer(app);

// Export the handler for the AWS lambda function
exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);