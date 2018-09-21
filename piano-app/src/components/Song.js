import React, { Component } from "react";
import SongController from './SongController'
import SongDisplayer from './SongDisplayer'

export default class Song extends Component {

	constructor(props) {
    	super(props);
    	this.state = {reload: false}
  	}

  	// Reload the can
	handleReload = () => {
    	this.setState({reload: true})
    	this.props.handleSongReload()
  	}

  	// Make reload posible and pass handler to parent
  	handleSongOver = () => {
  		this.setState({reload: false})
  		this.props.handleSongOver()
  	}

	render() {
		return (
			<div className="song">
				<SongController handlePlayer={this.props.handlePlayer}
								handleReload={this.handleReload}
								isPlaying={this.props.isPlaying} 
								isRecording={this.props.isRecording} 
								isSongOver={this.props.isSongOver}
								song={this.props.song} />

				<SongDisplayer 	handlePlayer={this.props.handlePlayer} 
								isPlaying={this.props.isPlaying}
								isRecording={this.props.isRecording}
								isSongOver={this.props.isSongOver} 
								keysPlayed={this.props.keysPlayed} 
								song={this.props.song}
								reload={this.state.reload} 
								getSecondsSinceStart={this.props.getSecondsSinceStart}
								simulateKeyPressed={this.props.simulateKeyPressed}
								handleSongOver={this.handleSongOver} />
			</div>
		);
	}
}