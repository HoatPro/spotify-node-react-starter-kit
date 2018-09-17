import React, { Component } from 'react';
import './App.css';

import Spotify from 'spotify-web-api-js';
const spotifyWebApi = new Spotify();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: {
        name: 'Not Checked',
        albumArt: ''
      }
    }
    if (token) {
      spotifyWebApi.setAccessToken(token);
      spotifyWebApi.addToMySavedAlbums(token);
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyWebApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
              name: response.item.name,
              image: response.item.album.images[0].url
            }
        });
      })
  }
  render() {
    return <div className="App">
        <a href="http://localhost:8888"> Login to Spotify </a>
        <div>Now Playing: {this.state.nowPlaying.name}</div>
        <div>

          <img src={this.state.nowPlaying.image} style={{ width: 100 }}  alt="image music are playing "/>
        </div>
        <button onClick={() => this.getNowPlaying()}>
          Check Now Playing
        </button>
      </div>;
  }
}

export default App;
