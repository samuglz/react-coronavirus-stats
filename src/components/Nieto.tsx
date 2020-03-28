import React, { FC } from 'react';
import { useAppContext } from './Store';
import { observer } from 'mobx-react-lite';

export const Nieto: FC = observer(() => {
   const { appStore } = useAppContext();


   const handleOnClick = () => {
      appStore.incrementDeath();
   };

   console.log('Nieto');
   return <div>
      <button onClick={handleOnClick}>💩</button>
      Nieto:{appStore.muertes}
   </div>;
});
