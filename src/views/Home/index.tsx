import React, { FC } from 'react';
import { TotalCounts } from '../../components/TotalCounts';
import { useAppContext } from '../../components/Store';
import { observer } from 'mobx-react-lite';
import { CountryFilter } from '../../components/CountryFilter';
import List from '../../components/List';

const Home: FC = observer(() => {
   const { appStore } = useAppContext();
   return (
      <div className="bg-gray-700 text-white font-bold p-5 overflow-hidden h-screen">
         <TotalCounts />
         {appStore.countries.length > 0 && (
            <div>
               <CountryFilter />
               {appStore.filteredCountries.length === 0 ? (
                  <div className="text-center">Country not found</div>
               ) : (
                  <List countries={appStore.filteredCountries} />
               )}
            </div>
         )}
      </div>
   );
});

export default Home;
