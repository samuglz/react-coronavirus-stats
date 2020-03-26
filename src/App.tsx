import React, { useState, useEffect, useRef } from 'react';
import './styles/tailwind.css';
import { CountryApiService } from './services/CountryApiService';
import { Country } from './Models/Country';
import Summary from './components/Summary';
import List from './components/List';
import { orderBy } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faSortAmountDown,
   faVirus,
   faVirusSlash,
   faSkull,
   faTimes
} from '@fortawesome/free-solid-svg-icons';

function App() {
   const [countries, setCountries] = useState<Country[]>();
   const [filteredCountries, setFilteredCountries] = useState<Country[]>();
   const inputSearch = useRef<HTMLInputElement>(null);
   const [isFilterOpen, setIsFilterOpen] = useState(false);

   const refreshTime = 3600000; // 1 HOUR
   useEffect(() => {
      const apiService = new CountryApiService();
      apiService.getCountriesFromApi().then(data => {
         setCountries(data);
         setFilteredCountries(data);
         setInterval(() => {
            const apiService = new CountryApiService();
            apiService.getCountriesFromApi().then(data => {
               setCountries(data);
               setFilteredCountries(data);
            });
         }, refreshTime);
      });
   }, []);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilteredCountries(
         countries?.filter(country => {
            return country.combinedKey
               .toLowerCase()
               .includes(e.target.value.toLowerCase());
         })
      );
   };

   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         inputSearch.current?.blur();
      }
   };

   const handleClickFilterMenu = () => {
      setIsFilterOpen(!isFilterOpen);
   };

   const handleClick = (key: string) => {
      setFilteredCountries(orderBy(filteredCountries, key, 'desc'));
   };

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
                  <div key={index}>
                     <Summary
                        icon={
                           {
                              confirmed: faVirus,
                              deaths: faSkull,
                              recovered: faVirusSlash
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
                  </div>
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
                     className="shadow appearance-none border-l border-t border-b border-gray-700 rounded-l w-3/4 lg:w-3/5 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                     placeholder="Search by Country"
                     onChange={e => handleChange(e)}
                     onKeyPress={e => handleKeyPress(e)}
                     ref={inputSearch}
                  />
                  <button
                     className="shadow appearance-none border-r border-t border-b border-gray-700 text-gray-700 bg-gray-300 py-2 px-3 rounded-r mb-3 leading-tight focus:outline-none focus:shadow-outline"
                     onClick={() => handleClickFilterMenu()}
                  >
                     <FontAwesomeIcon
                        icon={isFilterOpen ? faTimes : faSortAmountDown}
                     />
                  </button>
                  {isFilterOpen && (
                     <div>
                        <form className="inline-block text-white">
                           <fieldset className="" id="filter">
                              {(Object.keys(counts) as Array<
                                 'recovered' | 'deaths' | 'confirmed'
                              >).map(key => (
                                 <span
                                    className="mx-6 md:mx-20"
                                    id={key}
                                    key={key}
                                 >
                                    <FontAwesomeIcon
                                       icon={
                                          {
                                             confirmed: faVirus,
                                             deaths: faSkull,
                                             recovered: faVirusSlash
                                          }[key]
                                       }
                                    />
                                    <input
                                       key={key}
                                       className="ml-2"
                                       type="radio"
                                       name="filter"
                                       onClick={() => handleClick(key)}
                                    />
                                 </span>
                              ))}
                           </fieldset>
                        </form>
                     </div>
                  )}
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
