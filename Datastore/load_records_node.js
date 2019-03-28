const {Datastore} = require('@google-cloud/datastore');

// Your Google Cloud Platform project ID
const projectId = '[PROJECT_ID]';

//The title of the kind of the entity. e.g. Table name
const entityKindName = '[KIND_NAME]';

// Creates a client
const datastore = new Datastore({
    projectId: projectId,
});

exports.loadDataFromDatastore = async (req, res) => {
  
	const query = datastore.createQuery(entityKindName);

    const [tasks] = await datastore.runQuery(query);
    console.log('Loaded data:');
    tasks.forEach(task => {
      const taskKey = task[datastore.KEY];
      console.log(taskKey.id, task);
    });



    let message = req.query.message || req.body.message || 'Loaded data';
    res.status(200).send(message);

    await browser.close();
}




