import React from 'react';
import Budget from './components/Budget';
import Spendings from './components/Spendings';
import PageNotfound from './components/PageNotFound';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <>
      <h1>Personal Spendings App</h1>
      <Router>
      <nav>
        <ul>
          <li>
            <Link to="/budget">Budget</Link>
          </li>
          <li>
            <Link to="/spendings">Spendings</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/" component={Budget} />
        <Route path="/budget" component={Budget} />
        <Route path="/spendings" component={Spendings} />
        <Route component={PageNotfound} />
      </Switch>
      </Router>
    </>
  );
}

export default App;
