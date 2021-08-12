import React, { Component } from 'react'
import firebase from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyDP4thDvNJD3geWDxkcFVOnZfZd31vqElo",
  authDomain: "wheres-waldo-2b90c.firebaseapp.com",
  projectId: "wheres-waldo-2b90c",
  storageBucket: "wheres-waldo-2b90c.appspot.com",
  messagingSenderId: "1031823281956",
  appId: "1:1031823281956:web:ad22b7016eb2419920adb1"
};
firebase.initializeApp(firebaseConfig);

class App extends Component {


  render() {
    return (
      <div className="App">

          aaaa
        <script src="https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js"></script>
      </div>
    );
  }
}

export default App;
