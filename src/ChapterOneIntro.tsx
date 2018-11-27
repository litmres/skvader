import {EventEmitter} from "fbemitter";
import React, { Component } from 'react';
import './App.css';
import {CHAPTER_ONE_INTRO_FINISHED, PROGRESS_DIALOGUE} from './Constants';
import {IEmitterProps} from "./IEmitterProps";
import {IntroBackgroundDoor} from "./IntroBackgroundDoor";
import {CHAPTER_ONE_INTRO_TEXT, Owner} from "./Owner";

interface ChapterOneIntroState {
    ownerDialogueNumber: number
    emitter: EventEmitter
}

export class ChapterOneIntro extends Component<IEmitterProps, ChapterOneIntroState> {
    constructor(props: any) {
        super(props);
        this.state = {
            ownerDialogueNumber: 0,
            emitter: this.props.globalEmitter
        };

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
                    <div className="door">
                        <IntroBackgroundDoor/>
                    </div>
                </div>
            </div>
        );
    }

    private progressOwnerDialogue(ownerDialogueNumber: number) {
        // If we have reached the end of the Owners dialogue then end the introduction
        if (ownerDialogueNumber === CHAPTER_ONE_INTRO_TEXT.length) {
            this.state.emitter.emit(CHAPTER_ONE_INTRO_FINISHED);
            this.state.emitter.removeAllListeners(PROGRESS_DIALOGUE);
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
