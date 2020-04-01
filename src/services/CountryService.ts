import { Country } from '../Models/Country';

export interface CountryService {
   getCountriesFromApi(): Promise<Country[]>;
   getUngeneralCountryData(country: Country): Promise<Country>;
}
