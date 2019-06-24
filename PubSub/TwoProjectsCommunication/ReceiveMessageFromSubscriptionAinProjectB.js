/*
Use tutorial [ https://github.com/andrikosrikos/Google-Cloud-Support/blob/master/PubSub/TwoProjectsCommunication/ProjectASenderReceiver.js ]
to setup the TopicA and SubscriptionA in ProjectA

Now to revceive message in ProjectB follow the steps below:
1. In the "const subscriptionName = 'projects/[PROJECT_ID]/subscriptions/SubscriptionA';" section, change "[PROJECT_ID]" to your project ID.
2. Allow cross project communication to PubSub [ https://cloud.google.com/pubsub/docs/access-control#cross-project ] 
3. Execute the code below

*/

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client
const pubsub = new PubSub();

const subscriptionName = 'projects/[PROJECT_ID]/subscriptions/SubscriptionA';
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
