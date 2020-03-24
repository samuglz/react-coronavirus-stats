import React from 'react';
import { ListElementProps } from './index.d';

const ListElement: React.FC<ListElementProps> = ({ country }) => {
   return (
      <div className="text-center bg-gray-800 rounded mx-3 my-3 text-white p-3 shadow-xl lg:w-3/4 lg:mx-auto">
         <div className="font-bold text-xl mb-2">
            {country.provinceState
               ? `${country.provinceState} - ${country.countryRegion}`
               : `${country.countryRegion} - ${country.countryRegion}`}
         </div>
         <hr />
         <div className="md:grid md:grid-cols-3 flex flex-col p-2">
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
