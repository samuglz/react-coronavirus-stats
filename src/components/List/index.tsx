import React from 'react';
import { ListProps } from './index.d';
import ListElement from '../ListElement';

const List: React.FC<ListProps> = ({ countries }) => {
   return (
      <div className="overflow-y-scroll" style={{ height: '60vh' }}>
         {countries?.map((country, index) => {
            return <ListElement key={index} country={country} />;
         })}
      </div>
   );
};

export default List;
