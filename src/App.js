import React, { Component } from 'react'
import firebase from "firebase/app"
import waldo from './waldo1.jpg'
import './styles/App.css'

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
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    document.querySelector('[class=mainImg]').addEventListener("click", function(e){
      document.querySelector('[class=dropMenu]').style.backgroundColor = "red";
      document.querySelector('[class=dropMenu]').style.left = e.clientX + 'px';
      document.querySelector('[class=dropMenu]').style.top = e.clientY + 'px';


    });
  }

  render() {
    return (
      <div className="App">        
        <img className="mainImg" src={waldo} alt="wally"/>
        <script src="https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js"></script>
        <div className="dropMenu"></div>
      </div>
    );
  }
}

export default App;
