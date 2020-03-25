export interface Country {
   countryRegion: string;
   confirmed: number;
   recovered: number;
   deaths: number;
   active: number;
   combinedKey: string;
   provinceState?: string;
   city?: string;
}
