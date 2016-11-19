import React, { Component } from 'react';
import Operator from "./operator";
import SearchResults from "./searchResults";
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import Paper from 'material-ui/Paper';
// import Rx from 'rxjs/Rx.js's
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/throttle'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


import axios from "axios";



export default class App extends Component {

    componentWillMount() {
            this.state = {
                currentIndex: 0,
                operators: [{
                    path: "",
                    html: "<h1>Loading</h1>"
                }],
                foundOperators: [],
                searchTerm: "",

            }
        var onLoaded = function (e) {
            var operators = JSON.parse(e.currentTarget.result);
            operators.map((value, index) => {
                value.foundIndex = index;
            })
            this.setState({
                currentIndex: Math.floor((Math.random() * operators.length)),
                operators: operators
            });
        };

        onLoaded = onLoaded.bind(this);

        chrome.runtime.getPackageDirectoryEntry(function (root) {
            root.getFile("operators.json", {}, function (fileEntry) {
                fileEntry.file(function (file) {
                    var reader = new FileReader();
                    reader.onloadend = onLoaded;
                    reader.readAsText(file);
                });
            });
        });


    }

    componentDidMount(){
        this.setupSearchbar();
    }


    setupSearchbar(){
        var foundOperators = [];
        var observable = Observable.fromEvent(this.searchBar.input, 'keyup')
            .map(() => {
                this.setState({
                    foundOperators: [],
                    searchTerm: this.searchBar.input.value
                });
                return ";";
            })
            .debounceTime(500)
            .subscribe(() => {
                Observable.from(this.state.operators)
                    .filter((operator) => {
                        return operator.html.toLowerCase().indexOf(this.searchBar.input.value.toLowerCase()) !== -1;
                    })
                    .toArray()
                    .subscribe((operators) => {
                        this.setState({
                            foundOperators: operators
                        });
                    });
            });
            console.log(this.searchBar);
            this.searchBar.input.onblur = () => {
                this.setState({
                    searchTerm: ""
                });
            };

    }

    showNext(){
        this.setState({
            currentIndex: (this.state.currentIndex+1) % this.state.operators.length
        });
    }

    showPrevious(){
        var newIndex = (this.state.currentIndex-1) % this.state.operators.length;
        if(newIndex < 0) newIndex = this.state.operators.length;
            this.setState({
                currentIndex: newIndex
            });
    }

    handleSearchResultClick(index){
            this.setState({
                currentIndex: index < this.state.operators.length ? index : 0,
                searchTerm: ""
            });
    }

    render() {
        return (
            <div className="mainContainer">
                <div className="left" style={{width: "20%", height: 100, textAlign: "center", position: "fixed"}}>
                    <IconButton
                        iconStyle={{width: 60, height: 60 }}
                        style={{ width: 120, height: 120, padding: 30, position: "fixed", left: "10%", top: 200}}
                        onClick={this.showPrevious.bind(this)}>
                        <ArrowBack />
                    </IconButton>
                </div>
                <div className="right" style={{width: "20%", height: 100, textAlign: "center", position: "fixed", right: 0}}>
                    <IconButton
                        iconStyle={{width: 60, height: 60 }}
                        style={{ width: 120, height: 120, padding: 30, position: "fixed", right: "10%", top: 200}}
                        onClick={this.showNext.bind(this)}>
                        <ArrowForward />
                    </IconButton>
                </div>
                <div className="main">
                    <TextField style={{"margin-bottom": 50, "line-height": 55, height: 80 }}
                        ref={(reference) => this.searchBar = reference}
                        name="searchbar"
                        hintText="Are you looking for something specific?"
                        fullWidth={true}
                        inputStyle={{"font-size": 30, height: 80}}
                        hintStyle={{"font-size": 30}}/>
                    <Operator content={this.state.operators[this.state.currentIndex].html}/>
                    <SearchResults
                        shown={this.state.searchTerm.length > 0}
                        operators={this.state.operators}
                        foundOperators={this.state.foundOperators}
                        searchTerm={this.state.searchTerm}
                        clickHandler={this.handleSearchResultClick.bind(this)}/>
                </div>
            </div>
        );
    }
}
