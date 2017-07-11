import React, { Component } from 'react';
import update from 'immutability-helper';
import InputComponent from './InputComponent.jsx'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';

import {inputElement} from '../models/inputElements'

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

export default class App extends Component {
	componentWillMount() {
		var element = new inputElement();
		element.isOrphan = true;
		this.state = { inputElements : [element] };
	}
	
	eventP(index, event) {
		this.setState({
			inputElements: update(this.state.inputElements, { $push: [ new inputElement() ] }),
		});
		this.state.inputElements[index].isOrphan = false;
		this.state.inputElements[index].isLast = false;
	}

	eventM(index, element) {
		if(this.state.inputElements.length - 1 === index) {
			this.state.inputElements[index - 1].isLast = true;
		}
		this.setState({
			inputElements: update(this.state.inputElements, { $splice: [[index, 1] ] })
		});

		if(this.state.inputElements.length - 1 == 1) {
			if(index === 0 ){
				this.state.inputElements[1].isOrphan = true;
			} else {
				this.state.inputElements[0].isOrphan = true;
			}
		}
	}

	change(event) {
		this.state.inputElements[event.target.dataset.index].value = event.target.value;
	}

	render() {
		const elementList = this.state.inputElements.map((element, index) => {
			return (
				<ListItem key={element.key}>
					<TextField 
						style={{ marginRight: 20 }}
						data-index={index} id="input-field"
						defaultValue={element.value} 
						onChange={(e) => this.change(e)}
					/>
					<RaisedButton 
						onClick={(event) => {this.eventM(index, event)}}
						style={(element.isOrphan ? {display : 'none'} : {} )}
						primary={true} label="-"
					/>
					<RaisedButton 
						onClick={(event) => {this.eventP(index, event)}} 
						style={(element.isLast ? {} : { display: 'none'})}
						secondary={true} label="+"/>
				</ListItem>
			);
		});
		return (
			<MuiThemeProvider>
				<Paper zDepth={5}>
					<List>{elementList}</List>
				</Paper>
			</MuiThemeProvider>
		);
	}
}