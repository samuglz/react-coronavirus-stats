import { Country } from '../Models/Country';
import { CountryService } from './CountryService';
import axios from 'axios';

const API_DATA = 'https://covid19.mathdro.id/api/confirmed';

const toCountry = (json: Country): Country => ({
   provinceState: json.provinceState,
   countryRegion: json.countryRegion,
   confirmed: json.confirmed,
   recovered: json.recovered,
   deaths: json.deaths,
   active: json.active
});

export class CountryApiService implements CountryService {
   getCountriesFromApi(): Promise<Country[]> {
      return axios.get(API_DATA).then(res => {
         const countries: Country[] = [];
         res.data.forEach((country: any) => {
            countries.push(toCountry(country));
         });
         return countries;
      });
   }
}
