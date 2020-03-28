import React, { FC } from 'react';
import { Nieto } from './Nieto';
import { useAppContext } from './Store';

export const Hijo: FC = () => {
   const { appStore } = useAppContext();

   const handleOnClick = () => appStore.addConfirmadas();

   return <div>
      <h1>Hijo</h1>
      <button onClick={handleOnClick}>✂️️</button>
      <Nieto/>
      <Nieto/>
   </div>;
};
