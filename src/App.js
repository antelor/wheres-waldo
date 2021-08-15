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

  toggleMenu(e) {
    let dropMenu = document.querySelector('.dropMenu');

    dropMenu.classList.toggle('hidden');
    dropMenu.style.left = (e.clientX - 20) + 'px';
    dropMenu.style.top = (e.clientY - 20) + 'px';
  }

  render() {
    return (
      <div className="App">        
        <img className="mainImg" src={waldo} alt="wally" onClick={this.toggleMenu}/>
        <script src="https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js"></script>
        <div className="dropMenu hidden">
          <div className="selection">

          </div>
          <ul>
            <li>Waldo</li>
            <li>Mago</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
