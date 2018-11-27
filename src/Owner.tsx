import {createHash} from "crypto";
import React, {Component} from "react";
interface DialogueStateProps {
    dialogue :  string[],
    currentDialogueNumber: number,
    maxDialogueNumber: number
}

/**
 * Original Ascii art by Art by Anthony Thyssen: https://www.asciiart.eu/people/faces
 */
export class Owner extends Component<DialogueStateProps>{
    private readonly asciiOwner: string[] = [
        "                           ;;;;;;;;;",
        "                        ;;;;;;;;;;;;;",
        "                   ;;;;;;;;;;;;;;;;;",
        "                ;;;;;;;;;;;;     ;;;;;",
        "               ;;;;;    ;;;         \\;;",
        "              ;;;;;      ;;          |;     |==================================================================|",
        "             ;;;;         ;          |      |                                                                  |",
        "             ;;;                     |      | ",
        "              ;;                     )      | ",
        "               \\    ~~~~ ~~~~~~~    /       | ",
        "                \\    ~~~~~~~  ~~   /        |                                                                  |",
        "              |\\ \\                / /|      | ",
        "               \\\\| %%%%%    %%%%% |//       |==================================================================|",
        "              [[====================]]     ........",
        "               | |  ^   |   |   ^  | |    ......",
        "               | | :@:  |   |  :@: | |   ..... ",
        "                \\______ /   \\_______/  ....",
        "                 |     (@\\/@)     |   ...",
        "                /                  \\ .",
        "               /  ;______  ______;  \\",
        "               \\         \\/         /",
        "                )                  (",
        "               /                    \\",
        "               \\__                  /",
        "                \\_                _/",
        "                 \\______/\\/\\______/",
        "                  _|    /--\\    |_",
        "                 /%%\\  /\"'\"'\\  /%%\\",
        "  ______________/%%%%\\/\\'\"'\"/\\/%%%%\\",
        " / :  :  :  /  .\\%%%%%%%\\\"'/%%%%%%%/.  \\  :  :  : \\",
        ")  :  :  :  \\.  .\\%%%%%%/'\"\\%%%%%%/.  ./  :  :  :  (",
        ""
    ];
    private readonly textStartRow = 7;
    private readonly maxCharacterNum = 64;
    private readonly dialogueIndexRow = this.textStartRow + 4;

    /**
     *
     * @param speechText
     */
    private padTextForSpeechBubble(speechText: string): string {
        return speechText.padEnd(this.maxCharacterNum, " ");
    }
    private addDialogueText(ownerAscii: string[], speechText: string[], current: number, end: number) {
        ownerAscii[this.textStartRow] = ownerAscii[this.textStartRow] + this.padTextForSpeechBubble(speechText[0]) + " |";
        ownerAscii[this.textStartRow+1] = ownerAscii[this.textStartRow+1] + this.padTextForSpeechBubble(speechText[1]) + " |";
        ownerAscii[this.textStartRow+2] = ownerAscii[this.textStartRow+2] + this.padTextForSpeechBubble(speechText[2]) + " |";
        ownerAscii[this.dialogueIndexRow] = ownerAscii[this.dialogueIndexRow] + `[${current}\\${end}][Press the return key to continue]`.padStart(this.maxCharacterNum, " ") + " |";
    }
    render() {
        let template = Array.from(this.asciiOwner);
        this.addDialogueText(template, this.props.dialogue, this.props.currentDialogueNumber, this.props.maxDialogueNumber);
        let itemsList = template.map(function(item){
            const data = createHash('md5').update(item, 'ascii');
            return <span key={data.digest('hex')}>{item}<br/></span>;
        });
        return <pre>{ itemsList }</pre>
    }
}

export const INTRO_SPEECH_TEXT = [
    [
        "Hello, my name is Francisco Cuisinier. You may call me Chef.",
        "I'm the owner of this restaurant: Restaurant l' alimentation.",
        "The greatest restaurant in the world."
    ],
    [
        "I am a fantastic chef. I am world renowned.",
        "It is understandable why you came here looking for work.",
        "I can teach you all there is to know, but it will not be easy."
    ],
    [
        "Many have trained with me, but very few are successful.",
        "We will start with the very basics and see how you fair.",
        ""
    ],
    [
        "First things first, you must gather the necessary equipment.",
        "We have everything that you will need on these premises.",
        "I will show you where to start looking for the equipment..."
    ]
];

export const CHAPTER_ONE_INTRO_TEXT = [
    [
        "Here we are... the entrance to the storage room.",
        "Behind this door, you will find everything you need.",
        ""
    ],
    [
        "Restaurant l' alimentation is an old building.",
        "Like many old buildings it is full of mystery.",
        "l' alimentation contains many tunnels and hidden passages."
    ],
    [
        "The time has come for you to go and retrieve your equipment.",
        "Your task for today is to prepare the fruit and vegetables ",
        "for this evening's service."
    ],
    [
        "Since you're new, I'll tell you which equipment you will need",
        "to retrieve from the storage room: ",
        "1 Pairing Knife & 1 Potato Peeler."
    ],
    [
        "There's a lot of work to be done and time is marching on.",
        "I'll leave you to find the required equipment yourself.",
        "Remember: 1 Pairing Knife & 1 Potato Peeler..."
    ]
];
