import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';

function insertIntoString(source, insertedString, index){
    return source.slice(0, index) + insertedString + source.slice(index);
}

export default class OperatorPreview extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
      }



      render() {
          var contentString = this.props.content.replace(/<(?:.|\n)*?>/gm, '');
          var index = contentString.toLowerCase().indexOf(this.props.searchTerm.toLowerCase());
          var startIndex = index > 40 ? index - 30 : 0;
          var endIndex = index + this.props.searchTerm.length + 200;
          if(endIndex >= contentString.length){
              endIndex = contentString.length - 1;
          }
          contentString = contentString.slice(startIndex, endIndex);
          index = index - startIndex;
          contentString = insertIntoString(contentString, "</span>", index+this.props.searchTerm.length);
          contentString = insertIntoString(contentString, "<span style=\"font-weight: bold; color: green\">", index);
          contentString = "..." + contentString + "..."
          return (
            //   <li onClick={() => {
            //       console.log("clicked index: " + this.props.foundIndex);
            //       this.props.onClick(this.props.foundIndex);
            //   }}>
            //     <h2>{this.props.name}</h2>
            //     <div  dangerouslySetInnerHTML={{__html: contentString}}></div>
            //   </li>

                <ListItem
                 primaryText={this.props.name}
                 secondaryText={<div dangerouslySetInnerHTML={{__html: contentString}}></div>}
                 onClick={() => {
                       this.props.onClick(this.props.foundIndex);
                   }}/>

          );
      }



}
