import { action, computed, observable, runInAction } from 'mobx';
import { RootStore } from './RootStore';
import { Country } from '../Models/Country';
import { CountryApiService } from '../services/CountryApiService';

interface Counts {
   confirmed: number;
   recovered: number;
   deaths: number;
}

// const [countries, setCountries] = useState<Country[]>();
// const [filteredCountries, setFilteredCountries] = useState<Country[]>();
// const [currentFilter, setCurrentFilter] = useState('confirmed');
// const [initialState, setInitialState] = useState(true);
// const [isFilterOpen, setIsFilterOpen] = useState(false);

// const byNoId = idToRemove => person => person.id !== idToRemove;
// const byId = idToRemove => person => person.id === idToRemove;

export class AppStore {
   private rootStore: RootStore;

   private calculateCounts() {
      this.countries.forEach(country => {
         this.counts.confirmed += country.confirmed;
         this.counts.deaths += country.deaths;
         this.counts.recovered += country.recovered;
      });
   }

   @observable
   countries: Country[];

   @observable
   filteredCountries: Country[];

   @observable
   currentOrder: string;

   @observable
   isInitialState: boolean;

   @observable
   isFilterOpen: boolean;

   @observable
   counts: Counts;

   @computed
   get activos() {
      return 'hola';
   }

   @observable
   state: 'pending' | 'done' | 'error';

   constructor(rootStore: RootStore) {
      this.rootStore = rootStore;
      this.counts = {
         confirmed: 0,
         deaths: 0,
         recovered: 0
      };
      this.countries = [];
      this.filteredCountries = [];
      this.currentOrder = 'confirmed';
      this.isInitialState = true;
      this.isFilterOpen = false;
      this.state = 'pending';
   }

   @action
   async getCountriesFromApi() {
      this.countries = [];
      this.state = 'pending';
      try {
         const countryApiService = new CountryApiService();
         const countries = await countryApiService.getCountriesFromApi();
         runInAction(() => {
            this.countries = countries;
            this.calculateCounts();
            this.filteredCountries = countries;
            this.state = 'done';
         });
      } catch (error) {
         runInAction(() => {
            this.state = 'error';
         });
      }
   }

   @action
   setCurrentOrder(key: string) {
      this.currentOrder = key;
   }

   @action
   toggleInitialState() {
      this.isInitialState = !this.isInitialState;
   }

   @action
   toggleFilterOpen() {
      this.isFilterOpen = !this.isFilterOpen;
   }

   @action
   setFilteredCountries(countries: Country[]) {
      this.filteredCountries = countries;
   }

   @action
   incrementDeath() {}

   /**
    * @deprecated
    */
   @action
   incrementConfirmed() {
      throw new Error('Not use');
   }

   // @action
   // incrementRecover() {
   //    this.recuperados++;
   // }

   @action
   addConfirmadas() {
      // this.confirmadas.push({
      //    id: Math.random(),
      //    name: 'John Doe' + Math.random(),
      //    temperatura: 10
      // });
   }

   @action
   removeConfirmadas(idToRemove: number) {
      // this.confirmadas = this.confirmadas.filter(byNoId(idToRemove));
   }

   @action
   increaseDegreesByPerson(increase: number) {
      // return (person: Person) => this.increaseDegrees(person.id, increase);
   }

   @action
   increaseDegrees(idToIncrease: number, increase: number = 2) {
      // this.confirmadas.find(byId(idToIncrease))!.temperatura += 2;
   }
}
