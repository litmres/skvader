import {EventEmitter} from 'fbemitter';
import React, {Component} from 'react';
import './App.css';
import {INTRO_FINISHED} from "./Constants";
import {Game} from './Game';
import {Intro} from './Intro';
import {ChapterOneIntro} from "./ChapterOneIntro";

interface GameState {
    game: Game,
    isIntroFinished: boolean,
    isChapterOneIntroFinished: boolean
}

class App extends Component<{}, GameState> {
    constructor(props: any) {
        super(props);
        this.state = {
            game: new Game(),
            isIntroFinished: false,
            isChapterOneIntroFinished: false
        };
        // TODO: is there a better solution for finding out when the Intro has finished other than EventEmitters?
        const emitter = new EventEmitter();
        emitter.once(INTRO_FINISHED, this.handleIntroFinished);
    }

    render() {
        let display;
        if (this.state.isIntroFinished) {
            display = <ChapterOneIntro/>
        } else if (this.state.isChapterOneIntroFinished) {
            display = null;
        } else {
            display = <Intro/>
        }
        return (
            <div className="App">
                {display}
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
