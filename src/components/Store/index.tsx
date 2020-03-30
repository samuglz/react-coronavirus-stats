import React, { createContext, FC, useContext } from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { AppStore } from '../../stores/AppStore';
import { RootStore } from '../../stores/RootStore';
interface AppStoreContext {
   appStore: AppStore;
}

const AppContext = createContext<AppStoreContext | null>(null);

const createStore = () => (): AppStoreContext => {
   const rootStore = new RootStore();
   return {
      appStore: rootStore.appStore
   };
};

export const Store: FC = ({ children }) => {
   const state = useLocalStore(createStore());

   return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppStoreContext => {
   const context = useContext(AppContext);
   if (!context) {
      throw new Error('Need a AppContext');
   }
   return context;
};
