import React, { Component } from "react";

export default class WhiteKey extends Component {

	constructor(props) {
    	super(props);
    	this.note = this.props.note;
    	this.audio = new Audio(this.props.url)
    	this.state = {
    		class: "white-key"
    	}
  	}

  	// Key animation
  	keyPressAnimation = () => {
  		this.setState({class: 'white-key-pressed'})
  		this.audio.paused ? this.audio.play() : this.audio.cloneNode().play() // Supporting multiple repetitions
		setTimeout(() => { this.setState({class: 'white-key'}) }, 100);
  	}

  	// Trigger animation onClick and pass note to parent
	handleKeyPressed = () => {
		this.keyPressAnimation()
		this.props.handleKeyPressed(this.note)
	}

	componentDidUpdate(prevProps) { // Trigger animation if key is different and player is playing
		if ((this.props.simulateKeyPressed !== prevProps.simulateKeyPressed) && (prevProps.simulateKeyPressed.note === this.note) && this.props.isPlaying) 
			this.keyPressAnimation()
	}

	render() {
		return (
			<rect className={this.state.class} key={this.props.note} 
											   note={this.props.note} 
											   x={this.props.x} 
											   y={this.props.y} 
											   url={this.props.url} 
											   onMouseDown={this.handleKeyPressed}
											   width={this.props.width} 
											   height={this.props.height}/>
		);
	}
}