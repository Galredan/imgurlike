import firebase from "firebase";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDyZ2owoTjrZOBMzuSeP2Q1wIXgQwnH0Ao",
    authDomain: "instaclone-a4c7b.firebaseapp.com",
    projectId: "instaclone-a4c7b",
    storageBucket: "instaclone-a4c7b.appspot.com",
    messagingSenderId: "691114612735",
    appId: "1:691114612735:web:1324b82128a3ebd0bd39ca",
    measurementId: "G-8DC1MCF5J4"
  };
 
  try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }
  const fire = firebase;
  export default fire;

  