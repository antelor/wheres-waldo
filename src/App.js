import React, { Component } from 'react'
import firebase from "firebase/app"
import 'firebase/firestore'
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
  
  async checkSelection(e) {
    let charDocument = await firebase.firestore()
      .collection('charPositions')
      .doc(e.target.name)
      .get();
    
    let charPositions = charDocument._delegate._document.data.value.mapValue.fields;

    //separo coordenadas en objeto para hacer mas facil la lectura
    let coord = {
      x0: charPositions.x0.integerValue,
      x1: charPositions.x1.integerValue,
      y0: charPositions.y0.integerValue,
      y1: charPositions.y1.integerValue
    }

    //chequeo de si la seleccion abarca el personaje
    if (e.clientX >= coord.x0 &&
        e.clientX <= coord.x1 &&
        e.clientY >= coord.y0 &&
        e.clientY <= coord.y1) {
          console.log("Bien!!!!");
      }
    
    
    
    
    document.querySelector('.dropMenu').classList.toggle('hidden');
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
            <li><button onClick={ this.checkSelection } name="waldo">Waldo</button></li>
            <li><button onClick={ this.checkSelection } name="mage">Mago</button></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
