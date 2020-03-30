import { observer } from 'mobx-react-lite';
import React, { FC, useRef } from 'react';
import { useAppContext } from '../Store';
import { faTimes, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const FilterInput: FC = observer(() => {
   const { appStore } = useAppContext();
   const inputSearch = useRef<HTMLInputElement>(null);
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      appStore.setFilteredCountries(
         appStore.countries.filter(country => {
            return country.combinedKey
               .toLowerCase()
               .includes(e.target.value.toLowerCase());
         })
      );
   };

   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         inputSearch.current!.blur();
      }
   };

   const handleClickOpenFilter = () => {
      appStore.toggleFilterOpen();
      setTimeout(() => {
         appStore.toggleInitialState();
      }, 140);
   };
   return (
      <>
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
            onClick={() => handleClickOpenFilter()}
         >
            <FontAwesomeIcon
               icon={appStore.isFilterOpen ? faTimes : faSortAmountDown}
            />
         </button>
      </>
   );
});
