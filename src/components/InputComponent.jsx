import React, { Component } from 'react'
import TextField from 'material-ui/TextField';

export default class InputComponent extends Component {
	render() {
		return (
			<TextField
			id="text-field"
			onChange={() => this.props.onChange(this)}
			defaultValue={this.props.element.value}
			ref={(input) => this.input = input }
			/>
		);
	}
};