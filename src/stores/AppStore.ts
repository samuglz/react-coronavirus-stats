import { action, computed, observable } from 'mobx';
import { RootStore } from './RootStore';

interface Person {
   id: number;
   name: string;
   temperatura: number;
   hijos?: Person[];
}

const byNoId = idToRemove => person => person.id !== idToRemove;
const byId = idToRemove => person => person.id === idToRemove;

export class AppStore {
   private rootStore: RootStore;

   @observable
   muertes: number;

   @observable
   confirmadas: Person[];

   @observable
   recuperados: number;


   @computed
   get activos() {
      return this.confirmadas.length - this.muertes + this.recuperados;
   }

   constructor(rootStore: RootStore) {
      this.rootStore = rootStore;
      this.muertes = 10;
      this.confirmadas = [];
      this.recuperados = 0;
   }

   @action
   incrementDeath() {
      this.muertes++;
   }

   /**
    * @deprecated
    */
   @action
   incrementConfirmed() {
      throw new Error('Not use');
   }

   @action
   incrementRecover() {
      this.recuperados++;
   }

   @action
   addConfirmadas() {
      if (this.rootStore.loginStore.isAdmin) {
         this.confirmadas.push({
            id: Math.random(),
            name: 'John Doe' + Math.random(),
            temperatura: 10
         });
      }
   }

   @action
   removeConfirmadas(idToRemove: number) {
      this.confirmadas = this.confirmadas.filter(byNoId(idToRemove));
   }

   @action
   increaseDegreesByPerson(increase: number) {
      return (person: Person) => this.increaseDegrees(person.id, increase);
   }

   @action
   increaseDegrees(idToIncrease: number, increase: number = 2) {
      this.confirmadas.find(byId(idToIncrease))!.temperatura += 2;
   }
}




