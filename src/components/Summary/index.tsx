import React from 'react';
import { SummaryProps } from './index.d';

const Summary: React.FC<SummaryProps> = ({ count, title }) => {
   return (
      <div>
         <h5 className="text-sm">{title}</h5>
         <span className="font-bold text-yellow-300 text-6xl">{count}</span>
      </div>
   );
};

export default Summary;
