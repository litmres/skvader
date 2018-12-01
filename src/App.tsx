import {EventEmitter} from 'fbemitter';
import React, {Component} from 'react';
import './App.css';
import {ChapterOneIntro} from "./ChapterOneIntro";
import {
    CHAPTER_ONE_INTRO_FINISHED,
    CHAPTER_TWO_INTRO_FINISHED,
    INTRO_FINISHED,
    START_CHAPTER_TWO_DIALOGUE,
    START_GAME
} from "./Constants";
import {Game} from './Game';
import {GameDisplay} from "./GameDisplay";
import {Intro} from './Intro';
import {Level} from './Level';
import {ChapterTwoIntro} from "./ChapterTwoIntro";

interface GameState {
    game: Game,
    isIntroFinished: boolean,
    isChapterOneIntroFinished: boolean,
    isChapterOneFinished: boolean,
    isChapterTwoIntroFinished: boolean,
    isGameOver: boolean,
    emitter: EventEmitter
}

class App extends Component<{}, GameState> {
    constructor(props: any) {
        super(props);
        this.state = {
            game: new Game(),
            isIntroFinished: false,
            isChapterOneIntroFinished: false,
            isChapterOneFinished: false,
            isChapterTwoIntroFinished: false,
            isGameOver: false,
            emitter: new EventEmitter()
        };

        this.handleIntroFinished = this.handleIntroFinished.bind(this);
        this.handleChapterOneIntroFinished = this.handleChapterOneIntroFinished.bind(this);
        this.handleCreatingNewGame = this.handleCreatingNewGame.bind(this);
        this.handleChapterTwoDialogueStart = this.handleChapterTwoDialogueStart.bind(this);
        this.handleChapterTwoIntroFinished = this.handleChapterTwoIntroFinished.bind(this);

        // TODO: is there a better solution for finding out when the Intro has finished other than EventEmitters?
        this.state.emitter.once(INTRO_FINISHED, this.handleIntroFinished);
        this.state.emitter.once(CHAPTER_ONE_INTRO_FINISHED, this.handleChapterOneIntroFinished);
        this.state.emitter.once(START_CHAPTER_TWO_DIALOGUE, this.handleChapterTwoDialogueStart);
        this.state.emitter.once(CHAPTER_TWO_INTRO_FINISHED, this.handleChapterTwoIntroFinished);
        this.state.emitter.addListener(START_GAME, this.handleCreatingNewGame);
    }

    render() {
        let display;
        if (this.state.isGameOver) {

        } else if (this.state.isChapterTwoIntroFinished) {
            display = <GameDisplay globalEmitter={this.state.emitter}/>;
            // TODO figure out a better way to ensure that the HTML element exists before starting the game
            setTimeout(() => {
                this.state.emitter.emit(START_GAME, Level.CHAPTER_TWO);
            }, 500);
        } else if (this.state.isChapterOneFinished) {
            display = <ChapterTwoIntro globalEmitter={this.state.emitter}/>
        } else if (this.state.isChapterOneIntroFinished) {
            display = <GameDisplay globalEmitter={this.state.emitter}/>;
            // TODO figure out a better way to ensure that the HTML element exists before starting the game
            setTimeout(() => {
                this.state.emitter.emit(START_GAME, Level.CHAPTER_ONE);
            }, 500);
        } else if (this.state.isIntroFinished) {
            display = <ChapterOneIntro globalEmitter={this.state.emitter}/>
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

    private handleChapterTwoDialogueStart(inventorySize: number) {
        if (inventorySize === 2) {
            this.setState({
                isChapterOneFinished: true
            });
        } else {
            console.log("GAME OVER");
        }
    }

    private handleChapterTwoIntroFinished() {
        this.setState({
            isChapterTwoIntroFinished: true
        })
    }
}

export default App;
