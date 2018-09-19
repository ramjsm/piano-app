import React, { Component } from "react";
import SongController from './SongController'
import SongDisplayer from './SongDisplayer'

export default class Song extends Component {

	render() {
		return (
			<div className="song">
				<SongController handlePlayer={this.props.handlePlayer} isPlaying={this.props.isPlaying} isRecording={this.props.isRecording} song={this.props.song} />
				<SongDisplayer 	handlePlayer={this.props.handlePlayer} 
								isPlaying={this.props.isPlaying}
								isRecording={this.props.isRecording} 
								keysPlayed={this.props.keysPlayed} 
								song={this.props.song} 
								getSecondsSinceStart={this.props.getSecondsSinceStart}/>
			</div>
		);
	}
}