/*
Documentation: https://cloud.google.com/pubsub/docs/quickstart-client-libraries#pubsub-client-libraries-nodejs
1. Setup GOOGLE_APPLICATION_CREDENTIALS [ https://cloud.google.com/docs/authentication/getting-started ]
2. Install "@google-cloud/pubsub" locally by executing "$ npm install --save @google-cloud/pubsub"
3. Create a topic: "$ gcloud pubsub topics create TopicA"
4. Subsctibe to the topic: "$ gcloud pubsub subscriptions create SubscriptionA --topic TopicA"
*/

////////// Sending Message to the TopicA from ProjectA ////////// 

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client
const pubsub = new PubSub();


async function sendMessagePubSub(msg) {
	console.log('Started publishing message');
 	const topicName = 'TopicA';
 	const data = JSON.stringify({ message: msg });

 	// Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
 	const dataBuffer = Buffer.from(data);

 	const messageId = await pubsub.topic(topicName).publish(dataBuffer);
 	console.log(`Message ${messageId} published.`);

}

sendMessagePubSub("Hello World!");


////////// Receiving Message from the SubscriptionA in ProjectA ////////// 

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client
const pubsub = new PubSub();

const subscriptionName = 'SubscriptionA';
const timeout = 60;

// References an existing subscription
const subscription = pubsub.subscription(subscriptionName);

function receiveMessagePubSub(){
    // Create an event handler to handle messages
    let messageCount = 0;
    const messageHandler = message => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);
    messageCount += 1;

    // "Ack" (acknowledge receipt of) the message
    message.ack();
    };

    // Listen for new messages until timeout is hit
    subscription.on(`message`, messageHandler);

    setTimeout(() => {
    subscription.removeListener('message', messageHandler);
    console.log(`${messageCount} message(s) received.`);
    }, timeout * 1000);
}

receiveMessagePubSub();



