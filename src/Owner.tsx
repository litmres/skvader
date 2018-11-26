import React, {Component} from "react";

/**
 * Original Ascii art by Art by Anthony Thyssen: https://www.asciiart.eu/people/faces
 */
export class Owner extends Component{
    private readonly asciiOwner = [
        "                           ;;;;;;;;;",
        "                        ;;;;;;;;;;;;;",
        "                   ;;;;;;;;;;;;;;;;;",
        "                ;;;;;;;;;;;;     ;;;;;",
        "               ;;;;;    ;;;         \\;;",
        "              ;;;;;      ;;          |;",
        "             ;;;;         ;          |",
        "             ;;;                     |",
        "              ;;                     )      .............................................",
        "               \\    ~~~~ ~~~~~~~    /       . ",
        "                \\    ~~~~~~~  ~~   /        . ",
        "              |\\ \\                / /|      . ",
        "               \\\\| %%%%%    %%%%% |//       .............................................",
        "              [[====================]]      ........",
        "               | |  ^   |   |  ^   | |     ......",
        "               | | :@:  |   |  :@: | |   ..... ",
        "                \\______ /   \\_______/  ....",
        "                 |     (@\\/@)     |  ...",
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
    private readonly textStartRow = 9;
    private readonly textStartColumn = 47;
    private readonly maxCharacterNum = 40;
    render() {
        let itemsList = this.asciiOwner.map(function(item){
            return <span>{item}<br/></span>;
        });
        return <pre>{ itemsList }</pre>
    }
}
