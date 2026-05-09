import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { CountryCard } from '@/types/country';

export const useCountriesStore = defineStore(
  'countries',
  () => {
    const countries = ref<CountryCard[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);
    const selectedRegion = ref<string>('All');
    const searchQuery = ref<string>('');
    const favouriteIds = ref<string[]>([]);

    const favouriteIdsset = computed(() => new Set(favouriteIds.value));

    const africanSubregions = computed(() => {
      const regions = new Set(
        countries.value.map((c) => c.subregion).filter(Boolean)
      );
      return ['All', ...Array.from(regions).sort()];
    });

    const filteredCountries = computed(() => {
      return countries.value
        .filter((c) => {
          const matchesRegion =
            selectedRegion.value === 'All' ||
            c.subregion === selectedRegion.value;
          const matchesSearch =
            searchQuery.value === '' ||
            c.name.common
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase());
          return matchesRegion && matchesSearch;
        })
        .sort((a, b) => a.name.common.localeCompare(b.name.common));
    });

    const favouriteCountries = computed(() =>
      countries.value.filter((c) => favouriteIdsset.value.has(c.cca2))
    );

    async function fetchCountries() {
      if (countries.value.length > 0) return;

      isLoading.value = true;
      error.value = null;

      try {
        const fields =
          'name,cca2,cca3,capital,subregion,population,flags,currencies,languages';
        const res = await fetch(
          `https://restcountries.com/v3.1/region/africa?fields=${fields}`
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        countries.value = await res.json();
      } catch (e) {
        error.value =
          e instanceof Error ? e.message : 'Failed to fetch countries';
      } finally {
        isLoading.value = false;
      }
    }

    function setRegion(region: string) {
      selectedRegion.value = region;
    }

    function setSearch(query: string) {
      searchQuery.value = query;
    }

    function isFavourite(cca2: string): boolean {
      return favouriteIdsset.value.has(cca2);
    }

    function toggleFavourite(cca2: string): void {
      if (favouriteIdsset.value.has(cca2)) {
        favouriteIds.value = favouriteIds.value.filter((id) => id !== cca2);
      } else {
        favouriteIds.value = [...favouriteIds.value, cca2];
      }
    }

    return {
      countries,
      isLoading,
      error,
      selectedRegion,
      searchQuery,
      africanSubregions,
      filteredCountries,
      fetchCountries,
      setRegion,
      setSearch,
      favouriteIds,
      favouriteCountries,
      isFavourite,
      toggleFavourite,
    };
  },
  {
    persist: {
      key: 'afripulse-countries',
      pick: ['favouriteIds'],
    },
  }
);
