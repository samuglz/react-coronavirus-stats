import { Country } from '../Models/Country';

export interface CountryService {
   getCountriesFromApi(): Promise<Country[]>;
}
