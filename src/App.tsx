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
            <div id="game-display" />
        </header>
      </div>
    );
  }
}

export default App;
