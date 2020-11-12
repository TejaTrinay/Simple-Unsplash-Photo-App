import React from 'react';
import onClickOutside from "react-onclickoutside";
import '../resources/styles/List.css';


class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false, 
      collection: this.props.collection, 
      collectionId: this.props.collectionId, 
      ops: this.props.ops, 
    };
  
  }

  handleClickOutside = evt => {
    this.setState({listOpen: false});
  };

  toggleList(){ 
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  }
  
  onListItemClick(id, name) { 
    let newCollectionId = this.props.newCollectionId;
    let newCollection = this.state.collection;
    let newOps = this.state.ops;

    if (id === this.state.collectionId) { 
      newCollectionId = -1; 
      newCollection = this.props.collection;
      newOps = this.state.ops.map((item) => { 
        item.selected = false;
        return item;
      });
    }
    else { 
      newOps = this.state.ops.map((item) => { 
        item.selected = (item.id === id);
        return item;
      });
      newCollection = name; 
      newCollectionId = id;
    }

    this.setState({
      ops: newOps,
      collection: newCollection,
      collectionId: newCollectionId,
    });

    this.props.itemClicked(newCollectionId);
  }

  listOfSelect = () => {
    const list = this.state.ops.map((item, index) => {
      let selectedClass = "";
      if (item.selected) {
        selectedClass = "selected-item" 
      }
    
      return <li className={"col-name list-item" + ` ${selectedClass}`} key={item.id} value={item.id}  onClick={() => this.onListItemClick(item.id, item.name)}>{item.name}</li>
    });

    return <ul className="list">{list}</ul>
  }
  
  render() {
    return(
      <div className={"wrapper"}>
        <div className="shadow-div"></div>
        <div className={"col-name header-title" + (this.state.collectionId === -1 ? ` faded` : ``) + (this.state.listOpen ? ' list-open' : '')} onClick={() => this.toggleList()}>
          {this.state.collection}
                  <img className={"header-title-icon"} src={require("../resources/images/Polygon.png")} alt="😍" />
        </div>
        
        {this.state.listOpen && this.listOfSelect()}
      </div>
    );
  }
}

export default onClickOutside(List);