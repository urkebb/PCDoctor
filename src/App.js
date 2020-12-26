import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Korisnici from './Korisnici/Pages/Korisnici';
import NoviPost from './Postovi/Pages/NoviPost';
import MainNavigation from './Shared/Components/Navigation/MainNavigation';

function App() {
  return (
  <Router>
    <MainNavigation />
      <main>
    <Switch>
    <Route path="/" exact>
      <Korisnici />
    </Route>
    <Route path="/post/new" exact>
      <NoviPost />
    </Route>
    <Redirect to="/" />
    </Switch>
    </main>
  </Router>
  );
  //Kurac picka sranje i jebavanje
}

export default App;
