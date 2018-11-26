import React, { Component } from 'react';
import './App.css';
import {Game} from "./Game";
import {InventoryItems} from "./InventoryItems";

interface GameState { game :  Game }

class App extends Component<{}, GameState> {
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
              <h1>Inventory</h1>
              <InventoryItems gameInstance={this.state.game}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
