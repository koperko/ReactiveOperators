import React, { Component } from 'react';

import Examples from './examples'
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          slideIndex: 0,
        };
      }

      handleChange = (value) => {
        this.setState({
          slideIndex: value,
        });
      };

      render() {
          var examples = [{
              user: "koperko",
              ratings: { "srandista": {upvote: true}, "druhySrandista": {upvote: false} },
              code: "Tu by mohol byt nejaky example"
          }, {
              user: "koperko",
              ratings: { "srandista": {upvote: true}, "druhySrandista": {upvote: false} },
              code: "A aj tu by mohol byt nejaky"
          }]
          return (
            <div>
                {/* <Tabs
                onChange={this.handleChange}
                value={this.state.slideIndex}
                tabItemContainerStyle={{backgroundColor: "#212121"}}
                style={{"margin-bottom": 20}}>
                    <Tab label="DOCS" value={0} />
                    <Tab label="EXAMPLES" value={1} />
                </Tabs>
                <SwipeableViews
                index={this.state.slideIndex}
                onChangeIndex={this.handleChange}> */}
                    <div dangerouslySetInnerHTML={{__html: this.props.content}}>
                    </div>
                    {/* <div>
                        <Examples examples={examples} />
                    </div>
                </SwipeableViews> */}
            </div>
        );
      }



}
