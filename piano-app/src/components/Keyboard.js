import React, { Component } from "react"
import WhiteKey from './WhiteKey'
import BlackKey from './BlackKey'

export default class Keyboard extends Component {

	// Props for 88 keys piano keyboard
	constructor(props) {
    	super(props)
    	this.whiteKeysNumber = 52
    	this.blackKeysNumber = 36
    	this.whiteKeyWidth = 20
    	this.whiteKeyHeight = window.innerHeight * 0.2
    	this.blackKeyWidth = 15
    	this.blackKeyHeight = this.whiteKeyHeight / 2
    	this.audioLibrary = this.getAudioLibrary()
  	}

  	// Create an audio library from the files in /media/grand-piano-mp3-sounds
	getAudioLibrary = () => {
	   	let audioLibrary = {}
	   	let r = require.context('../media/grand-piano-mp3-sounds', false, /\.(mp3)$/)
	   	audioLibrary = r.keys().map(r)
	   	const obj = {}

	   	// Rename keys in fetch
	   	audioLibrary.forEach((value) => {
    		let name = value.substring(value.indexOf("media") + 6, value.indexOf("."))
    		obj[name] = value
  		})

    	return obj
  	}

  	// Match note name with url sound in audio library
  	getAudioUrl = (note) => {
		return Object.entries(this.audioLibrary).find(entry => entry[0] === note )[1]
	}

	// Create set of white keys
	createWhiteKeys = () => {
		const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G']	// Notes in white keys
		let whiteKeys = []
		let octave = 0
		let counter = 0
		let note
		const y = -1

		for (let i = 0; i < this.whiteKeysNumber; i++) {

			// Create new octave
			if ( (octave === 0 && counter === 2) || (counter === notes.length)) {	// In first octave create only 2 keys or octave finished 	
				octave++
				counter = 0
			} 
			
			// On last key choose key C8
			if (octave === 8) counter = 2
			note = notes[counter] + octave

			// Apend white key
			whiteKeys.push(<WhiteKey key={note} 
									 note={note} 
									 x={i * this.whiteKeyWidth} 
									 y={y}
									 url={this.getAudioUrl(note)} 
									 handleKeyPressed={this.props.handleKeyPressed}
									 isPlaying={this.props.isPlaying}
									 simulateKeyPressed={this.props.simulateKeyPressed}
									 width={this.whiteKeyWidth} 
									 height={this.whiteKeyHeight}/>)
			counter++
		}

		return whiteKeys
	}

	//	Create set of black keys
	createBlackKeys = () => {
		let blackKeys = []
		let mode = "single"					// Modes: "single", "double", "triple"
		let counter = 0
		let notesInDouble = ['Db', 'Eb']		// Notes in octave in keys in pair
		let notesInTriple = ['Gb', 'Ab', 'Bb']	// Notes in octave in keys in triplet
		let octaveInDouble = 1					// Counter for octave in keys in pair
		let octaveInTriple = 1					// Counter for octave in keys in triplet
		let jump = 2							// Jump after creating each set of keys
		let y = -2
		
		let note, x
		for (let i = 0; i < this.blackKeysNumber; i++) {
			switch(mode) {
				case "single": // Create first key
					note = "Bb0"
					x = this.whiteKeyWidth - (this.blackKeyWidth/2)
					mode = "double"
					break;
				case "double": // Create keys in pair
					note = notesInDouble[counter] + octaveInDouble
					x = (i+jump)*this.whiteKeyWidth - ((this.blackKeyWidth)/2)
					counter++
					if(counter === 2) {
						counter = 0
						mode = "triple"
						octaveInDouble++
						jump++ 
					}
					break;
				case "triple": // Create keys in triplet
					note = notesInTriple[counter] + octaveInTriple
					x = (i+jump)*this.whiteKeyWidth - ((this.blackKeyWidth)/2)
					counter++
					if(counter === 3) {
						counter = 0
						mode = "double"
						octaveInTriple++
						jump++
					}
					break;
				default:
					break;
			}

			// Append black key
			blackKeys.push(<BlackKey key={note} 
									 note={note} 
									 x={x} 
									 y={y} 
									 url={this.getAudioUrl(note)} 
									 handleKeyPressed={this.props.handleKeyPressed}
									 simulateKeyPressed={this.props.simulateKeyPressed} 
									 isPlaying={this.props.isPlaying}
									 width={this.blackKeyWidth} 
									 height={this.blackKeyHeight}/>) 
		}

		return blackKeys
	}

	render() {
		const WhiteKeys = this.createWhiteKeys()
		const BlackKeys = this.createBlackKeys()
		const viewBox = "0 0 " + this.whiteKeyWidth * this.whiteKeysNumber + " " + this.whiteKeyHeight // Calculate Keyboard's width and height
		
		return (
			<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="keyboard" viewBox={viewBox}>
				<defs>
					<linearGradient id="white-key-gradient" x2="0" y2="1">
		    			<stop offset="0%" stopColor="#F5F5F5" />
		    			<stop offset="100%" stopColor="white" />
		  			</linearGradient>
		  			<linearGradient id="black-key-gradient" x2="0" y2="1">
		    			<stop offset="0%" stopColor="black" />
		    			<stop offset="100%" stopColor="#383838" />
		  			</linearGradient>
		  			<linearGradient id="white-key-hover-gradient" x2="0" y2="1">
		    			<stop offset="0%" stopColor="Plum" />
		    			<stop offset="100%" stopColor="white" />
		  			</linearGradient>
		  			<linearGradient id="black-key-hover-gradient" x2="0" y2="1">
		    			<stop offset="0%" stopColor="blueViolet" />
		    			<stop offset="100%" stopColor="black" />
		  			</linearGradient>
		  			<linearGradient id="white-key-pressed-gradient" x2="0" y2="1">
		    			<stop offset="0%" stopColor="DarkSlateBlue" />
		    			<stop offset="100%" stopColor="white" />
		  			</linearGradient>
		  			<linearGradient id="black-key-pressed-gradient" x2="0" y2="1">
		    			<stop offset="0%" stopColor="Purple" />
		    			<stop offset="100%" stopColor="black" />
		  			</linearGradient>
				</defs>
				{WhiteKeys}
				{BlackKeys}
			</svg>
		)
	}
}