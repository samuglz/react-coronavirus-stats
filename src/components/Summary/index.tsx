import React from 'react';
import { SummaryProps } from './index.d';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Summary: React.FC<SummaryProps> = ({ count, icon = faTimes, color }) => {
   const summaryStyle = `font-bold text-${color}-500 text-xl md:text-6xl`;
   return (
      <div className="bg-gray-800 rounded-lg py-3">
         <div>
            <FontAwesomeIcon className={summaryStyle} icon={icon} />
         </div>
         <span className={summaryStyle}>{count}</span>
      </div>
   );
};

export default Summary;
