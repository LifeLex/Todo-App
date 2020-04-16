import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAuL1tO0s4bHm-R84QwOq756wuyDeaF7QY",
    authDomain: "todo-app-c7eb5.firebaseapp.com",
    databaseURL: "https://todo-app-c7eb5.firebaseio.com",
    projectId: "todo-app-c7eb5",
    storageBucket: "todo-app-c7eb5.appspot.com",
    messagingSenderId: "359619248987",
    appId: "1:359619248987:web:b0ec76a497f6f6ec2cd07e",
    measurementId: "G-C259J8W3FZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const db = firebase.firestore();

  //db.settings({timestampsInSnapshots: true})
  export default db;