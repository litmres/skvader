import React, { Component } from 'react';
import './App.css';
import {Well} from "react-bootstrap";
import {CollectableItem} from "./CollectableItem";

interface InventoryItemsProps { items :  CollectableItem[] }

export class InventoryItems extends Component<InventoryItemsProps> {
  render() {
    return this.props.items.map((item: CollectableItem) => {

        return (
            <Well key={item.toHash()}>{item.symbol}</Well>
        )
    });
  }
}
