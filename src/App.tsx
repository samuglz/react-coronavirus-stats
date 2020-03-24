import React, { useState, useEffect } from 'react';
import './styles/tailwind.css';
import { CountryApiService } from './services/CountryApiService';
import { Country } from './Models/Country';
import Summary from './components/Summary';
import List from './components/List';

function App() {
   const [countries, setCountries] = useState<Country[]>();
   const [filteredCountries, setFilteredCountries] = useState<Country[]>();
   const refreshTime = 3600000; // 1 HORA
   useEffect(() => {
      const apiService = new CountryApiService();
      apiService.getCountriesFromApi().then(data => {
         setCountries(data);
         setFilteredCountries(data);
         setInterval(() => {
            // console.log('DENTRO DEL INTERVAL');
            const apiService = new CountryApiService();
            apiService.getCountriesFromApi().then(data => {
               setCountries(data);
               setFilteredCountries(data);
            });
         }, refreshTime);
      });
   }, []);
   const counts = countries?.reduce(
      (acc, country) => {
         return {
            confirmed: acc.confirmed + country.confirmed,
            deaths: acc.deaths + country.deaths,
            recovered: acc.recovered + country.recovered
         };
      },
      {
         confirmed: 0,
         deaths: 0,
         recovered: 0
      } as Pick<Country, 'recovered' | 'deaths' | 'confirmed'>
   );

   return (
      <div className="bg-gray-700 text-white font-bold p-5 overflow-y-hidden h-screen">
         <div className="text-center gap-3 grid grid-cols-3">
            {counts &&
               (Object.keys(counts) as Array<
                  'recovered' | 'deaths' | 'confirmed'
               >).map((key, index) => (
                  <Summary
                     key={index}
                     icon={
                        {
                           confirmed: 'faVirus',
                           deaths: 'faSkull',
                           recovered: 'faVirusSlash'
                        }[key]
                     }
                     count={counts[key]}
                     color={
                        {
                           confirmed: 'yellow',
                           deaths: 'red',
                           recovered: 'green'
                        }[key]
                     }
                  />
               ))}
         </div>
         {counts && (
            <div>
               <h1 className="text-center text-2xl py-3">
                  Stats by Province/State/Country
               </h1>
               <div className="text-black text-center pb-5">
                  <input
                     type="text"
                     name="search-input"
                     className="shadow appearance-none border border-gray-700 rounded w-3/4 lg:w-3/5 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                     placeholder="Search by Country"
                     onChange={e => {
                        setFilteredCountries(
                           countries?.filter(country => {
                              return country.countryRegion
                                 .toLowerCase()
                                 .startsWith(e.target.value.toLowerCase());
                           })
                        );
                     }}
                  />
               </div>
               {filteredCountries?.length === 0 ? (
                  <div className="text-center">Country not found</div>
               ) : (
                  <List countries={filteredCountries} />
               )}
            </div>
         )}
      </div>
   );
}
export default App;
