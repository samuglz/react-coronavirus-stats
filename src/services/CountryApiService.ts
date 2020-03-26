import { Country } from '../Models/Country';
import { CountryService } from './CountryService';
import axios from 'axios';
import { uniq } from '../utils/Uniq';
import { CountryFilter } from '../types/CountryFilter';

const API_DATA = 'https://covid19.mathdro.id/api/confirmed';

const toCountry = (json: any): Country => ({
   provinceState: json.provinceState,
   countryRegion: json.countryRegion,
   confirmed: json.confirmed,
   recovered: json.recovered,
   deaths: json.deaths,
   active: json.active,
   city: json.admin2,
   combinedKey: json.combinedKey.split(',').join(' -')
});

export class CountryApiService implements CountryService {
   getCountriesFromApi(): Promise<Country[]> {
      return axios
         .get(API_DATA)
         .then(({ data }) =>
            uniq<Country, CountryFilter>('combinedKey', data.map(toCountry))
         );
   }
}
