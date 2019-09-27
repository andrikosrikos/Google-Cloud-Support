import { Component, OnInit } from '@angular/core';

//Import AngularFirestore to access Firestore database
import { AngularFirestore } from '@angular/fire/firestore';
//Import AlertControll to display alerts
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  //List that will be used to load the data from Firestore into it
  members = [];

  //Constractor: add AngularFirestore and AlertController
  constructor(private db: AngularFirestore, public alertController: AlertController) { }

  ngOnInit() {
  }

  //Load data and create the alert
  showAlert(){

    //Clear the array before loading again
    this.members = [];

    //Access the Collection "users" in Firestore and load all the documents
    this.db.collection("users").ref
    .get()
    .then(async (querySnapshot) => {

      //Parse through all the loaded documents
      querySnapshot.forEach((doc) => {
        //Add the loaded name to the list
        this.members.push(doc.data().memberName)
      });

      //Create an array of Radio Buttons to be used in the alert
      var newInputs = [];
      
      //Parse through all memebers in the loaded array from Firestore
      for (const member of this.members){
        newInputs.push({
          name: 'radio1', //You can costumize those as well to cast the clicked once afterwards
          type: 'radio',
          label: member, //Add the memebr as label
          value: 'value1',
          checked: false
        })
      }
  
      //Create an alert
      const alert = await this.alertController.create({
        header: 'Radio',
        inputs: newInputs, //Add the dynamically  generated array of radio buttons.
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: () => {
              console.log('Confirm Ok');
            }
          }
        ]
      });
  
      //Present the alert
      await alert.present();


    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  }

}
