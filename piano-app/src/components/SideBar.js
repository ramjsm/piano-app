import React, { Component } from "react";
import posed from 'react-pose'

const Bar = posed.div({
  visible: { width: 300 , padding: '15px', x: '0%', opacity: 1 },
  hidden: { width: 0, padding: '0px', x: '-100%', opacity: 0 }
});

export default class SideBar extends Component {

	handleLoadSong = (e) => {
		this.props.handleSideBar()
		this.props.handleLoadSong(e.target.id)
	}

	createSongLists = (props) => {
		return this.props.songList.map((song) => <li key={song.id} id={song.id} onClick={this.handleLoadSong}>{song.title}</li>);
	}

	render() {
		return (
			<Bar className="sidebar" pose={this.props.showSideBar ? 'visible' : 'hidden'}>
				SELECT A SONGS
				<ul>
					{this.createSongLists()}
				</ul>
			</Bar>
		);
	}
}

