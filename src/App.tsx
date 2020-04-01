/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './styles/tailwind.css';
import './App.css';
import { useAppContext } from './components/Store';
import { observer } from 'mobx-react-lite';
import { REFRESH_TIME } from './configFile';
import Routes from './components/Routes';

// TODO: HACER NAVBAR

function App() {
   const { appStore } = useAppContext();

   useEffect(() => {
      appStore.getCountriesFromApi();

      setInterval(() => {
         appStore.getCountriesFromApi();
      }, REFRESH_TIME);
   }, []);

   return (
      <>
         <Routes />
      </>
   );
}

export default observer(App);
