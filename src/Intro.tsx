import {EventEmitter} from "fbemitter";
import React, { Component } from 'react';
import './App.css';
import {INTRO_FINISHED, PROGRESS_DIALOGUE, TITLE_FINISHED} from './Constants';
import {IEmitterProps} from "./IEmitterProps";
import {IntroBackgroundRestaurant} from "./IntroBackgroundRestaurant";
import {INTRO_SPEECH_TEXT, Owner} from "./Owner";
import {Title} from "./Title";

interface IntroState {
    displayTitle: boolean,
    displayOwner: boolean,
    ownerDialogueNumber: number
    emitter: EventEmitter
}

export class Intro extends Component<IEmitterProps, IntroState> {
    constructor(props: any) {
        super(props);
        this.state = {
            displayTitle: true,
            displayOwner: false,
            ownerDialogueNumber: 0,
            emitter: this.props.globalEmitter
        };

        this.startOwnerDialogue = this.startOwnerDialogue.bind(this);
        this.progressOwnerDialogue = this.progressOwnerDialogue.bind(this);

        this.state.emitter.once(TITLE_FINISHED, this.startOwnerDialogue);
        this.state.emitter.addListener(PROGRESS_DIALOGUE, this.progressOwnerDialogue);
    }

    componentDidMount() {
        // After showing the title screen for a short time, switch to displaying the owner and the dialogue
        setTimeout(() => {
            this.setState({
                displayTitle: false
            }, () => {
                this.state.emitter.emit(TITLE_FINISHED);
            });
        }, 2000)
    }

    render() {
        let display;
        if (this.state.displayTitle) {
            display = <Title />;
        } else if (this.state.displayOwner) {
            display = (
                <div className="intro-owner-and-restaurant">
                    <div className="owner">
                        <Owner speech={INTRO_SPEECH_TEXT[this.state.ownerDialogueNumber]}/>
                    </div>
                    <div className="restaurant">
                        <IntroBackgroundRestaurant/>
                    </div>
                </div>
            );
        }
        return (
            <div className="Intro">
                {display}
            </div>
        );
    }

    private startOwnerDialogue() {
        this.state.emitter.emit(PROGRESS_DIALOGUE, 0);
    }

    private progressOwnerDialogue(ownerDialogueNumber: number) {
        // If we have reached the end of the Owners introduction dialogue then end the introduction
        if (ownerDialogueNumber === INTRO_SPEECH_TEXT.length) {
            this.setState({
                displayOwner: false
            },
    () => {
                this.state.emitter.emit(INTRO_FINISHED);
                this.state.emitter.removeAllListeners(PROGRESS_DIALOGUE);
            })
        } else {
            if (ownerDialogueNumber === 0) {
                this.setState({
                    displayOwner: true
                })
            } else {
                this.setState({
                    ownerDialogueNumber: ownerDialogueNumber
                })
            }
            setTimeout(() => {
                this.state.emitter.emit(PROGRESS_DIALOGUE, ++ownerDialogueNumber);
            }, 7000)
        }
    }
}
