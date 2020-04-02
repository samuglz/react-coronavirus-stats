import { Country } from '../Models/Country';
import { CountryService } from './CountryService';
import axios from 'axios';
import { uniq } from '../utils/Uniq';
import { CountryFilter } from '../types/CountryFilter';
import { API_DATA } from '../configFile';

const toCountry = (json: any): Country => ({
   provinceState: json.provinceState,
   countryRegion: json.countryRegion,
   confirmed: json.confirmed,
   recovered: json.recovered,
   deaths: json.deaths,
   active: json.active,
   city: json.admin2,
   combinedKey: json.combinedKey.split(',').join(' -'),
   lat: json.lat,
   long: json.long
});

export class CountryApiService implements CountryService {
   getCountriesFromApi(): Promise<Country[]> {
      return axios
         .get(`${API_DATA}/confirmed`)
         .then(({ data }) =>
            uniq<Country, CountryFilter>('combinedKey', data.map(toCountry))
         );
   }

   getUngeneralCountryData(country: Country): Promise<Country> {
      return axios
         .get(`${API_DATA}/countries/${country.countryRegion}`)
         .then(({ data }) =>
            toCountry({
               provinceState: null,
               countryRegion: country.countryRegion,
               confirmed: data.confirmed.value,
               recovered: data.recovered.value,
               deaths: data.deaths.value,
               active: 0,
               city: null,
               combinedKey: country.countryRegion,
               lat: country.lat,
               long: country.long
            })
         );
   }
}
