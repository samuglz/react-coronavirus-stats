/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './styles/tailwind.css';
import './App.css';
import List from './components/List';
import { useAppContext } from './components/Store';
import { observer } from 'mobx-react-lite';
import { TotalCounts } from './components/TotalCounts';
import { CountryFilter } from './components/CountryFilter';
import { REFRESH_TIME } from './configFile';

function App() {
   const { appStore } = useAppContext();

   useEffect(() => {
      appStore.getCountriesFromApi();
      setInterval(() => {
         appStore.getCountriesFromApi();
      }, REFRESH_TIME);
   }, []);

   return (
      <div className="bg-gray-700 text-white font-bold p-5 overflow-hidden h-screen">
         <TotalCounts />
         {appStore.countries.length > 0 && (
            <div>
               <CountryFilter />
               {appStore.filteredCountries.length === 0 ? (
                  <div className="text-center">Country not found</div>
               ) : (
                  <List countries={appStore.filteredCountries} />
               )}
            </div>
         )}
      </div>
   );
}

export default observer(App);
