import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';
import { KudoTest } from './components/KudoTest';

import { vodka } from './utils/client';

import './style.css';

export default function App() {
    // let id = useParams().id;

    return (
        <Router>
            <Switch>
                <Route exact path="/"><div>Ahoj, toto je main routa, tu mozno raz daco bude, mozno nie :P</div></Route>
                <Route path="/priklad">
                    <div>Priklad na inu route </div>
                </Route>
                <Route path="/event/:id">
                    <div> <KudoTest/></div>
                </Route>
            </Switch>
        </Router>
    );
}


ReactDOM.render(<App/>, document.getElementById('example'));
// vodka();
