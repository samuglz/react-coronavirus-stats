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
   const countConfirmed = countries?.reduce(
      (previousScore, currentScore) => previousScore + currentScore.confirmed,
      0
   );
   const countDeath = countries?.reduce(
      (previousScore, currentScore) => previousScore + currentScore.deaths,
      0
   );
   const countRecovered = countries?.reduce(
      (previousScore, currentScore) => previousScore + currentScore.recovered,
      0
   );
   return (
      <div>
         <div className="text-center lg:grid lg:grid-cols-3">
            <Summary
               title="Total Confirmados"
               count={countConfirmed ? countConfirmed : 0}
               color="yellow"
            />
            <Summary
               title="Total Muertos"
               count={countDeath ? countDeath : 0}
               color="red"
            />
            <Summary
               title="Total Recuperados"
               count={countRecovered ? countRecovered : 0}
               color="green"
            />
         </div>
      </div>
   );
}
export default App;
