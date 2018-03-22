import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/search-bar';
import YTsearch from 'youtube-api-search';
import VideoList from './components/video-list';
import VideoDetail from './components/video-detail';
import _ from 'lodash';

const API_KEY = 'AIzaSyBz1HIN0FgaHIpyU1rv6-Vejixw93II74o'


class App extends Component {
constructor(props) {
  super(props);
  this.state={
    videos: [],
    selectedVideo: null
  }
this.videoSearch('banjo');
}

videoSearch(term) {
  YTsearch({key: API_KEY, term: term}, videos => {
    return this.setState({
      videos: videos,
      selectedVideo: videos[0]
    })
  })
}

  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);


    return (
      <div className="App">
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList 
          onVideoSelect={(selectedVideo) => this.setState({selectedVideo})}
          videos={this.state.videos}
          />
      </div>
    );
  }
}

export default App;
