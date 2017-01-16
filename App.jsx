import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import CodeMirror from './CodeMirror.jsx';
import JsCodeMirror from './JsCodeMirror.jsx';



class App extends React.Component {

  render()
  {
    return (
      <div>
        <AppBar title="CI" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
        <CodeMirror/>

      </div>
    );
  }
}

export default App;
