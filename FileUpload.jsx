import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Editor, EditorState} from 'draft-js';
import {Sigma, LoadJSON} from 'react-sigma';
import Graph from './graph.jsx';
var yaml = require('js-yaml');

var data;
export default class FileUpload extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state={editorState: EditorState.createEmpty()};
		this.onChange = (editorState) => this.setState({editorState});
		this.handleChange = this.handleChange.bind(this);
	}


	
	handleChange(convert)
	{
		var temp = document.getElementById('filedata').files[0];
		var reader = new FileReader();

				reader.onload = function(e) {
					data =reader.result;
					console.log(data);
				}

				reader.readAsText(temp);
		
				
	}
	render()
	{
		
		return(
			<div>
				 <Graph />
			</div>
  			  );
	}
}
