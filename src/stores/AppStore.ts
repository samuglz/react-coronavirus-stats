import { action, observable, runInAction } from 'mobx';
import { RootStore } from './RootStore';
import { Country } from '../Models/Country';
import { CountryApiService } from '../services/CountryApiService';

interface Counts {
   confirmed: number;
   recovered: number;
   deaths: number;
}

export class AppStore {
   private rootStore: RootStore;

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
      this.state = 'pending';
      this.isFilterOpen = false;
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
            this.calculateTotalCounts();
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
   toggleFilterOpen() {
      this.isFilterOpen = !this.isFilterOpen;
   }

   @action
   toggleInitialState() {
      this.isInitialState = !this.isInitialState;
   }

   @action
   setFilteredCountries(countries: Country[]) {
      this.filteredCountries = countries;
   }

   private calculateTotalCounts() {
      this.countries.forEach(country => {
         this.counts.confirmed += country.confirmed;
         this.counts.deaths += country.deaths;
         this.counts.recovered += country.recovered;
      });
   }
}
