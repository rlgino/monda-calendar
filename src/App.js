import React, { useEffect } from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './pages/home';
import LoginPage from './pages/login';

function App() {
  useEffect(() => {

    return () => { }
  }, [])
  return (<>
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
  </>
  );
}

export default App;
