import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import React from 'react';
import TemplateEditor from '../component/TemplateEditor.jsx';
class App extends React.Component {

  render()
  {
    return (
      <div>
        <AppBar title="CI" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
        <TemplateEditor/>


      </div>
    );
  }
}

export default App;
