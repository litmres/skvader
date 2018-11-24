import React, { Component } from 'react';
import './App.css';
import {Game} from "./game";

interface MyComponentState { game :  Game }

class App extends Component<{}, MyComponentState> {
  constructor(props: any) {
      super(props);
      this.state = {
          game: new Game()
      };
  }

  componentDidMount() {
      this.state.game.newGame();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <div className="row">
          <div className="col-md-8">
            <div id="game-display" className="Game-display"/>
          </div>
          <div className="col-md-4">
          </div>
        </div>
      </div>
    );
  }
}

export default App;
