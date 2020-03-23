import React from 'react';
import { SummaryProps } from './index.d';

const Summary: React.FC<SummaryProps> = ({ count, title, color }) => {
   const summaryStyle = `font-bold text-${color}-500 text-6xl`;
   return (
      <div>
         <div className="text-sm">{title}</div>
         <span className={summaryStyle}>{count}</span>
      </div>
   );
};

export default Summary;
