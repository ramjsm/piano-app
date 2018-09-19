import React, { Component } from "react";

export default class SaveSongForm extends Component {

	constructor(props) {
    	super(props);
    	this.state = {title: ''};
  	}

	handleChange = (e) => {
    	this.setState({title: e.target.value});
  	}

	handleSubmit = (e) => {
    	e.preventDefault();
    	this.props.handleSaveSong(this.state.title)
  	}

	render() {
		return (
			<div className="form-background">
				<form className="save-song" onSubmit={this.handleSubmit}>
					<input placeholder="Introduce a song title" onChange={this.handleChange}/>
					<input type="submit" value="Submit"/>
				</form>
			</div>
		);
	}
}