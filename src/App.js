import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Korisnici from './Korisnici/Pages/Korisnici';
import NoviPost from './Postovi/Pages/NoviPost';

function App() {
  return (
  <Router>
    <Switch>
    <Route path="/" exact>
      <Korisnici />
    </Route>
    <Route path="/post/new" exact>
      <NoviPost />
    </Route>
    <Redirect to="/" />
    </Switch>
  </Router>
  );
}

export default App;
