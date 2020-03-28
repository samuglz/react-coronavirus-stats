import React, { FC, useEffect } from 'react';
import { Hijo } from './Hijo';
import { useAppContext } from './Store';
import { observer } from 'mobx-react-lite';

export const Padre: FC = observer(() => {
   const { appStore, loginStore } = useAppContext();

   useEffect(() => {
      console.log('LLAMO AL API');
   }, []);

   console.log('[Padre] Me renderizo');

   const incrementConfirm = () => addNames();
   const incrementDeaths = () => appStore.incrementDeath();
   const incrementRecuperados = () => appStore.incrementRecover();
   const addNames = () => appStore.addConfirmadas();

   return <div className="Padre">
      {/*<button onClick={increaseDeaths}>☠</button>*/}
      <h1>Padre: {appStore.confirmadas.length} </h1>
      <ul>
         <li>
            <button onClick={incrementConfirm}>Confirmados ({appStore.confirmadas.length}) ++</button>
         </li>
         <li>
            <button onClick={incrementDeaths}>Muertes ({appStore.muertes}) ++</button>
         </li>
         <li>
            <button onClick={incrementRecuperados}>Recuperados ({appStore.recuperados}) ++</button>
         </li>
         <li>
            <h2>Activos: {appStore.activos}</h2>
         </li>
         <li>
            <button onClick={addNames}>AddNames: {appStore.activos}</button>
         </li>
      </ul>
      <h3>La lista</h3>
      {loginStore.isAdmin && <ul>
         {appStore.confirmadas.map(confirmado => <li key={confirmado.id} onClick={() => {
            // appStore.removeConfirmadas(confirmado.id);
            appStore.increaseDegrees(confirmado.id);
         }}>{confirmado.name}-{confirmado.temperatura}</li>)}
      </ul>}
      {/*<Hijo/>*/}
      {/*<Hijo/>*/}
   </div>;
});
