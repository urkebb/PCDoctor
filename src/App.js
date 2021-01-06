import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Korisnici from './Korisnici/Pages/Korisnici';
import NoviPost from './Postovi/Pages/NoviPost';
import KorisnikPosts from './Postovi/Pages/KorisnikPosts'
import MainNavigation from './Shared/Components/Navigation/MainNavigation';
import UpdatePost from './Postovi/Pages/UpdatePost';
import Auth from './Korisnici/Pages/Auth';

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Korisnici />
          </Route>
          <Route path="/:korisnikId/postovi" exact>
            <KorisnikPosts />
          </Route>
          <Route path="/post/new" exact>
            <NoviPost />
          </Route>
          <Route path="/postovi/:postId" exact>
            <UpdatePost />
          </Route>
          <Route path="/auth" exact>
            <Auth /> 
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );

}

export default App;
