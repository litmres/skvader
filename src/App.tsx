import {EventEmitter} from 'fbemitter';
import React, {Component} from 'react';
import './App.css';
import {INTRO_FINISHED} from "./Constants";
import {Game} from './Game';
import {Intro} from './Intro';

interface GameState {
    game: Game,
    isIntroFinished: boolean
}

class App extends Component<{}, GameState> {
    constructor(props: any) {
        super(props);
        this.state = {
            game: new Game(),
            isIntroFinished: false
        };
        // TODO: is there a better solution for finding out when the Intro has finished other than EventEmitters?
        const emitter = new EventEmitter();
        emitter.once(INTRO_FINISHED, this.handleIntroFinished);
    }

    render() {
        return (
            <div className="App">
                <Intro/>
            </div>
        );
    }

    private handleIntroFinished() {
        this.setState({
            isIntroFinished: true
        })
    }
}

export default App;
