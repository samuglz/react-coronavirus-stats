export interface Country {
   countryRegion: string;
   confirmed: number;
   recovered: number;
   deaths: number;
   active: number;
   combinedKey: string;
   lat?: number;
   long?: number;
   provinceState?: string;
   city?: string;
}
