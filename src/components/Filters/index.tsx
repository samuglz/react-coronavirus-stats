import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useAppContext } from '../Store';
import className from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faVirus,
   faSkull,
   faVirusSlash
} from '@fortawesome/free-solid-svg-icons';
import { orderBy } from 'lodash';

export const Filters: FC = observer(() => {
   const { appStore } = useAppContext();

   const handleClickFilter = (key: string) => {
      appStore.setCurrentOrder(key);
      appStore.setFilteredCountries(
         orderBy(appStore.filteredCountries, key, 'desc')
      );
   };

   return (
      <div
         className={className({
            'pt-1': true,
            'h-5': true,
            customFadeIn: appStore.isFilterOpen,
            customFadeOut: !appStore.isFilterOpen && !appStore.isInitialState,
            invisible: appStore.isInitialState,
            visible: appStore.isFilterOpen
         })}
      >
         <form className="text-white inline-block">
            <fieldset className="" id="filter">
               {(Object.keys(appStore.counts) as Array<
                  'recovered' | 'deaths' | 'confirmed'
               >).map(key => (
                  <span className="mx-6 md:mx-20" id={key} key={key}>
                     <FontAwesomeIcon
                        icon={
                           {
                              confirmed: faVirus,
                              deaths: faSkull,
                              recovered: faVirusSlash
                           }[key]
                        }
                        className={className({
                           'text-yellow-500':
                              appStore.currentOrder === key &&
                              key === 'confirmed',
                           'text-red-500':
                              appStore.currentOrder === key && key === 'deaths',
                           'text-green-500':
                              appStore.currentOrder === key &&
                              key === 'recovered'
                        })}
                     />
                     <input
                        key={key}
                        className="ml-2"
                        type="radio"
                        name="filter"
                        onClick={() => handleClickFilter(key)}
                        defaultChecked={appStore.currentOrder === key}
                     />
                  </span>
               ))}
            </fieldset>
         </form>
      </div>
   );
});
