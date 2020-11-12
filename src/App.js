import React, { Component } from 'react';
import Axios from 'axios';

import SearchHeader from './components/SearchHeader';
import Content from './components/Content';
import './resources/styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_made: '', 
      imgList: null, 
      query: '', 
      collectionName: 'Collections',
      collection: -1, 
      currentPage: 1,
    }
  }

  onInputChange = (e) => { 
    this.setState({[e.target.name]: e.target.value})
  }

  itemClicked = (newId) => { 
    this.setState({collection: newId});
  }

  onButtonClick = () => {
    this.setState({
      search_made: "inline", 
    });
    console.log(this.state);
    this.loadImages();     

  }

  loadImages = () => { 
    Axios({
      method: 'get',
      url: 'https://api.unsplash.com/search/photos',
      params: {
        client_id: '-kra4EwBxAjDkEexMDOo90c4e6MnIjvQtE-FMDk-93M', 
        collections: this.state.collection,
        query: this.state.query,
        per_page: 100,
        page: this.state.currentPage,
      }
    })
    .then(reponse => {
      console.log(reponse);
      this.setState({imgList: reponse.data});
    })
    .catch(err => {
     
      console.log(err);
    })
  }

  onNextClick = () => {
    let nextPage = this.state.currentPage + 1;
    this.setState({
      currentPage: nextPage,
    });
    this.loadImages();
  }

  onPrevClick = () => {
    let nextPage = this.state.currentPage - 1;
    this.setState({
      currentPage: nextPage,
    });
    this.loadImages();
  }
  
  render() {
    return (
      <div className="App">
        <SearchHeader 
          formdata={{query: this.state.query, collection: this.state.collectionName, collectionId: this.state.collection}}
          inline={this.state.search_made} 
          itemClicked={this.itemClicked.bind(this)}
          onInputChange={this.onInputChange.bind(this)}
          onButtonClick={this.onButtonClick.bind(this)}
          />
          <Content 
            visibility={this.state.search_made!=='' ? "block" : "none"} 
            data={this.state.imgList}
            currentPage={this.state.currentPage}  
            onPrevClick={this.onPrevClick}
            onNextClick={this.onNextClick}
          />
      </div>
    );
  }
}

export default App;