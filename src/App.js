import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Korisnici from './Korisnici/Pages/Korisnici';
import NoviPost from './Postovi/Pages/NoviPost';
import KorisnikPosts from './Postovi/Pages/KorisnikPosts'
import MainNavigation from './Shared/Components/Navigation/MainNavigation';
import UpdatePost from './Postovi/Pages/UpdatePost';
import Auth from './Korisnici/Pages/Auth';
import { AuthContext } from './Shared/context/auth-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  let routes;
  if (isLoggedIn) {
    routes = (
      <React.Fragment>
        <Route path="/" exact>
          <Korisnici />
        </Route>

        <Route path="/post/new" exact>
          <NoviPost />
        </Route>

        <Route path="/postovi/:postId" exact>
          <UpdatePost />
        </Route>

        <Route path="/:korisnikId/postovi" exact>
          <KorisnikPosts />
        </Route>
        <Redirect to = "/" exact>
        </Redirect>
      </React.Fragment>
    );

  } else {
    routes = (
      <React.Fragment>

        <Route path="/" exact>
          <Korisnici />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>

        <Route path="/:korisnikId/postovi" exact>
          <KorisnikPosts />
        </Route>
        <Redirect to = "/auth" exact>
        </Redirect>
        
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Switch>
            {routes}
          </Switch>
        </main>
      </Router>
    </AuthContext.Provider >
  );

};

export default App;
