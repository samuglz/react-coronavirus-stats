import { AppStore } from './AppStore';
import { LoginStore } from './LoginStore';

export class RootStore {
   appStore: AppStore;
   loginStore: LoginStore;

   constructor() {
      this.appStore = new AppStore(this);
      this.loginStore = new LoginStore(this);
   }
}
