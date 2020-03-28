import { RootStore } from './RootStore';
import { action, computed } from 'mobx';

export class LoginStore {
   private rootStore: RootStore;

   profile?: string;

   @computed
   get isAdmin() {
      return this.profile === 'ADMIN';
   }

   constructor(rootStore: RootStore) {
      this.rootStore = rootStore;
      this.profile = '';
   }

   @action
   doLogin(username: string, password: string) {
      if (username === 'MANO' && password === '1234') {
         this.profile = 'ADMIN';
      }
      return 'UNO';
   }

   @action
   doLogout() {
      this.profile = undefined;
   }
}
