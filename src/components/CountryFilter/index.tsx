import React, { FC } from 'react';
import './countryFilter.css';
import { FilterInput } from '../FilterInput';
import { Filters } from '../Filters';

export const CountryFilter: FC = () => {
   return (
      <div>
         <h1 className="text-center text-2xl py-3">
            Stats by Province/State/Country
         </h1>
         <div className="text-black text-center pb-5">
            <FilterInput />
            <Filters />
         </div>
      </div>
   );
};
