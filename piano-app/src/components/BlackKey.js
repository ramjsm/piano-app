import React, { Component } from "react";
import Key from "./Key";

export default class BlackKey extends Component {

	constructor(props) {
    	super(props);
    	this.state = {
    		class: "black-key"
    	}
  	}

  	// Trigger animation onClick and pass note to parent
	handleKeyPressed = (note) => {
		this.interval = setInterval(() => this.setState({class: 'black-key-pressed'}), 1)
		setTimeout(() => { clearInterval(this.interval); this.setState({class: 'black-key'}); }, 100); 
		this.props.handleKeyPressed(note)
	}

	render() {
		return (
			<Key className={this.state.class} key={this.props.note} note={this.props.note} x={this.props.x} y={this.props.y} url={this.props.url} handleKeyPressed={this.handleKeyPressed} width={this.props.width} height={this.props.height}/>
		);
	}
}