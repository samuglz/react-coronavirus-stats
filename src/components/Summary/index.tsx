import React from 'react';
import { SummaryProps } from './index.d';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faViruses,
   faVirusSlash,
   faSkull,
   IconDefinition,
   faTimes
} from '@fortawesome/free-solid-svg-icons';

const Summary: React.FC<SummaryProps> = ({ count, icon, color }) => {
   const summaryStyle = `font-bold text-${color}-500 text-xl md:text-6xl`;
   const chooseIcon = (): IconDefinition => {
      let iconToReturn: IconDefinition = faTimes;
      if (icon === 'faVirus') iconToReturn = faViruses;
      if (icon === 'faSkull') iconToReturn = faSkull;
      if (icon === 'faVirusSlash') iconToReturn = faVirusSlash;
      return iconToReturn;
   };

   return (
      <div className="bg-gray-800 rounded-lg py-3">
         <div>
            <FontAwesomeIcon className={summaryStyle} icon={chooseIcon()} />
         </div>
         <span className={summaryStyle}>{count}</span>
      </div>
   );
};

export default Summary;
