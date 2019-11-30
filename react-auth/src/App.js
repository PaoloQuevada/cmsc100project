import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/dashboard" component={Dashboard} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
