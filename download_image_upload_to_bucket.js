// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

//For downloading the image
var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

//Execute the download function:
download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){

    //Log the sucesfull download of the image
    console.log('Download DONE');

    //Constants for the Google Cloud Buckets
    const bucketName = '[BUCKET_NAME]';
    const filename = '/PATH/TO/DOWNLOADED/IMAGE/IMAGE_NAME.png'; //Or .jpg etc.

    // Uploads a local file to the bucket
    storage.bucket(bucketName).upload(filename, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        cacheControl: 'public, max-age=31536000',
    },
    });

    console.log(`${filename} uploaded to ${bucketName}.`);
});
