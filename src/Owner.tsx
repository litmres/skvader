import React, {Component} from "react";

interface TextStateProps { speech :  string[] }

/**
 * Original Ascii art by Art by Anthony Thyssen: https://www.asciiart.eu/people/faces
 */
export class Owner extends Component<TextStateProps>{
    private readonly asciiOwner: string[] = [
        "                           ;;;;;;;;;",
        "                        ;;;;;;;;;;;;;",
        "                   ;;;;;;;;;;;;;;;;;",
        "                ;;;;;;;;;;;;     ;;;;;",
        "               ;;;;;    ;;;         \\;;",
        "              ;;;;;      ;;          |;     ....................................................................",
        "             ;;;;         ;          |      .                                                                  .",
        "             ;;;                     |      . ",
        "              ;;                     )      . ",
        "               \\    ~~~~ ~~~~~~~    /       . ",
        "                \\    ~~~~~~~  ~~   /        .                                                                  .",
        "              |\\ \\                / /|      .                               [Press the return key to continue] .",
        "               \\\\| %%%%%    %%%%% |//       ....................................................................",
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

    /**
     *
     * @param speechText
     */
    private padTextForSpeechBubble(speechText: string): string {
        return speechText.padEnd(this.maxCharacterNum, " ");
    }
    private addSpeechText(ownerAscii: string[], speechText: string[]) {
        ownerAscii[this.textStartRow] = ownerAscii[this.textStartRow] + this.padTextForSpeechBubble(speechText[0]) + " .";
        ownerAscii[this.textStartRow+1] = ownerAscii[this.textStartRow+1] + this.padTextForSpeechBubble(speechText[1]) + " .";
        ownerAscii[this.textStartRow+2] = ownerAscii[this.textStartRow+2] + this.padTextForSpeechBubble(speechText[2]) + " .";
    }
    render() {
        let template = Array.from(this.asciiOwner);
        this.addSpeechText(template, this.props.speech);
        let itemsList = template.map(function(item){
            return <span>{item}<br/></span>;
        });
        return <pre>{ itemsList }</pre>
    }
}

export const INTRO_SPEECH_TEXT = [
    [
        "Hello, my name is Francisco Cuisinier.",
        "I'm the owner of this restaurant: Restaurant l' alimentation.",
        "The greatest restaurant in the world."
    ],
    [
        "I am a fantastic chef.",
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
