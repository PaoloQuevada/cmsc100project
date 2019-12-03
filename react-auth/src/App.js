import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/dashboard" component={Dashboard} />
		  <Route exact={true} path="/profile" component={Profile} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
