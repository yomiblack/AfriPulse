import { onMounted } from "vue";
import { useCountriesStore } from "@/stores/countries";
import { storeToRefs } from "pinia";

export function useCountries() {
    const store = useCountriesStore()
    
    const {filteredCountries, isLoading, error, selectedRegion, searchQuery, africanSubregions} = storeToRefs(store)

    onMounted(() => {
        store.fetchCountries()
    })

    return {
        filteredCountries,
        isLoading,
        error,
        selectedRegion,
        searchQuery,
        africanSubregions,
        setRegion: store.setRegion,
        setSearch: store.setSearch,
    }
}

