import React, { Component } from "react";

export default class Key extends Component {

	constructor(props) {
    	super(props);
    	this.note = this.props.note;
    	this.audio = new Audio(this.props.url);
  	}

  	// Reproduce note onClick
	handleClick = () => {
		this.audio.paused ? this.audio.play() : this.audio.cloneNode().play() // Supporting multiple repetitions
		this.props.handleKeyPressed(this.note)
	}

	render() {
		return (
			<rect key={this.props.note} className={this.props.className + " key"} x={this.props.x} y={this.props.y} onClick={this.handleClick} width={this.props.width} height={this.props.height}></rect>
		);
	}
}