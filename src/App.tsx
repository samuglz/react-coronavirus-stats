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
         <div className="lg:grid lg:grid-cols-3">
            <Summary
               title="Esto son los putos infectados"
               count={countConfirmed ? countConfirmed : 0}
            />
            <Summary
               title="Total Muertos"
               count={countDeath ? countDeath : 0}
            />
            <Summary
               title="Total Recuperados"
               count={countRecovered ? countRecovered : 0}
            />
         </div>
      </div>
   );
}
export default App;
