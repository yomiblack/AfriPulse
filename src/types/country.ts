export interface Currency {
  name: string;
  symbol: string;
}

export interface Flags {
  svg: string;
  png: string;
  alt?: string;
}

export interface Idd {
  root: string;
  suffixes: string[];
}

interface CountryMaps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: Record<string, { official: string; common: string }>;
  };
  cca2: string;
  cca3: string;
  capital: string[];
  region: string;
  subregion: string;
  population: number;
  area: number;
  flags: Flags;
  currencies: Record<string, Currency>;
  languages: Record<string, string>;
  idd: Idd;
  borders: string[]; // cca3 codes of bordering countries
  landlocked: boolean;
  timezones: string[];
  coatOfArms?: { png?: string; svg?: string };
  maps?: CountryMaps;
  continents?: string[];
  latlng?: [number, number];
}

export type CountryCard = Pick<
  Country,
  | 'name'
  | 'cca2'
  | 'cca3'
  | 'capital'
  | 'subregion'
  | 'population'
  | 'flags'
  | 'currencies'
  | 'languages'
>;
