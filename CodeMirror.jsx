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




class CodeMirror extends React.Component
{
constructor(props)
{
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleCompile = this.handleCompile.bind(this);
		this.updateCode = this.updateCode.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state={code:"//write code here",mode:"yaml",readOnly:true,err:'',isValid:false, isSubmit:false}

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
			console.log(reader.result);
			that.setState({
				code:reader.result });
				}
		 reader.readAsText(temp);
		}

	 }
	 handleCompile()
	 {	var that = this;
		 yamlLint.lint(this.state.code).then(function () {
			 that.setState({
				 isValid: true
			 });
			 console.log('Valid YAML file.');
			 that.setState({err:'Valid file'});
		 }).catch(function (error) {
			 console.error('Invalid YAML file.', error);
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
				<Codemirror className="col-xs-6" ref="editor" value={this.state.code} onChange={this.updateCode} options={options} id="txtCode"/>
				<Codemirror className="col-xs-6" ref="editor2" value={this.state.err} options={options1}/>
			</div>
			<div className="row">
				<div className="upload ">
				<input type="file" name="upload" onChange={this.handleChange} id='filedata' />
				</div>
				<RaisedButton label="Next" secondary={true}  onClick={this.handleCompile} style={{marginLeft:"1%"}}/>
				<RaisedButton label="Submit" secondary={true} onClick={this.handleSubmit} style={{marginLeft:"1%"}} />
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
