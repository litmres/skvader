import React, {Component} from "react";
import {Title, TitleProps} from "./Title";
/**
 *
 */
export class AppHeader extends Component<TitleProps>{
    render() {
        return (
            <div className="Page-header">
                <Title forHeader={true} designChoice={this.props.designChoice}/>
            </div>
        )
    }
}
