import React, { Component } from 'react';
import './App.css';
import {Game} from "./Game";
import {Player} from "./Player";

interface GameStateProps { gameInstance :  Game }

export class InventoryItems extends Component<GameStateProps> {
  render() {
    let playerInstance: Player = this.props.gameInstance.getPlayer();
    let itemsList = playerInstance.inventory.map(function(item){
        return <li>{item}</li>;
    });
    return (<ul>{ itemsList }</ul>)
  }
}
