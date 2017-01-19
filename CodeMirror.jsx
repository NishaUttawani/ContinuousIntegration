var React = require('react');
var ReactDOM = require('react-dom');
var Codemirror = require('react-codemirror');
require('codemirror/mode/yaml/yaml');
require('codemirror/mode/javascript/javascript');
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import JsCodeMirror from './JsCodeMirror.jsx';
var yamlLint = require('yaml-lint');
import RaisedButton from 'material-ui/RaisedButton';
import Graph from './graph.jsx';
import Dialog from 'material-ui/Dialog';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/yaml';
import 'brace/theme/tomorrow';


var yaml = require('js-yaml');
var fs   = require('fs');
var doc;
var edge = new Array();
var node = new Array();

class CodeMirror extends React.Component
{
constructor(props)
{
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleCompile = this.handleCompile.bind(this);
		this.updateCode = this.updateCode.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleVisualise = this.handleVisualise.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.onChange = this.onChange.bind(this);
		this.state={open:false,graph:'',jsonCode:'',code:"//write your yml code here",mode:"yaml",readOnly:true,err:'',isValid:false, isSubmit:false,buttonState:true}

}

onChange(newValue) {
console.log('change',newValue);
}
	handleClose()
	{
		this.setState({open:false});
	}
	split()
	{
		var obj = doc.stages;
		var x = 100,y=100;
		var jsonArray=[];

		var array = Object.getOwnPropertyNames(obj);
		var json= {"nodes":[],"edges":[]};
		for(var i=0;i<array.length;i++)
		{
			var temp = {
				id: i+1,
				title : array[i],
				x: x,
				y: y,
				type:"empty"
			};
			x+=100;
			y+=100;
			json.nodes.push(temp);
			node.push(array[i]);
			edge.push(obj[array[i]].depends_on);
		}


			for(var i in node)
			{
				if(edge[i]!=null)
				{
					if(edge[i].length<2)
					{


					//console.log(node[i] + " index "+(node.indexOf(node[i])+1) +" depends_on "+ (node.indexOf(edge[i].toString())+1));
					var temp = {
						source:node.indexOf(node[i])+1,
						target:(node.indexOf(edge[i].toString())+1),
						type:"emptyEdge"
					}
					json.edges.push(temp);
					}
					else
					{
						for(var k in edge[i])
						{
							//console.log("separate printing====>"+node.indexOf(edge[i][k]));
							//console.log(node[i] +" index "+node.indexOf(node[i])+" depends_on "+ edge[i][k]+" index "+node.indexOf(edge[i][k]));
							var temp = {
						source:(node.indexOf(node[i])+1),
						target:(node.indexOf(edge[i][k])+1),
						type:"emptyEdge"
								}
								json.edges.push(temp);
						}
					}
				}


			}
	console.log(json);
	this.setState({jsonCode:json});
	console.log("json Code"+this.state.jsonCode);
	var temp = <Graph data={json}/>
	this.setState({graph:temp});
	this.setState({open:true});

	}
	handleVisualise()
	{
		doc = yaml.safeLoad(this.state.code);
		console.log(doc);
		this.split();
	}

	handleChange()
	{
	  var that = this;
		var temp = document.getElementById('filedata').files[0];
		var ext = temp.name.split('.').pop().toLowerCase();
		if(ext!="yml")
		{
		    alert('Not a yml file');
		}
		else{
			var reader = new FileReader();
			reader.onload = function(e) {

			that.setState({
				code:reader.result });
				}
		 reader.readAsText(temp);
		}

	 }
	 handleCompile()
	 {
	 	this.setState({buttonState:false});
	 	var that = this;
		 yamlLint.lint(this.state.code).then(function () {
			 that.setState({
				 isValid: true
			 });
			 console.log('Valid YAML file.');
			 that.setState({err:'Valid file'});
		 }).catch(function (error) {
			 console.error('Invalid YAML file.',error);
			var t=error.message.indexOf("at line");
			var m=error.message.indexOf("column");
			console.log(error.message.substring(t+8,m-2));
			 that.setState({isValid:false});
			 that.setState({err:error.name+''+error.reason+''+error.message});

		 });

	 }

	updateCode(newCode)
	{
    this.setState({code:newCode});
		//console.log(this.state.code);
	}

		handleSubmit()
		{	if(this.state.isValid)
			{	alert('YAML file submitted');
				this.setState({
					isSubmit:true
				});
			}

			else{
				alert("Yaml is Still InValid");
			}

		}


	render () {

		const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
		var options = {
			lineNumbers: true,
			mode: this.state.mode
		};
		var options1 = {
			lineNumbers: false,
			mode: this.state.mode,
			readOnly: this.state.readOnly
		};

		var box=null;
		if(this.state.isSubmit){
			 box= <JsCodeMirror/>;
		}
		else{

			box= <div className="container">
			<div className="row">
				<AceEditor
					mode="yaml"
					theme="tomorrow"
					onChange={this.updateCode}
					name="UNIQUE_ID_OF_DIV"

					editorProps={{$blockScrolling: true}}
					value={this.state.code}
					setOptions={{

					}}

					style={{width:"500px"} ,{border:"1px solid black"}}
					/>
			</div>
			<div className="row">
				<div className="upload ">
				<input type="file" name="upload" onChange={this.handleChange} id='filedata' />
				</div>
				<RaisedButton label="Next" secondary={true}  onClick={this.handleCompile} style={{marginLeft:"1%"}}/>
				<RaisedButton label="Submit" secondary={true} onClick={this.handleSubmit} style={{marginLeft:"1%"}} />
				<RaisedButton label="Visualise" secondary={true} disabled={this.state.buttonState}onClick={this.handleVisualise} style={{marginLeft:"1%"}} />

				<Dialog
          			title="Dialog With Actions"
          			 actions={actions}
         			 modal={false}
         			 open={this.state.open}
         			 onRequestClose={this.handleClose}>
          				{this.state.graph}
       	</Dialog>
			</div>

			</div>
	}


		return (
			<div>

				{box}
			</div>

		);
	}
}

export default CodeMirror;
