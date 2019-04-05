//RSS to JSON library
var Feed = require('rss-to-json');

exports.getRSS = (req, res) => {
  //Load the RSS link and convert it to JSOn object
  Feed.load('https://polisen.se/aktuellt/rss/hela-landet/handelser-i-hela-landet/', function(err, rss){

      //Parse from each item and print the property 
      //Get the JASON's part called "items"
      for (x in rss.items) {
          console.log("Parsing object [ " + x.toString() + " ]: ");
          console.log("- Title: \t" + rss.items[x].title);
          console.log("- Description: \t" + rss.items[x].description);
          console.log("- Created: \t" + convertMillisecondsToDateString(rss.items[x].created)); 
          console.log("=========================================="); //Just line to seperate the items in log
      }

  });
  
  let message = req.query.message || req.body.message || 'Check the logs in Stackdriver';
  res.status(200).send(message);
};

//Function that gets milliseconds and returns a date time formated string
function convertMillisecondsToDateString(mills) {
    var mydate = new Date(mills);
    var month = mydate.getMonth() + 1; // Becasue month count starts from 0 and goes to 11
    var mydate_str = mydate.getDay() + "/" + month + "/" + mydate.getFullYear() + " " + mydate.getHours() + ":" + mydate.getMinutes() + ":" + mydate.getSeconds();
  
    return mydate_str;
} 
