import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


var firebaseConfig = {
    apiKey: "AIzaSyC7pJJYv2FWlsus2XpMpMWfwRI3SAUrx4w",
    authDomain: "slack-app-react.firebaseapp.com",
    databaseURL: "https://slack-app-react.firebaseio.com",
    projectId: "slack-app-react",
    storageBucket: "slack-app-react.appspot.com",
    messagingSenderId: "172795242472",
    appId: "1:172795242472:web:b1241a19a986ceeb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;