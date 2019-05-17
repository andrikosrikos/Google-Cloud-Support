// Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');

// Instantiates a client
const storage = Storage();

const srcBucketName = "[BUCKET_A]";
const destBucketName = "[BUCKET_A]";

exports.moveToBucket = (event, context) => {
  const gcsEvent = event;
  
  
  //Call the copy method
  
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
      console.log(
        `gs://${srcBucketName}/${srcFilename} copied to gs://${destBucketName}/${destFilename}.`
      );
      
      deleteFile(srcFilename);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  
}

async function deleteFile(srcFilename) {
  	var myBucket = storage.bucket(srcBucketName);
  	var file = myBucket.file(srcFilename);
  	file.delete(function(err, apiResponse) {});
	console.log(`File gs://${srcBucketName}/${srcFilename} is deleted.`);
    //-
    // If the callback is omitted, we'll return a Promise.
    //-
    file.delete().then(function(data) {
      var apiResponse = data[0];
    });
}
