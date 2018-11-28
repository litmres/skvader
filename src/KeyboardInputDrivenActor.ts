import {Actor} from "./Actor";

export abstract class KeyboardInputDrivenActor extends Actor implements EventListenerObject {

    abstract handleMoveUp(): void;
    abstract handleMoveRight(): void;
    abstract handleMoveDown(): void;
    abstract handleMoveLeft(): void;
    abstract performAction(): void;

    protected constructor(_symbol: string, _transparent: boolean, _passable: boolean, _foregroundColor?: string, _backgroundColor?: string) {
        super(_symbol, _transparent, _passable, _foregroundColor, _backgroundColor);
        window.addEventListener("keydown", this);
    }

    handleEvent(evt: Event): void {
        if (evt instanceof KeyboardEvent) {
            let event: KeyboardEvent = evt as KeyboardEvent;
            switch (event.key) {
                case "w":
                case "ArrowUp":
                    this.handleMoveUp();
                    break;
                case "d":
                case "ArrowRight":
                    this.handleMoveRight();
                    break;
                case "s":
                case "ArrowDown":
                    this.handleMoveDown();
                    break;
                case "a":
                case "ArrowLeft":
                    this.handleMoveLeft();
                    break;
                case " ":
                case "Enter":
                    this.performAction();
                    break;
            }
        }
    }
}