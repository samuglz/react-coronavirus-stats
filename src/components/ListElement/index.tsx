import React from 'react';
import { ListElementProps } from './index.d';

const ListElement: React.FC<ListElementProps> = ({ country }) => {
   return (
      <div className="text-center">
         <div>
            {country.provinceState
               ? `${country.provinceState} - ${country.countryRegion}`
               : `${country.countryRegion} - ${country.countryRegion}`}
         </div>
         <div className="md:grid md:grid-cols-3 flex flex-col">
            <span className="text-yellow-500 font-bold">
               {country.confirmed}
            </span>
            <span className="text-red-500 font-bold">{country.deaths}</span>
            <span className="text-green-500 font-bold">
               {country.recovered}
            </span>
         </div>
      </div>
   );
};

export default ListElement;
