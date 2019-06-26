import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import routes from './routes';
import './scss/App.scss';

class App extends React.Component {
  render() {
    return (
        <Router>
          <div className="container">
            <Switch>
              {routes}
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
