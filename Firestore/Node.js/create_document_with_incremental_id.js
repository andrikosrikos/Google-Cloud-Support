//This code reads the last document's ID: e.g 55
//And the creates the new docuement with ID e.g. 56
//Therefore you will alwasy add new document and the ID will be incremental number

//Import the Firestore library:
const {Firestore} = require('@google-cloud/firestore');

// Define firestore client
const firestore = new Firestore();

//Function that always gets a new QUESTION the WRONG value and the RIGHT value. Then finds the last document's ID and creates a document with those given arguments but new incremental ID for hte document reference name.
async function addNewDocument(question, wrong, correct){

    //Create a quesry to load the last document
    let query = firestore.collection('esequiz');

    //Use 'desc' to sort in Descending oreder.
    //Use .limit(1) to only read the last document
    query.orderBy('id', 'desc').limit(1).get().then(querySnapshot => {
    querySnapshot.forEach(documentSnapshot => {

        //Document was read so log it's data
        console.log(`Found document at ${documentSnapshot.ref.path}`);
        console.log(`Last document's ID: ${documentSnapshot.id}`);

        //Generate a new ID for the new document to be created
        var newDocumentID = Number(documentSnapshot.id) + 1;

        //Create a reference to add the new document to the database. As you can see 'esequiz' is the collection's name and 'newDocumentID' is the new generated ID
        let documentRef = firestore.doc('esequiz/' + newDocumentID);

        //This is the fileds of the new document:
        documentRef.set(
            {
                id: newDocumentID, // Add the new generated ID
                question: question, // The question as passed through the functions arguments
                wrong: wrong,  // The wrong answer as passed through the functions arguments
                correct: correct// The correct answer as passed through the functions arguments

            }).then(res => {
            
            //This will only be logged uppon proper execution and a 200 response of the API. Wich means that seeing this message, the data was written to the database
            console.log(`Document with ID: ${newDocumentID} is written.`);
        });
    });
    });

}

//Call the function passing the data for the new quesiton
addNewDocument("What is 7 + 3?", "5", "10");
