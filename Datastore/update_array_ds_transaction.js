//Load the library
const {Datastore} = require('@google-cloud/datastore');

// Your Google Cloud Platform project ID
const projectId = '[PROJECT_ID]';

// Creates a client
const datastore = new Datastore({
    projectId: projectId,
});

//Declare the Entity Kind
const currentEntityKind = "Session";

//If in Datastore the id is starting with "name=" then it is a custom ID and needs to be trated as string value
//If in Datastore the id is starting with "id=" then it is a numeric automaticaly generated ID and needs to be trated as integer value
//const currentSessionID = "CUSTOM-NAME"; // In Datastore e.g. "name=CUSTOM-NAME" 
const currentSessionID = 5639456635748352; // In Datastore e.g. "id=5639456635748352"

//Declare entity's column name
const entityColumnName = "session_tasks";

//Declare the transaction for Datastore
const transaction = datastore.transaction();

//This function loads the data from specific Entity Kind and Entity Key and then updates the value
async function addNewTaskToCurrentSession(newTaskID){
    
    try {
        await transaction.run();

        //Load an array from Datastore
        const taskKey = datastore.key([currentEntityKind, currentSessionID]);
        //Get the data from Datastore
        const [task] = await transaction.get(taskKey);
        //Loaded task IDs:
        console.log(`Tasks in this session: ${task[entityColumnName]}`);
        //Add the new task here
        task[entityColumnName].push(newTaskID);
        console.log(`Task "${newTaskID}" was added to the session's list.`);

        //Perform transaction to same Entity Kind and Entity Key and add the new data in the Datastore
        transaction.save({
            key: taskKey,
            data: task,
        });
        
        //Commit the transaction
        transaction.commit();
        //Notify
        console.log(`Task "${newTaskID}" added to current Session successfully in Datastore.`);

    } catch (err) {
        //Log if there is an error
        console.error('ERROR:', err);
        transaction.rollback();
    }
}

addNewTaskToCurrentSession("NewTaskID");
