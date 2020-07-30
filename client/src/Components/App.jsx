import '../App.css';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Profile from './Profile';
import Profileedit from './Profileedit';
import Messages from './Messages';
import Profilecreation from './Profilecreation';
import Footer from './Footer';


const { createApolloFetch } = require('apollo-fetch');

const apolloFetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

const getUserQuery = (id) => `{
    user(id: "${id}") {
      name
    }
  }`;

function App() {
  const [cookies] = useCookies(['accessToken']);
  const [state, setState] = useState({});
  useEffect(() => {
    if (cookies.accessToken) {
      setState({ loggedIn: true });

      const checkIfUserExist = async () => {
        const userData = await fetch('http://localhost:4000/checkuser', {
          headers: { Cookie: cookies.accessToken },
          credentials: 'include',
        }).then((res) => res.json());

        const userId = userData.id;
        const userExist = await apolloFetch({
          query: getUserQuery(userId),
        });
        if (userExist.data.user) {
          setState((prevState) => ({ ...prevState, userExist: true, userData }));
        } else {
          setState((prevState) => ({ ...prevState, userExist: false, userData }));
        }
      };
      checkIfUserExist();
    } else {
      setState({ loggedIn: false });
    }
  }, []);

  return (
    <div>
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/profile">
            <Profile userData={state.userData} />
          </Route>
          <Route path="/messages">
            <Messages userData={state.userData} />
          </Route>
          <Route path="/profileedit">
            <Profileedit userData={state.userData} />
          </Route>
          <Route path="/logout">
            <Logout userData={state.userData} />
          </Route>

          <Route exact path="/">
            {state.loggedIn ? (
              state.userExist ? (
                <Home userData={state.userData} />
              ) : (
                <Profilecreation userData={state.userData} />
              )
            ) : (
              <Login />
            )}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
    <div className="App__footer">
    <Footer></Footer>
    </div>
    </div>
  );
}

export default App;
