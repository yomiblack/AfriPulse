import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import { Country } from '@/types/country';

export function useCountryDetail(code: Ref<string>) {
  const country = ref<Country | null>(null);
  const error = ref<string | null>(null);

  async function fetchCountry(cca2: string) {
    if (!cca2) return;

    error.value = null;

    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/alpha/${cca2}?fields=name,cca2,cca3,capital,region,subregion,population,area,flags,languages,currencies,borders,timezones,coatOfArms,maps,continents,latlng`
      );

      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      const data = await res.json();

      country.value = Array.isArray(data) ? data[0] : data;
    } catch (e) {
      error.value =
        e instanceof Error ? e.message : 'Failed to fetch country details';
      throw e;
    }
  }

  const initialFetch = fetchCountry(code.value);

  watch(code, (newCode) => fetchCountry(newCode));

  return { country, error, initialFetch };
}
