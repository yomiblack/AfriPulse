<script setup lang="ts">
import { useCountries } from '@/composables/useCountries';
import CountryCard from '@/components/CountryCard.vue';
import RegionSidebar from '@/components/RegionSidebar.vue';
import SearchBar from '@/components/SearchBar.vue';

const {
  filteredCountries,
  isLoading,
  error,
  selectedRegion,
  searchQuery,
  africanSubregions,
  setRegion,
  setSearch,
} = useCountries();
</script>

<template>
  <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Toolbar -->
    <div class="mt-8">
      <SearchBar v-model="searchQuery" />
      <p class="text-sm my-2 text-gray-500 dark:text-gray-400 shrink-0">
        <span v-if="isLoading">Loading...</span>
        <span v-else>{{ filteredCountries.length }} countries</span>
      </p>
    </div>

    <!-- Main layout: sidebar + grid -->
    <div class="flex gap-8">
      <RegionSidebar
        :subregions="africanSubregions"
        :selected="selectedRegion"
        @select-region="setRegion"
        class="hidden lg:block"
      />

      <main class="flex-1 min-w-0">
        <!-- Error state -->
        <div
          v-if="error"
          class="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 text-center text-red-700 dark:text-red-400"
        >
          {{ error }}
        </div>

        <!-- Loading skeleton grid-->
        <div
          v-else-if="isLoading"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <div
            v-for="n in 12"
            :key="n"
            class="rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse aspect-[3/4]"
          ></div>
        </div>

        <!-- Country grid -->
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <CountryCard
            v-for="country in filteredCountries"
            :key="country.cca2"
            :country="country"
          />
        </div>

        <!-- Empty state -->
        <div
          v-if="!isLoading && filteredCountries.length === 0"
          class="text-center py-20 text-gray-400 dark:text-gray-600"
        >
          <p class="text-lg">No countries match your search</p>
          <p class="text-sm mt-1">Try a different name or region</p>
        </div>
      </main>
    </div>
  </div>
</template>
