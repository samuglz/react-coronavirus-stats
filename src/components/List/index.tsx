import React from 'react';
import { ListProps } from './index.d';
import ListElement from '../ListElement';

const List: React.FC<ListProps> = ({ countries }) => {
   return (
      <div>
         <div className="text-center">
            Listado de confirmados, muertes y recuperados por provincias
         </div>
         <div>
            {countries?.map((country, index) => {
               return <ListElement key={index} country={country} />;
            })}
         </div>
      </div>
   );
};

export default List;
