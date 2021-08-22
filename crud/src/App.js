import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Cadastrar } from './pages/Cadastrar';
import { Visualizar } from './pages/Visializar';
import { Editar } from './pages/Editar';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cadastrar" component={Cadastrar} />
          <Route exact path="/visualizar/:id" component={Visualizar} />
          <Route exact path="/editar/:id" component={Editar} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
