import React, { Component } from 'react';

import {List} from 'material-ui/List';

import Paper from 'material-ui/Paper';
import OperatorPreview from './operatorPreview'

export default class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shown: (props.shown === true) ? true : false
        };
      }

      handleChange = (value) => {
        this.setState({
          slideIndex: value,
        });
      };

      render() {
          return (
              <Paper
                  style={{
                      "max-height": 500,
                      width: "60%",
                      top: 150,
                      position: "absolute",
                      zIndex: 100,
                      display: this.props.shown ? "block" : "none"
                  }}
                  zDepth={4}>
                  {/* <ul id="results"
                      style={{
                          overflow: "auto",
                          maxHeight: 500
                      }}> */}
                <List style={{
                    overflow: "auto",
                    maxHeight: 500
                }}>
                    {this.props.foundOperators
                        .map((item) => {
                            return (
                                <OperatorPreview
                                    searchTerm={this.props.searchTerm}
                                    foundIndex={item.foundIndex}
                                    content={item.html}
                                    name={item.name}
                                    onClick={this.props.clickHandler}/>
                            );
                        })
                    }
                </List>
                  {/* </ul> */}
              </Paper>
        );
      }



}
