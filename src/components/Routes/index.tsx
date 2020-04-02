import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Mapa } from '../../views/Map';
import Home from '../../views/Home';

const Routes = () => {
   return (
      <Switch>
         <Route exact path="/" component={Home} />
         <Route exact path="/map" component={Mapa} />
         <Route path="*">
            <div className="text-6xl w-screen h-screen flex justify-center items-center">
               <h1>Error 404: Página no encontrada</h1>
            </div>
         </Route>
      </Switch>
   );
};

export default Routes;
