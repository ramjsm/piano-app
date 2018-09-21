import React, { Component } from "react";

export default class SongDisplayer extends Component {

	constructor(props) {
		super(props)
		this.displayWidth = window.innerWidth
		this.displayHeight = window.innerHeight * 0.2
		this.playerSpeed = 0.01								// Modifies the counter in currentTime on player mode. Normal: 0.01 seconds
		this.noteDistance = 300								// Distance between notes	
		this.recordDisplacement = this.displayWidth - 50	// Distance at which the recorded notes appear initially
		this.playDisplacement = 15							// Distance at which the player bar and notes in songs are shifted
		this.state = {
			isPlaying: this.props.isPlaying,
			timeIndicatorPos: - this.recordDisplacement + 50,
			currentTime: 0,
			timeIndicatorClass: 'time-indicator'

		}
		this.displayerRef = React.createRef();
	}

  	componentDidUpdate(prevProps) {
  		// New song loaded
  		if ((this.props.song !== prevProps.song)) this.loadSongInDisplay()

  		// Handle playing control
  		if (this.props.isPlaying !== prevProps.isPlaying) {
 			if(this.props.isPlaying) {
 			 	this.interval = setInterval(() => this.handlePlayDisplay(), 10) // Fired record anmation each 10 miliseconds (set interval is always placed at event stack at 10ms)
 			} else {
 				clearInterval(this.interval)
 			}
  		}

  		// Handle recording control
  		if (this.props.isRecording !== prevProps.isRecording) {
 			if(this.props.isRecording) {
 				this.setState({timeIndicatorPos: -this.recordDisplacement + 50}) // Hide display bar
 			 	this.interval = setInterval(() => this.handleRecordDisplay(), 10)
 			} else {
 				clearInterval(this.interval)
 			}
  		}

  		// Handle reload
  		if ((this.props.reload !== prevProps.reload)) if(this.props.reload) this.loadSongInDisplay()
	}

	// Render notes in song or in recording mode
	renderkeysPlayed = () => {
		return this.props.keysPlayed.map((key) => {
			return <text className="note" key={key.time.toString()} x={(key.time * this.noteDistance) + this.playDisplacement} y={this.displayHeight/2}>{key.note}</text>
		})
	}

	// Display in record mode. The notes appears from right to left and the player bar is hidden
	handleRecordDisplay = () => {
		this.displayerRef.current.setAttribute("viewBox", (this.props.getSecondsSinceStart() * this.noteDistance) - this.recordDisplacement + " 0 " + this.displayWidth + " " + this.displayHeight) // Manipulate the svg to see all the notes
	}

	// Display in play mode. The notes appears from right to left and a player bar indicates the "correct time" to press the note
	handlePlayDisplay = () => {
		if(this.props.song.duration > this.state.currentTime) { 				// Play if the current time is less than the total duration of the song
			let newPosition = (this.state.currentTime * this.noteDistance)
			this.setState({
				currentTime: this.state.currentTime + this.playerSpeed,			// increment the timer
				timeIndicatorPos: newPosition + this.playDisplacement 			// Update player bar position
			})
			const key = this.props.keysPlayed.find(note => (this.state.currentTime - 0.005 < note.time) && (note.time < this.state.currentTime + 0.005)) // Search for a key played at current time 
			if(typeof key === "object") {
				this.props.simulateKeyPressed(key)			// Replay key
				this.setState({timeIndicatorClass: 'time-indicator-playing'})
				setTimeout(() => {this.setState({timeIndicatorClass: 'time-indicator'})}, 100); 
			} 
			this.displayerRef.current.setAttribute("viewBox", newPosition + " 0 " + this.displayWidth + " " + this.displayHeight)	// Manipulate the svg to see all the notes
		} else {
			this.props.handleSongOver() // Stop the song and show replay icon
			clearInterval(this.interval)
		}
	}

	// Show song into the Display
	loadSongInDisplay = () => {
		this.setState({
 			timeIndicatorPos: this.playDisplacement, // Reset Timer and Bar position
 			currentTime: 0
 		})

 		// Reset Svg position 
 		this.displayerRef.current.setAttribute("viewBox", this.resetDisplay())
	}

	// Get viewBox for reseting Display
	resetDisplay = () => {
		return "0 0 " + this.displayWidth + " " + this.displayHeight
	}

	render() {
		const renderkeysPlayed = this.renderkeysPlayed()
		const viewbox = this.resetDisplay()

		return (
			<svg ref={this.displayerRef} className="song-displayer" xmlns="http://www.w3.org/2000/svg" viewBox={viewbox}>
				<line className={this.state.timeIndicatorClass} x1={this.state.timeIndicatorPos} y1="0" x2={this.state.timeIndicatorPos} y2={this.displayHeight}/>
				{renderkeysPlayed}
			</svg>
			);
		}
	}