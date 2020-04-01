import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Mapa } from '../../views/Map';
import Home from '../../views/Home';

const Routes = () => {
   return (
      <Switch>
         <Route exact path="/" component={Home} />
         <Route exact path="/map" component={Mapa} />
         <Route path="*">{/* TODO: 404 COMPONENT */}</Route>
      </Switch>
   );
};

export default Routes;
