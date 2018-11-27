import {EventEmitter} from "fbemitter";
import React, { Component } from 'react';
import './App.css';
import {CHAPTER_ONE_INTRO_FINISHED, PROGRESS_DIALOGUE} from './Constants';
import {CHAPTER_ONE_INTRO_TEXT, Owner} from "./Owner";
import {IntroBackgroundDoor} from "./IntroBackgroundDoor";

interface ChapterOneIntroState {
    displayTitle: boolean,
    displayOwner: boolean,
    ownerDialogueNumber: number
    emitter: EventEmitter
}

export class ChapterOneIntro extends Component<{}, ChapterOneIntroState> {
    constructor(props: any) {
        super(props);
        this.state = {
            displayTitle: true,
            displayOwner: false,
            ownerDialogueNumber: 0,
            emitter: new EventEmitter()
        };

        this.startOwnerDialogue = this.startOwnerDialogue.bind(this);
        this.progressOwnerDialogue = this.progressOwnerDialogue.bind(this);

        this.state.emitter.addListener(PROGRESS_DIALOGUE, this.progressOwnerDialogue)
    }

    componentDidMount() {
        this.progressOwnerDialogue(0);
    }

    render() {
        return (
            <div className="Intro">
                <div className="intro-owner-and-door">
                    <div className="owner">
                        <Owner speech={CHAPTER_ONE_INTRO_TEXT[this.state.ownerDialogueNumber]}/>
                    </div>
                    <div className="restaurant">
                        <IntroBackgroundDoor/>
                    </div>
                </div>
            </div>
        );
    }

    private startOwnerDialogue() {
        this.state.emitter.emit(PROGRESS_DIALOGUE, 0);
    }

    private progressOwnerDialogue(ownerDialogueNumber: number) {
        // If we have reached the end of the Owners dialogue then end the introduction
        if (ownerDialogueNumber === CHAPTER_ONE_INTRO_TEXT.length) {
            this.setState({
                displayOwner: false
            },
    () => {
                this.state.emitter.emit(CHAPTER_ONE_INTRO_FINISHED);
                this.state.emitter.removeAllListeners();
            })
        } else {
            this.setState({
                ownerDialogueNumber: ownerDialogueNumber
            });

            setTimeout(() => {
                this.state.emitter.emit(PROGRESS_DIALOGUE, ++ownerDialogueNumber);
            }, 7000)
        }
    }
}
