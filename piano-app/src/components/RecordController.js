import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophoneAlt } from '@fortawesome/free-solid-svg-icons'
import { faStopCircle } from '@fortawesome/free-solid-svg-icons'

export default class RecordController extends Component {

	render() {
		const isRecording = this.props.isRecording

		return (
			<span className="record-controller">
			{ this.props.isPlaying ? null :
				isRecording ? 
				<FontAwesomeIcon className="icon" icon={ faStopCircle } onClick={this.props.handleRecord}/> :
				<FontAwesomeIcon className="icon" icon={ faMicrophoneAlt } onClick={this.props.handleRecord}/> 
			}
			</span>
			);
		}
	}