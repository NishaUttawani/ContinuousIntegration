var React = require('react');
var ReactDOM = require('react-dom');
var yamlLint = require('yaml-lint');
import RaisedButton from 'material-ui/RaisedButton';
import Graph from './graph.jsx';
import Dialog from 'material-ui/Dialog';
import brace from 'react-ace/node_modules/brace';
import AceEditor from 'react-ace';
import 'react-ace/node_modules/brace/mode/yaml';
import 'react-ace/node_modules/brace/theme/tomorrow';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import TransformationFunc from './TransformationFunc.jsx';


var doc;
var edge = new Array();
var node = new Array();

class TemplateEditor extends React.Component
{
	constructor(props)
	{
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleVerify = this.handleVerify.bind(this);
		this.updateCode = this.updateCode.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleVisualise = this.handleVisualise.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.state={open:false,graph:'',jsonCode:'',code:"//write your yml code here",err:[],isValid:false, isSubmit:false,buttonState:true}

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

	handleChange()  //for upload button
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

		handleVerify()
		{
			this.setState({buttonState:false});
			var that = this;
			yamlLint.lint(this.state.code).then(function () {
				that.setState({
					isValid: true
				});
				that.setState({err:[]	})
				alert('Valid File');
			}).catch(function (error) {
				var errtext=error.message;
				var startindex=error.message.indexOf("at line") + 8;
				var endindex=error.message.indexOf("column")-2;

				var errrow=error.message.substring(startindex,endindex)-1;
				var myerror=[{ row: errrow, column: 2, type: 'error', text:errtext }];
				that.setState({isValid:false});
				that.setState({err:myerror})
				alert('Invalid file!!! correct the error.');
				console.log(error.message);
			});

		}

		updateCode(newCode)
		{
			this.setState({code:newCode});
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
			var myerr=[{ row: 1, column: 2, type: 'error', text: 'Some error.'}];

			var box=null;

			if(this.state.isSubmit)
			{
				box= <TransformationFunc/>;
			}
			else
			{
				box= <div className="container">
					<AceEditor
						className="row"
						mode="yaml"
						theme="tomorrow"
						value={this.state.code}
						onChange={this.updateCode}
						name="UNIQUE_ID_OF_DIV"
						annotations={this.state.err}
						editorProps={{$blockScrolling: true}}
						style={{width:"500px"} ,{border:"1px solid black"}}
						/>
					<div className="row">
						<div className="upload ">
							<input type="file" name="upload" onChange={this.handleChange} id='filedata' />
						</div>
						<RaisedButton label="Verify" secondary={true}  onClick={this.handleVerify} style={{marginLeft:"1%"}}/>
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
		} //end of render
	} //end of class TemplateEditor

	export default TemplateEditor;
