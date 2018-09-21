import React, { Component } from "react";
import RecordController from './RecordController'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

export default class Header extends Component {

	render() {
		const title = this.props.title

		return (
			<div className="header">
				{ this.props.showSideBar ?  
					<FontAwesomeIcon className="icon menu" icon={ faAngleLeft } onClick={this.props.handleSideBar} /> :
					( this.props.isRecording ? null :
					<FontAwesomeIcon className="icon menu" icon={ faBars } onClick={this.props.handleSideBar} /> )
				}
				<RecordController keyPressed={this.props.keyPressed} handleSaveSong={this.props.handleSaveSong} handleRecord={this.props.handleRecord} isRecording={this.props.isRecording} isPlaying={this.props.isPlaying}/>
				<span>{title}</span>
			</div>
		);
	}
}