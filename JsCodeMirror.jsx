var React = require('react');
var ReactDOM = require('react-dom');
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
class JsCodeMirror extends React.Component
{
constructor(props)
{
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.check = this.check.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
		this.state={code:"//write js code here",mode:"javascript",isValid:false};

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
	 check(e) {
		 e.preventDefault();
		 var editwrap = document.getElementById("ace");
		 var annotation_lists=editwrap.env.document.$annotations;
		 var isValid=false;
		// console.log(editwrap.env.editor.session.annotations[1]);
  //  var annotation_lists = editor.getSession().getAnnotations();
    var has_error = false;

    // Unfortunately, you get back a list of lists. However, the first list is
    //   always length one (but not always index 0
    for (var l in annotation_lists) {
            var annotation = annotation_lists[l];
            console.log(annotation.type);
            if (annotation.type === "error") {
                has_error = true;
            }
        }
				console.log(has_error);
var that=this;

    if (has_error) {

that.setState({isValid:false});
    }
		else {
			that.setState({isValid:true});
		}
}

handleSubmit()
{	if(this.state.isValid)
	{	alert('YAML file submitted');

	}

	else{
		alert("Yaml is Still InValid");

}
}





	render () {


		return (
			<div>
				<AceEditor
					mode="javascript"
					theme="tomorrow"
					name="ace"
					id="ace"
					editorProps={{$blockScrolling: true}}
					value={this.state.code}
					setOptions={{

					}}

					style={{width:"500px"} ,{border:"1px solid black"}}
					/>
				<div className="upload">
				<input type="file" name="upload" onChange={this.handleChange} id='jsfiledata' />

				</div>
				<RaisedButton label="Next" secondary={true}  onClick={this.check.bind(this)} style={{marginLeft:"1%"}}/>
				<RaisedButton label="Next" secondary={true}  onClick={this.handleSubmit} style={{marginLeft:"1%"}}/>
			</div>

		);
	}
}

export default JsCodeMirror;
