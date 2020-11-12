import React from 'react';
import ImageList from './ImageList';
import Paging from './Paging';

export default class Content extends React.Component { 
  render() {
    return(
      <div style={{display: this.props.visibility}} className="content">
        {(this.props.data !== null && this.props.data.length !== 0) ? <ImageList data={this.props.data} /> : ""}
        {(this.props.data !== null && this.props.data.length !== 0) ? <Paging
          paging={{currentPage: this.props.currentPage, totalPages: this.props.data.totalPages}}  
          onPrevClick={this.props.onPrevClick}
          onNextClick={this.props.onNextClick}
        /> : ""}

        
      </div>
    ); 
  }
}