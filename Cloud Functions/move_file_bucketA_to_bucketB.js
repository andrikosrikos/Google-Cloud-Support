// Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');

// Instantiates a client
const storage = Storage();

//Define bucket's name
const srcBucketName = "[BUCKET_A]";
const destBucketName = "[BUCKET_B]";

exports.moveToBucket = (event, context) => {
  const gcsEvent = event;

  //Start the moving process
  copyFile(gcsEvent.name, gcsEvent.name);
  
  console.log(`Processing file: ${gcsEvent.name}`);
};



async function copyFile(srcFilename, destFilename) {

     // Copies the file to the other bucket
    storage
    .bucket(srcBucketName)
    .file(srcFilename)
    .copy(storage.bucket(destBucketName).file(destFilename))
    .then(() => {
	//Log when the file is copied sucesfully
      console.log(
        `gs://${srcBucketName}/${srcFilename} copied to gs://${destBucketName}/${destFilename}.`
      );
      //Start deleting the file from original bucket
      deleteFile(srcFilename);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  
}

async function deleteFile(srcFilename) {
  	var myBucket = storage.bucket(srcBucketName);
  	var file = myBucket.file(srcFilename);
	//Delete the file
  	file.delete(function(err, apiResponse) {});
	//Log that deleting process was sucesful 
	console.log(`File gs://${srcBucketName}/${srcFilename} is deleted.`);
    //-
    // If the callback is omitted, we'll return a Promise.
    //-
    file.delete().then(function(data) {
      var apiResponse = data[0];
    });
}
