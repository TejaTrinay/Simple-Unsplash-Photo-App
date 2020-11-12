import React from 'react';
import '../resources/styles/SearchHeader.css';

export default class SearchHeader extends React.Component {
  onButtonClick = (e) => {
    if(this.props.formdata.query.length === 0) {
      alert("Please enter a query")
    }
    else { 
      this.props.onButtonClick();
    }
  }

  searchHeaderForm = () => {
    return(
      <div className={`search-form inline-search-form`}>
        <div className="name">Teja.</div>
        <input 
          className={`input input-query inline-input-query`} 
          type="text" 
          name="query"
          value={this.props.formdata.query}
          onChange={this.props.onInputChange}
          placeholder="Type your query here" />
                
        <button 
          className={`input search-button inline-search-button`}
          onClick={this.onButtonClick.bind(this)}  
          type="submit">
            Search
          </button>
      </div> 
    );
  }

  render() {
    return(
      <header className="header inline-header">
          {this.searchHeaderForm() }
        </header>
    );
  }
}