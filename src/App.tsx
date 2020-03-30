import React, { useEffect, useRef } from 'react';
import './styles/tailwind.css';
import './App.css';
import Summary from './components/Summary';
import List from './components/List';
import { orderBy } from 'lodash';
import className from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faSortAmountDown,
   faVirus,
   faVirusSlash,
   faSkull,
   faTimes
} from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from './components/Store';
import { observer } from 'mobx-react-lite';

function App() {
   // TO NEW COMPONENT
   const inputSearch = useRef<HTMLInputElement>(null);
   const { appStore } = useAppContext();
   const refreshTime = 3600000; // 1 HOUR

   useEffect(() => {
      appStore.getCountriesFromApi();
      setInterval(() => {
         appStore.getCountriesFromApi();
      }, refreshTime);
   }, []);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      appStore.setFilteredCountries(
         appStore.countries?.filter(country => {
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
      appStore.toggleFilterOpen();
      appStore.toggleInitialState();
   };

   const handleClick = (key: string) => {
      appStore.setCurrentOrder(key);
      appStore.setFilteredCountries(
         orderBy(appStore.filteredCountries, key, 'desc')
      );
   };

   return (
      <div className="bg-gray-700 text-white font-bold p-5 overflow-hidden h-screen">
         <div className="text-center gap-3 grid grid-cols-3">
            {appStore.countries.length > 0 &&
               (Object.keys(appStore.counts) as Array<
                  'recovered' | 'deaths' | 'confirmed'
               >).map((key, index) => (
                  <div key={index}>
                     {console.log(appStore.counts[key])}
                     <Summary
                        icon={
                           {
                              confirmed: faVirus,
                              deaths: faSkull,
                              recovered: faVirusSlash
                           }[key]
                        }
                        count={appStore.counts[key]}
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
         {appStore.countries.length > 0 && (
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
                     className="w-16 shadow appearance-none border-r border-t border-b border-gray-700 text-gray-700 bg-gray-300 py-2 px-3 rounded-r mb-3 leading-tight focus:outline-none focus:shadow-outline"
                     onClick={() => handleClickFilterMenu()}
                  >
                     <FontAwesomeIcon
                        icon={
                           appStore.isFilterOpen ? faTimes : faSortAmountDown
                        }
                     />
                  </button>
                  {appStore.isFilterOpen ? (
                     <div
                        className={className({
                           'pt-1': true,
                           'h-5': true,
                           customFadeIn: appStore.isFilterOpen
                        })}
                     >
                        <form className="text-white inline-block">
                           <fieldset className="" id="filter">
                              {(Object.keys(appStore.counts) as Array<
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
                                       className={className({
                                          'text-yellow-500':
                                             appStore.currentOrder === key &&
                                             key === 'confirmed',
                                          'text-red-500':
                                             appStore.currentOrder === key &&
                                             key === 'deaths',
                                          'text-green-500':
                                             appStore.currentOrder === key &&
                                             key === 'recovered'
                                       })}
                                    />
                                    <input
                                       key={key}
                                       className="ml-2"
                                       type="radio"
                                       name="filter"
                                       onClick={() => handleClick(key)}
                                       defaultChecked={
                                          appStore.currentOrder === key
                                       }
                                    />
                                 </span>
                              ))}
                           </fieldset>
                        </form>
                     </div>
                  ) : (
                     <div
                        className={className({
                           'pt-1': true,
                           'h-5': true,
                           customFadeOut:
                              !appStore.isFilterOpen &&
                              !appStore.isInitialState,
                           'opacity-0':
                              appStore.isInitialState || !appStore.isFilterOpen
                        })}
                     >
                        <form className="text-white inline-block">
                           <fieldset className="" id="filter">
                              {(Object.keys(appStore.counts) as Array<
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
                                       className={className({
                                          'text-yellow-500':
                                             appStore.currentOrder === key &&
                                             key === 'confirmed',
                                          'text-red-500':
                                             appStore.currentOrder === key &&
                                             key === 'deaths',
                                          'text-green-500':
                                             appStore.currentOrder === key &&
                                             key === 'recovered'
                                       })}
                                    />
                                    <input
                                       key={key}
                                       className="ml-2"
                                       type="radio"
                                       name="filter"
                                       onClick={() => handleClick(key)}
                                       defaultChecked={
                                          appStore.currentOrder === key
                                       }
                                    />
                                 </span>
                              ))}
                           </fieldset>
                        </form>
                     </div>
                  )}
               </div>
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
