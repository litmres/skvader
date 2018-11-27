import {EventEmitter} from 'fbemitter';
import React, {Component} from 'react';
import './App.css';
import {CHAPTER_ONE_INTRO_FINISHED, INTRO_FINISHED, START_GAME, TUTORIAL} from "./Constants";
import {Game} from './Game';
import {Intro} from './Intro';
import {ChapterOneIntro} from "./ChapterOneIntro";
import {GameDisplay} from "./GameDisplay";

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
            display = <GameDisplay/>;
            setTimeout(() => {
                this.state.emitter.emit(START_GAME, TUTORIAL);
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

    private handleCreatingNewGame(context: string) {
        if (context === TUTORIAL) {
            this.state.game.newGame();
        } else {
            this.state.game.newGame();
        }
    }
}

export default App;
