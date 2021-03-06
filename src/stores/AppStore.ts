import { action, observable, runInAction, computed } from 'mobx';
import { RootStore } from './RootStore';
import { Country } from '../Models/Country';
import { CountryApiService } from '../services/CountryApiService';
import { uniq } from '../utils/Uniq';
import { maxBy } from 'lodash';

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
   globalCountries: Country[];

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
   maxConfirmed: number;

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
      this.globalCountries = [];
      this.maxConfirmed = 0;
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
            this.getGlobalCountries();
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

   private async getGlobalCountries() {
      const ungeneralCountries = uniq(
         'countryRegion',
         this.countries.filter(
            country => country.combinedKey !== country.countryRegion
         )
      );

      const countryApiService = new CountryApiService();

      // ungeneralCountries.forEach(async country => {
      //    let pais = await countryApiService.getUngeneralCountryData(country);
      //    this.globalCountries.push(pais);
      // });

      ungeneralCountries.forEach(country => {
         countryApiService
            .getUngeneralCountryData(country)
            .then(country => {
               this.globalCountries.push(country);
            })
            .catch(console.error);
      });

      this.countries.forEach(country => {
         if (country.combinedKey === country.countryRegion)
            this.globalCountries.push(country);
      });

      // this.maxConfirmed = maxBy(this.globalCountries, 'confirmed').confirmed; // sale Italia en vez de US
   }
}
