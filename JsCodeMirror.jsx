var React = require('react');
var ReactDOM = require('react-dom');
var JsCodemirror = require('react-codemirror');
require('codemirror/mode/javascript/javascript');
import FlatButton from 'material-ui/FlatButton';

class JsCodeMirror extends React.Component
{
constructor(props)
{
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.state={code:"//write js code here",mode:"javascript"};

}

	handleChange()
	{
	  var that = this;
		var temp = document.getElementById('jsfiledata').files[0];
		var ext = temp.name.split('.').pop().toLowerCase();
		if(ext!="js")
		{
		    alert('Not a js file');
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




	render () {
		var options = {
			lineNumbers: true,
			mode: this.state.mode
		};

		return (
			<div>
				<JsCodemirror ref="editor" value={this.state.code}  options={options}  />
				<div className="upload">
				<input type="file" name="upload" onChange={this.handleChange} id='jsfiledata' />
				</div>
			</div>

		);
	}
}

export default JsCodeMirror;
