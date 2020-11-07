import React, { useEffect } from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './pages/home';
import LoginPage from './pages/login';
import { UserProvider } from './context/user-context';

function App() {
  useEffect(() => {

    return () => { }
  }, [])
  return (<>
    <UserProvider>
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  </>
  );
}

export default App;
