/**
 * Created by koper on 18.09.16.
 */
import React, { Component } from 'react';
import Example from './example'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {green500} from 'material-ui/styles/colors';


import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/theme/github';

export default class App extends Component {

    componentWillMount(){
        this.state = {
            open: false,
            code: ""
        };
    }



    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    isData(){
        return this.props.examples;
    }

    renderNothing(){
        return (<div>Zadejte nejdříve nějaké město</div>);
    }

    render() {
        if(!this.isData()) {
            return this.renderNothing();
        }
        return (
                <div>
                    <Dialog
                      title="Dialog With Actions"
                      modal={false}
                      open={this.state.open}
                      onRequestClose={this.handleClose}>
                      <AceEditor
                          name={"adad" + Math.random()}
                          theme="github"
                          mode="javascript"
                          onChange={(content) => {this.setState({code: content})}}/>
                    </Dialog>
                    <RaisedButton primary={true} style={{backgroundColor: green500}} fullWidth={true} label="ADD EXAMPLE" onTouchTap={this.handleOpen} />
                    {this.props.examples.map(item => {
                        return (
                            <Example example={item} />
                        )
                    })}
                </div>
        );
    }
}
