import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import KudoEvent from './components/KudoEvent/KudoEvent';

import './style.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div>Ahoj, toto je main routa, tu mozno raz daco bude, mozno nie :P</div>
        </Route>
        <Route path="/priklad">
          <div>Priklad na inu route </div>
        </Route>
        <Route path="/event/:id" component={KudoEvent} />
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
