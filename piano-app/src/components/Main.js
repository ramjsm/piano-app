import React, { Component } from "react";
import Header from './Header';
import Keyboard from './Keyboard';
import Song from './Song';
import SaveSongForm from './SaveSongForm'
import Footer from './Footer';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
	uri: "http://localhost:4000/"
});


export default class Main extends Component {
	
	constructor(props) {
    	super(props);
    	//this.keyPressed = ""
    	this.state = {
    		title: "Welcome :) Load or record a song.",
    		isRecording: false,
    		isPlaying: false,
    		isSongOver: false,
    		startTime: "",
			duration: "",
			keysPlayed: [],
			showSaveForm: false,
			keyPressed: ""
    	}
  	}

  	// Simulate a key pressed
  	handlesimulateKeyPressed = (key) => {
  		this.setState({keyPressed: key })
  	}

  	// Store key pressed in keysPlayed
  	handleKeyPressed = (note) => {
  		this.setState({keyPressed: note })

  		if(this.state.isRecording) {
  			// Serverless version 
  			//this.setState(state => {return {keysPlayed: [...this.state.keysPlayed, {note: note, time: this.getSecondsSinceStart()}]}})
  			
  			// Store key and get id from serve
  			client.mutate({
  				variables: { note: note, time: this.getSecondsSinceStart() },
  				mutation: gql`
  				mutation addKey($note: String, $time: Float){
  					addKey(note: $note, time: $time) {
  						id
  					}
  				}
  				`,

  			})
  			.then(result => this.setState(state => {return {keysPlayed: [...this.state.keysPlayed, {id: result.data.addKey.id, note: note, time: this.getSecondsSinceStart()}]}}))
  		}
  	}

  	// Init and stop the recording process 
  	handleRecord = () => {
		if(this.state.isRecording) {
			this.setState({
				isRecording: false,
				duration: this.getSecondsSinceStart(),
				showSaveForm: true	// Open save form
			})
		} else {
			this.setState({
				isRecording: true,
				startTime: + new Date(),
				keysPlayed: [],
			})
		}
	}

	// Control the player
	handlePlayer = () => {
		this.state.isPlaying ? this.setState({isPlaying: false}) : this.setState({isPlaying: true})
	}

	// Collect the data to store and send to parent
	handleSaveSong = (title) => {
		this.props.handleSaveSong({
			id: this.props.storedSongs.length + 1,
			title: title,
			startTime: this.state.startTime,
			keysPlayed: this.state.keysPlayed,
			duration: this.state.duration
		})

		this.setState({
			showSaveForm: false,	// Close save form
			startTime: "",
			keysPlayed: []
		})	
	}

	// Stop player if song list is open
	handleSideBar = () => {
		if(this.state.isPlaying && !this.props.showSideBar) this.setState({isPlaying: false})
		this.props.handleSideBar()
	}

	// Handle song over
	handleSongOver = () => {
			this.setState({ isSongOver: true, isPlaying: false})
	}

	// Handle song reload
	handleSongReload = () => {
			this.setState({ isSongOver: false, isPlaying: true})
	}

	// Get time elapsed since song recording started
	getSecondsSinceStart = () => {
		return ((+ new Date()) - this.state.startTime)/1000
	}

	componentDidUpdate(prevProps) {
  		if ((this.props.song !== prevProps.song)) { //Update title in header and notes in display
 			this.setState({
 				keysPlayed: this.props.song.keysPlayed,
 				title: this.props.song.title,
 				isSongOver: false,
 				isPlaying: false,
 			})
  		}
	}
	
	render() {
		return (
			<div className='main'>
				<Header handleSideBar={this.handleSideBar} 
						handleSaveSong={this.props.handleSaveSong} 
						keyPressed={this.keyPressed} 
						handleRecord={this.handleRecord} 
						isRecording={this.state.isRecording}
						isPlaying={this.state.isPlaying}
						title={this.state.title}
						showSideBar={this.props.showSideBar}
						/>

	        	<Keyboard handleKeyPressed={this.handleKeyPressed} simulateKeyPressed={this.state.keyPressed} isPlaying={this.state.isPlaying} />
	        	
	        	<Song keysPlayed={this.state.keysPlayed}
	        		  handlePlayer={this.handlePlayer}
	        		  isRecording={this.state.isRecording}
	        		  isPlaying={this.state.isPlaying}
	        		  isSongOver={this.state.isSongOver}
	        		  song={this.props.song}
	        		  getSecondsSinceStart={this.getSecondsSinceStart}
	        		  simulateKeyPressed={this.handlesimulateKeyPressed}
	        		  handleSongOver={this.handleSongOver}
	        		  handleSongReload={this.handleSongReload} />

		        	{ this.state.showSaveForm ?
						<SaveSongForm handleSaveSong={this.handleSaveSong}/> : null
		        	}
					
				<Footer/>
			</div>
		);
	}
}