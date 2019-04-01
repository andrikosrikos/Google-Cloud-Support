//Public variable
var bucket_name = "[BUCKET_NAME]";

// Declaration of async function
const myfunction = async function() {
    try {
        console.log('Executing async function');

        const {Storage} = require('@google-cloud/storage');

        // Creates a client
        const storage = new Storage();

        // Gets the ACL for the bucket
        const [acls] = await storage.bucket(bucket_name).acl.get();

        acls.forEach(acl => {
            console.log(`${acl.role}: ${acl.entity}`);
        });

        return "Function executed!";
    }
    catch(error) {
        console.error(error);
    }

}


exports.getAClGoogleCloudStorage = (req, res) => {
  // Start async function
  const start = async function() {
    const result = await myfunction();
    console.log(result);
  }

  // Call start async function
  start();

  let message = req.query.message || req.body.message || 'Execution finished!';
  res.status(200).send(message);
  
};
