var React = require('react');
var ReactDOM = require('react-dom');
import AceEditor from 'react-ace';
var FlatButton = require('material-ui/FlatButton');
import RaisedButton from 'material-ui/RaisedButton';
import 'react-ace/node_modules/brace/mode/javascript';
import 'react-ace/node_modules/brace/theme/tomorrow';

class TransformationFunc extends React.Component
{
	constructor(props)
	{
		super(props);

		this.updateCode = this.updateCode.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleVerify = this.handleVerify.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state={code:"//write js code here",isValid:false, isSubmit:false};

	}

	updateCode(newCode)
	{
		this.setState({code:newCode});
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

		handleSubmit()
		{
			if(this.state.isValid)
			{	alert('Transformation function submitted');
				this.setState({
					isSubmit:true
				});
			}

			else{
				alert("Transformation Function is still Invalid");
			}

		}


		handleVerify()
		{
				console.log('hi');
		}


		render () {

			return (
				<div className="container">
					<AceEditor
						className="row"
						mode="javascript"
						theme="tomorrow"
						value={this.state.code}
						onChange={this.updateCode}
						name="UNIQUE_ID_OF_DIV"
						editorProps={{$blockScrolling: true}}
						style={{width:"500px"} ,{border:"1px solid black"}}
						/>

					<div className="row">
						<div className="upload ">
							<input type="file" name="upload" onChange={this.handleChange} id='jsfiledata' />
						</div>
						<RaisedButton label="Verify" secondary={true}  onClick={this.handleVerify} style={{marginLeft:"1%"}}/>
						<RaisedButton label="Submit" secondary={true} onClick={this.handleSubmit} style={{marginLeft:"1%"}} />

					</div>
				</div>

			);
		}
	}

	export default TransformationFunc;
