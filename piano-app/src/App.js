import React, { Component } from 'react';
import { ApolloProvider } from "react-apollo";
import './styles/App.css';
import Main from './components/Main';
import SideBar from './components/SideBar';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
	uri: "http://localhost:4000/"
});

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showSideBar: false,
			storedSongs: [],
			song: "Not loaded"
		}
	}

	// Fetch songs from server
	fetchSongs = () => {
		client
		.query({
			query: gql`

			{
				songs {
					id
					title
					duration
					keysPlayed{
						id
						note
						time
					}
				}
			}

			`
		})
		.then(result => this.setState({storedSongs: result.data.songs}))
	}

	// Toogle sidebar
	handleSideBar = () => {
		this.state.showSideBar ? this.setState({showSideBar: false}) : this.setState({showSideBar: true})
	}

	// Store new song
	handleSaveSong = (newSong) => {
		// Serverless
		//this.setState(state => {return {storedSongs: [...state.storedSongs, newSong]}})

		client.mutate({
  				variables: { title: newSong.title, duration: newSong.duration, keysPlayed: newSong.keysPlayed.map((key) => key.id)},
  				mutation: gql`
  				mutation addSong($title: String, $duration: Float, $keysPlayed: [ID!]){
  					addSong(title: $title, duration: $duration, keysPlayed: $keysPlayed) {
  						id
  					}
  				}
  				`,

  			})
  			.then(result => this.setState(state => {return {
  				storedSongs: [...state.storedSongs, newSong],
  				song: newSong
  			}}))
	}

	// Load a song
	handleLoadSong = (id) => {
		this.setState({song: this.state.storedSongs.find(song => {return song.id === id})})
	}

	componentDidMount() {
		this.fetchSongs();
	}

	render() {
		return (
			<ApolloProvider client={client}>
				<div className="App">
					<SideBar songList={this.state.storedSongs} 
							 handleLoadSong={this.handleLoadSong} 
							 showSideBar={this.state.showSideBar} 
							 handleSideBar={this.handleSideBar} />

					<Main 	handleSideBar={this.handleSideBar} 
							handleSaveSong={this.handleSaveSong} 
							storedSongs={this.state.storedSongs} 
							song={this.state.song} 
							showSideBar={this.state.showSideBar} />
				</div>
			</ApolloProvider>
			);
	}
}

export default App;
