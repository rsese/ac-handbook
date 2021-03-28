const firebase = require("firebase");

// doesn't need to be private: https://firebase.google.com/docs/projects/api-keys
const firebaseConfig = {
  apiKey: "AIzaSyDCFJQGDSrbC8NSxFn3iZb6KIogj1aXUBE",
  authDomain: "ac-handbook.firebaseapp.com",
  databaseURL: "https://ac-handbook-default-rtdb.firebaseio.com",
  projectId: "ac-handbook",
  storageBucket: "ac-handbook.appspot.com",
  messagingSenderId: "31917484511",
  appId: "1:31917484511:web:07e537e3db2c536cb63c6a",
};

firebase.initializeApp(firebaseConfig);
module.exports = firebase.database()