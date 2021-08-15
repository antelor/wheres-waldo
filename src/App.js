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

    this.state = {
      score: 0,
      endScore: 0,
      chars: [],
    };

    this.charListInit = this.charListInit.bind(this);
    this.checkSelection = this.checkSelection.bind(this);
    this.removeChar=this.removeChar.bind(this);
  }

  //mostrar o esconder menu
  toggleMenu(e) {
    let dropMenu = document.querySelector('.dropMenu');
    
    dropMenu.classList.toggle('hidden');
    dropMenu.style.left = (e.clientX - 20) + 'px';
    dropMenu.style.top = (e.clientY - 20) + 'px';
  }

  //eliminar personaje de charList
  removeChar(name) {
    let newState = this.state;

    newState.chars = newState.chars.filter(function (item) {
      return item.name != name;
    });
    
    this.setState(newState);
  }

  //chequea si ganaste y muestra banner
  checkWin() {
    //si no quedan personajes, ganaste
    if (this.state.chars.length === 0) {
      //winDiv
      const winDiv = document.createElement('div');
      winDiv.classList.add('winDiv');
      winDiv.textContent = 'Ganaste!!!!';
      document.querySelector('[id=root]').appendChild(winDiv);       
      //stop contador de score
      clearInterval(this.interval);
    }
  }
  
  //check si la seleccion abarca personaje
  checkSelection(e) {
    let x0, x1, y0, y1 = -1;

    //encontrar coordeandas de personaje
    for(let i = 0; i<this.state.chars.length; i++){
      if(this.state.chars[i].name === e.target.name){
        x0 = this.state.chars[i].x0;
        x1 = this.state.chars[i].x1;
        y0 = this.state.chars[i].y0;
        y1 = this.state.chars[i].y1;
      }
    }

    //chequeo de coordenadas
    if (e.clientX >= x0 &&
      e.clientX <= x1 &&
      e.clientY >= y0 &&
      e.clientY <= y1)
    {
        //div yes
        const yesDiv = document.createElement('div');
        yesDiv.classList.add('yesDiv');
        yesDiv.textContent = 'Bien!!!!';
        document.querySelector('[id=root]').appendChild(yesDiv);       
        
        //borrar personaje de la charList
        this.removeChar(e.target.name);
      
        this.checkWin();
    }
    else {
      //div no
      const noDiv = document.createElement('div');
      noDiv.classList.add('noDiv');
      noDiv.textContent = 'Mal!!!!';
      document.querySelector('[id=root]').appendChild(noDiv);       
    }
    
    //esconder dropdown
    document.querySelector('.dropMenu').classList.toggle('hidden');
  }

  componentDidMount() {
    //score update
    this.interval = setInterval(() => {
      let currScore = this.state.score;
      this.setState({ score: currScore + 1 })
    }, 1000);

    this.charListInit();
  }

  async charListInit() {
    let newState = this.state;

    //query
    let charDocument = await firebase.firestore()
    .collection('charPositions')
    .get();
    
    //pasar a array
    let charArray = charDocument.docs.map(doc => doc.data());

    //por cada entrada agrego a charList
    charArray.forEach((item) => {
      newState.chars.push({
        name: item.name,
        x0: item.x0,
        x1: item.x1,
        y0: item.y0,
        y1: item.y1
      });
    });

    this.setState(newState);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="App">        
        <div className="score"> {this.state.score} a</div>
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
