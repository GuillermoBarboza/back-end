const AWS = require("aws-sdk");

AWS.config.getCredentials(function(err) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
      console.log("Access key:", AWS.config.credentials.accessKeyId);
    }
  });
  AWS.config.update({region: 'sa-east-1'});
  
  // Create S3 service object
  s3 = new AWS.S3({apiVersion: '2012-10-17'});
  
  
  module.exports = {
    s3,
  }