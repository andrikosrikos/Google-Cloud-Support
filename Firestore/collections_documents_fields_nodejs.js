//Establish connection to Firestore
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

var db = admin.firestore();

//Main function to be executed
exports.main = (req, res) => {
  let message = req.query.message || req.body.message || 'Connected!';
  
  res.status(200).send(LoadClientDetail(req, res, db));
};

//Function that reads all the documents form ClientDetail collection
function LoadClientDetail(req, res, db) {
  //From collection -> ClientDetail
    db.collection('ClientDetail').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => { 
        //Checking each document in that collection
        //Log the document ID and the ClientID field from each document in the collection
        console.log(doc.id, '=>', doc.data().clientID);
        //Create a variable to send as argument later
        ClientID = doc.data().clientID;
        //Call the function that reads the other collection and pass the arguments including the ClientID
        LoadClientPersonalDetail(req, res, db, ClientID);
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
  
  	//Return a message to the main function to print a message on browser notifying about the successful operation
	return 'Finished checking';
}

//Function that reads all the documents form ClientPersonalDetail collection
function LoadClientPersonalDetail(req, res, db, ClientID) {
   //From collection -> ClientPersonalDetail
    db.collection('ClientPersonalDetail').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => { 
        //Checking each document in that collection
        //Check the ClientID dield from each document in this collection with the ClientID that was passed from the arguments
        if (doc.data().clientID == ClientID){
          //It is a match, therefore loag a message 
          //The ClientID matches from both collections
          //Do your operations here
          //Get the other field with the same way e.g. doc.data().clientID or doc.data().name etc.
        	console.log('Found the user on the other Collection here is the name: ', doc.data().clientID);
        }
        else{
          //Those two ClientIDs don't match
          //Don't do anything
        	console.log('Didn\'t found the user');
        }
        
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
}
