// Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');

// Instantiates a client
const storage = Storage();

const srcBucketName = "[BUCKET_A]";
const destBucketName = "[BUCKET_B]";

async function moveToBucket() {  

    const fileName = "health";
  //Log that have uploaded
  console.log(`File: ${fileName} was uploaded!`);
  
  //Process the file
  var response = await fileExists(fileName);
  if (response == true){
      //Found the file
      console.log(`Found the file ${fileName}`);
      //Process the file
      processFile(fileName);
      
  }
  else{
      //Didn't found the file
      //Don't do anything
      console.log(`Didn't find the file ${fileName}`);
  }
  

  
}

async function processFile(srcFilename){
    console.log(`Processing file: ${srcFilename}`);

    //After the processing is done check for file if existed and execute the copy command
    //Check if the file fileExists
  response = await fileExists(srcFilename);
  if (response == true){
      //Found the file
      console.log(`Found the file ${srcFilename}`);
      //Copy it to different location
      copyFile(srcFilename, srcFilename);
  }
  else{
      //Didn't found the file
      //Don't do anything
      console.log(`Didn't find the file ${srcFilename}`);
  }
}

//Check if file exists
function fileExists(srcFilename) {
    var myBucket = storage.bucket(srcBucketName);
  	var file = myBucket.file(srcFilename);

    return new Promise(function(resolve, reject) {
        file.exists().then(function(data) {
                var exists = data[0];
                console.log(`Looking for file: ${srcFilename}`);
                resolve(exists);
        });
    });
}

//Copy file to another location
async function copyFile(srcFilename, destFilename) {

  	// Copies the file to the other bucket
    storage
    .bucket(srcBucketName)
    .file(srcFilename)
    .copy(storage.bucket(destBucketName).file(destFilename))
    .then(async() => {
      console.log(
        `gs://${srcBucketName}/${srcFilename} copied to gs://${destBucketName}/${destFilename}.`
      );
      
        //Check if file exists and delete it if it is true
        var response = await fileExists(srcFilename);
        if (response == true){
            //Found the file
            console.log(`Found the file ${srcFilename}`);
            //Delete it
            deleteFile(srcFilename);
        }
        else{
            //Didn't found the file
            //Don't do anything
            console.log(`Didn't find the file ${srcFilename}`);
        }
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  
}

//Delete the file
async function deleteFile(srcFilename) {
  	var myBucket = storage.bucket(srcBucketName);
  	var file = myBucket.file(srcFilename);

  	file.delete(function(err, apiResponse) {});
	console.log(`File gs://${srcBucketName}/${srcFilename} is deleted.`);

    file.delete().then(function(data) {
        var apiResponse = data[0];
    }).catch(function () {
        console.log("Promise Rejected");
    });
}

moveToBucket(); 

