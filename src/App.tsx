import {EventEmitter} from 'fbemitter';
import React, {Component} from 'react';
import './App.css';
import {ChapterOneIntro} from "./ChapterOneIntro";
import {CHAPTER_ONE_INTRO_FINISHED, INTRO_FINISHED, START_GAME} from "./Constants";
import {Game} from './Game';
import {GameDisplay} from "./GameDisplay";
import {Intro} from './Intro';
import {Level} from './Level';

interface GameState {
    game: Game,
    isIntroFinished: boolean,
    isChapterOneIntroFinished: boolean,
    emitter: EventEmitter
}

class App extends Component<{}, GameState> {
    constructor(props: any) {
        super(props);
        this.state = {
            game: new Game(),
            isIntroFinished: false,
            isChapterOneIntroFinished: false,
            emitter: new EventEmitter()
        };

        this.handleIntroFinished = this.handleIntroFinished.bind(this);
        this.handleChapterOneIntroFinished = this.handleChapterOneIntroFinished.bind(this);
        this.handleCreatingNewGame = this.handleCreatingNewGame.bind(this);

        // TODO: is there a better solution for finding out when the Intro has finished other than EventEmitters?
        this.state.emitter.once(INTRO_FINISHED, this.handleIntroFinished);
        this.state.emitter.once(CHAPTER_ONE_INTRO_FINISHED, this.handleChapterOneIntroFinished);
        this.state.emitter.addListener(START_GAME, this.handleCreatingNewGame);
    }

    render() {
        let display;
        if (this.state.isIntroFinished && ! this.state.isChapterOneIntroFinished) {
            display = <ChapterOneIntro globalEmitter={this.state.emitter}/>
        } else if (this.state.isIntroFinished && this.state.isChapterOneIntroFinished) {
            display = <GameDisplay globalEmitter={this.state.emitter}/>;
            // TODO figure out a better way to ensure that the HTML element exists before starting the game
            setTimeout(() => {
                this.state.emitter.emit(START_GAME, Level.CHAPTER_ONE);
            }, 500);
        } else {
            display = <Intro globalEmitter={this.state.emitter}/>
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

    private handleChapterOneIntroFinished() {
        this.setState({
            isChapterOneIntroFinished: true
        })
    }

    private handleCreatingNewGame(level: Level): void {
        switch (level) {
            default:
                this.state.game.newGame(level, this.state.emitter);
        }
    }
}

export default App;
