import React, { useState, useEffect } from 'react';
import './styles/tailwind.css';
import { CountryApiService } from './services/CountryApiService';
import { Country } from './Models/Country';
import Summary from './components/Summary';

function App() {
   const [countries, setCountries] = useState<Country[]>();
   useEffect(() => {
      const apiService = new CountryApiService();
      apiService.getCountriesFromApi().then(data => {
         setCountries(data);
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
      <div>
         <div className="text-center lg:grid lg:grid-cols-3">
            {counts &&
               (Object.keys(counts) as Array<
                  'recovered' | 'deaths' | 'confirmed'
               >).map(key => (
                  <Summary
                     title={`Total ${
                        {
                           confirmed: 'confirmados',
                           deaths: 'muertes',
                           recovered: 'recuperados'
                        }[key]
                     }`}
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
      </div>
   );
}
export default App;
