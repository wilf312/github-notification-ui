import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCZqWEydd_55hjlGjYuZ0djs38KPtrdrVw",
  authDomain: "github-notification-2020.firebaseapp.com",
  databaseURL: "https://github-notification-2020.firebaseio.com",
  projectId: "github-notification-2020",
  storageBucket: "github-notification-2020.appspot.com",
  messagingSenderId: "263755541873",
  appId: "1:263755541873:web:e2253d7946b8595c62dad0",
  measurementId: "G-RC5D8DCXKV"
};

// Initialize Firebase
if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

export default firebase
