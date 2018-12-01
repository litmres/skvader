import {EventEmitter} from "fbemitter";
import React, { Component } from 'react';
import './App.css';
import {CHAPTER_ONE_INTRO_FINISHED, PROGRESS_DIALOGUE} from './Constants';
import {IEmitterProps} from "./IEmitterProps";
import {IntroBackgroundDoor} from "./IntroBackgroundDoor";
import {CHAPTER_ONE_INTRO_TEXT, Owner} from "./Owner";
import {AppHeader} from "./AppHeader";
import {Col, Grid, Row} from "react-bootstrap";

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
        this.handleSkipDialogue = this.handleSkipDialogue.bind(this);

        this.state.emitter.addListener(PROGRESS_DIALOGUE, this.progressOwnerDialogue);
        window.addEventListener("keydown", this.handleSkipDialogue);
    }

    componentDidMount() {
        this.progressOwnerDialogue(0);
    }

    render() {
        return (
            <div>
                <AppHeader designChoice={2}/>
                <Grid className="Intro" fluid={true}>
                    <Row className="intro-owner-and-door">
                        <Col xs={12} md={8} className="owner">
                            <Owner dialogue={CHAPTER_ONE_INTRO_TEXT[this.state.ownerDialogueNumber]} currentDialogueNumber={this.state.ownerDialogueNumber+1} maxDialogueNumber={CHAPTER_ONE_INTRO_TEXT.length}/>
                        </Col>
                        <Col xs={6} md={4} className="door">
                            <IntroBackgroundDoor/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

    private progressOwnerDialogue(ownerDialogueNumber: number) {
        // If we have reached the end of the Owners dialogue then end the introduction
        if (ownerDialogueNumber === CHAPTER_ONE_INTRO_TEXT.length) {
            this.state.emitter.emit(CHAPTER_ONE_INTRO_FINISHED);
            this.state.emitter.removeAllListeners(PROGRESS_DIALOGUE);
            window.removeEventListener("keydown", this.handleSkipDialogue);
        } else {
            this.setState({
                ownerDialogueNumber: ownerDialogueNumber
            });

            setTimeout(() => {
                this.state.emitter.emit(PROGRESS_DIALOGUE, ++ownerDialogueNumber);
            }, 7000)
        }
    }

    private handleSkipDialogue(event: KeyboardEvent) {
        if (event.key === "Enter") {
            this.progressOwnerDialogue(this.state.ownerDialogueNumber+1);
        }
    }
}
