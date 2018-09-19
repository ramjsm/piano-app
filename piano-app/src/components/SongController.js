import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faStop } from '@fortawesome/free-solid-svg-icons'

export default class SongController extends Component {

	render() {
		return (
			<div className="song-controller">
				{ 	this.props.isRecording || this.props.song === "Not loaded" ?
						null :
						this.props.isPlaying ? 
						<FontAwesomeIcon className="icon menu" icon={ faStop } onClick={this.props.handlePlayer} /> :
						<FontAwesomeIcon className="icon menu" icon={ faPlay } onClick={this.props.handlePlayer} />
				}
			</div>
		);
	}
}