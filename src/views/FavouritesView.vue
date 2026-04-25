<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCountriesStore } from '@/stores/countries';
import CountryCard from '@/components/CountryCard.vue';

const store = useCountriesStore();

const { favouriteCountries } = storeToRefs(store);
</script>

<template>
  <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Saved Countries
      </h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {{ favouriteCountries.length }}
        {{ favouriteCountries.length === 1 ? 'country' : 'countries' }} saved
      </p>
    </div>

    <div
      v-if="favouriteCountries.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <CountryCard
        v-for="country in favouriteCountries"
        :key="country.cca2"
        :country="country"
      />
    </div>

    <div
      v-else
      class="flex flex-col items-center justify-center py-32 text-center gap-4"
    >
      <p class="text-5xl text-gray-600 dark:text-gray-200">☆</p>
      <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        No saved countries yet
      </h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
        Open any country and hit
        <span class="font-medium text-brand-600 dark:text-brand-400">Save</span>
        to add it here.
      </p>
      <RouterLink
        to="/countries"
        class="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline"
        >← Browse all countries</RouterLink
      >
    </div>
  </div>
</template>
