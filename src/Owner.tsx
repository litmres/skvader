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
        "              ;;;;;      ;;          |;     ............................................",
        "             ;;;;         ;          |      .                                          .",
        "             ;;;                     |      . ",
        "              ;;                     )      . ",
        "               \\    ~~~~ ~~~~~~~    /       . ",
        "                \\    ~~~~~~~  ~~   /        .                                          .",
        "              |\\ \\                / /|      .       [Press the return key to continue] .",
        "               \\\\| %%%%%    %%%%% |//       ............................................",
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
    private readonly maxCharacterNum = 40;

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
        this.addSpeechText(this.asciiOwner, this.props.speech);
        let itemsList = this.asciiOwner.map(function(item){
            return <span>{item}<br/></span>;
        });
        return <pre>{ itemsList }</pre>
    }
}
