import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAPoXnDgJflNy_O0b-YOURCRkgDl4xZBUY",
    authDomain: "prog3rnmarquez.firebaseapp.com",
    projectId: "prog3rnmarquez",
    storageBucket: "prog3rnmarquez.appspot.com",
    messagingSenderId: "865498786422",
    appId: "1:865498786422:web:2525d82a7ea08ae92e8d57"
  };

  app.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const storage =  app.storage();
  export const db = app.firestore();