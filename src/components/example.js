/**
 * Created by koper on 18.09.16.
 */
import React, { Component } from 'react';

import Satisfied from 'material-ui/svg-icons/action/thumb-up'
import Dissatisfied from 'material-ui/svg-icons/action/thumb-down'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import {green500, red500, green300, red300} from 'material-ui/styles/colors';


import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/theme/github';

export default class App extends Component {

    componentWillMount(){
        var example = this.props.example;
        this.state = {
            user: example.user,
            positive: 0,
            negative: 0,
            code: example.code
        }

        var positiveCnt = 0;
        var negativeCnt = 0;
        for (var key in example.ratings) {
          if (example.ratings.hasOwnProperty(key)) {
              if(example.ratings[key].upvote){
                  positiveCnt++;
              } else {
                  negativeCnt++;
              }
          }
        }

        this.setState({
            positive: positiveCnt,
            negative: negativeCnt
        });
    }

    render() {
        return (
            <Card
              style={{margin: 10}}>
                <CardHeader
                  title={this.state.user}
                  subtitle="Subtitle">
                    <div style={{float: "right"}}>Was this helpful?
                        <IconButton><Satisfied color={green500} hoverColor={green300}/></IconButton>{this.state.positive}
                        <IconButton><Dissatisfied color={red500} hoverColor={red300}/></IconButton>{this.state.negative}
                    </div>
                </CardHeader>
                {/* <CardText dangerouslySetInnerHTML={{__html: this.state.code}}> */}
                <CardText>
                    <AceEditor
                        name={"adad" + Math.random()}
                        theme="github"
                        mode="javascript"
                        value={this.state.code}
                        onChange={(content) => {this.setState({code: content})}}/>
                </CardText>
            </Card>
        );
    }
}
