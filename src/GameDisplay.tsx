import {EventEmitter} from "fbemitter";
import React, {Component} from "react"
import {Button, Col, Grid, Modal, PageHeader, Row, Well} from "react-bootstrap";
import {IEmitterProps} from "./IEmitterProps";
import {
    CHAPTER_ONE_FINISHED,
    DISPLAY_TUTORIAL_MESSAGE,
    DISPLAY_ZOOM_IN,
    DISPLAY_ZOOM_OUT, ITEM_ADDED_TO_INVENTORY, START_CHAPTER_TWO_DIALOGUE,
    USER_DISMISSED_TUTORIAL_MESSAGE
} from "./Constants";
import {InventoryItems} from "./InventoryItems";
import {CollectableItem} from "./CollectableItem";

interface GameDisplayState {
    gameDisplayClass: string
    inventoryDisplayClass: string
    emitter: EventEmitter
    showModal: boolean
    modalTitle: string
    modalBody: string
    showInventory: boolean,
    inventory: CollectableItem[]
}

const GAME_DISPLAY_LAYOUT_CLASSES: string = "border rounded";
const INVENTORY_DISPLAY_LAYOUT_CLASSES: string = "";

export class GameDisplay extends Component<IEmitterProps, GameDisplayState> {

    constructor(props: any) {
        super(props);
        this.state = {
            gameDisplayClass: GAME_DISPLAY_LAYOUT_CLASSES,
            inventoryDisplayClass: INVENTORY_DISPLAY_LAYOUT_CLASSES,
            emitter: this.props.globalEmitter,
            showModal: false,
            modalBody: "",
            modalTitle: "",
            showInventory: false,
            inventory: []
        };

        this.handleZoomIn = this.handleZoomIn.bind(this);
        this.handleResetZoom = this.handleResetZoom.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleLevelCompleted = this.handleLevelCompleted.bind(this);
        this.handleInventoryUpdated = this.handleInventoryUpdated.bind(this);

        this.state.emitter.addListener(DISPLAY_ZOOM_IN, this.handleZoomIn);
        this.state.emitter.addListener(DISPLAY_ZOOM_OUT, this.handleResetZoom);
        this.state.emitter.addListener(DISPLAY_TUTORIAL_MESSAGE, this.handleShowModal);
        this.state.emitter.addListener(CHAPTER_ONE_FINISHED, this.handleLevelCompleted);
        this.state.emitter.addListener(ITEM_ADDED_TO_INVENTORY, this.handleInventoryUpdated);
    }

    render() {
        return (
            <div>
                <PageHeader className="Page-header">SKVADER</PageHeader>
                <div id="Game-content">
                    <Grid fluid={true}>
                        <Row>
                            <Col xs={12} md={8} className="Game-display-container">
                                <div id="Game-display" className={this.state.gameDisplayClass}>
                                </div>
                            </Col>
                            <Col xs={6} md={4} className="Inventory-display-container" hidden={! this.state.showInventory}>
                                <div id="Inventory-display" className={this.state.inventoryDisplayClass}>
                                    <h1>Inventory</h1>
                                    <Well className="Inventory-container" bsSize="small">
                                        <InventoryItems items={this.state.inventory}/>
                                    </Well>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                    <div className="Modal-wrapper">
                        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>{this.state.modalTitle}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div dangerouslySetInnerHTML={{__html: this.state.modalBody}} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.handleCloseModal}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }

    private handleZoomIn() {
        this.setState({
            gameDisplayClass: GAME_DISPLAY_LAYOUT_CLASSES + " Zoom-in"
        });
    }

    private handleResetZoom() {
        this.setState({
            gameDisplayClass: GAME_DISPLAY_LAYOUT_CLASSES
        });
    }

    private handleShowModal(title: string, message: string) {
        this.setState({
            showModal: true,
            modalTitle: title,
            modalBody: message
        })
    }

    private handleCloseModal() {
        this.state.emitter.emit(USER_DISMISSED_TUTORIAL_MESSAGE);
        this.setState({
            showModal: false,
            modalTitle: "",
            modalBody: ""
        });
    }

    private handleInventoryUpdated(item: CollectableItem) {
        if(! this.state.showInventory) {
            this.setState({
                showInventory: true
            });
        }
        this.setState(prevState => ({
            inventory: [...prevState.inventory, item]
        }))
    }

    private handleLevelCompleted() {
        this.state.emitter.removeAllListeners(DISPLAY_ZOOM_IN);
        this.state.emitter.removeAllListeners(DISPLAY_ZOOM_OUT);
        this.state.emitter.removeAllListeners(DISPLAY_TUTORIAL_MESSAGE);
        this.state.emitter.removeAllListeners(CHAPTER_ONE_FINISHED);
        this.setState({
            gameDisplayClass: "Level-completed"
        }, () => {
            setTimeout(() => this.state.emitter.emit(START_CHAPTER_TWO_DIALOGUE), 1000);
        });
    }
}
