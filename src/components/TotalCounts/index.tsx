import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useAppContext } from '../Store';
import Summary from '../Summary';
import {
   faVirus,
   faSkull,
   faVirusSlash
} from '@fortawesome/free-solid-svg-icons';

export const TotalCounts: FC = observer(() => {
   const { appStore } = useAppContext();

   return (
      <div className="text-center gap-3 grid grid-cols-3">
         {appStore.countries.length > 0 &&
            (Object.keys(appStore.counts) as Array<
               'recovered' | 'deaths' | 'confirmed'
            >).map((key, index) => (
               <div key={index}>
                  <Summary
                     icon={
                        {
                           confirmed: faVirus,
                           deaths: faSkull,
                           recovered: faVirusSlash
                        }[key]
                     }
                     count={appStore.counts[key]}
                     color={
                        {
                           confirmed: 'yellow',
                           deaths: 'red',
                           recovered: 'green'
                        }[key]
                     }
                  />
               </div>
            ))}
      </div>
   );
});
