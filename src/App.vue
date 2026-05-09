<script setup lang="ts">
import DarkModeToggle from '@/components/DarkModeToggle.vue';
import AppLoader from './components/AppLoader.vue';
import AppError from './components/AppError.vue';
import CountriesSkelentonLoader from './components/CountriesSkelentonLoader.vue';
import CountryDetailSkeletonLoader from './components/CountryDetailSkeletonLoader.vue';
import { useDarkMode } from '@/composables/useDarkMode';
import { Analytics } from '@vercel/analytics/vue';
import { ref } from 'vue';
import { useCountriesStore } from '@/stores/countries';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';
import { provideComparison } from '@/composables/useComparison';
import CompareBar from './components/CompareBar.vue';

useDarkMode();
provideComparison();

const store = useCountriesStore();
const { favouriteCountries } = storeToRefs(store);

const suspenseError = ref<Error | null>(null);

function onSuspenseError(err: unknown) {
  suspenseError.value = err instanceof Error ? err : new Error(String(err));
}
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
  >
    <nav
      class="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors"
    >
      <div
        class="max-w-screen-xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4"
      >
        <div class="flex items-center gap-2 sm:gap-6 min-w-0">
          <RouterLink
            to="/countries"
            class="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight leading-none shrink-0"
          >
            AfriPulse
          </RouterLink>

          <div
            class="flex items-center gap-0.5 sm:gap-1 overflow-x-auto scrollbar-none"
          >
            <RouterLink
              to="/countries"
              active-class="bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400"
              class="shrink-0 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
            >
              Countries
            </RouterLink>

            <RouterLink
              to="/favourites"
              active-class="bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400"
              class="shrink-0 flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
            >
              Saved
              <span
                v-if="favouriteCountries.length > 0"
                class="inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold rounded-full bg-brand-500 text-white"
              >
                {{
                  favouriteCountries.length > 9
                    ? '9+'
                    : favouriteCountries.length
                }}
              </span>
            </RouterLink>

            <RouterLink
              to="/compare"
              active-class="bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400"
              class="shrink-0 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
            >
              Compare
            </RouterLink>
          </div>
        </div>

        <div class="shrink-0">
          <Analytics />
          <DarkModeToggle />
        </div>
      </div>
    </nav>

    <CompareBar />

    <RouterView v-slot="{ Component, route }">
      <Suspense @error="onSuspenseError">
        <template #default>
          <component :is="Component" :key="route.fullPath" />
        </template>
        <template #fallback>
          <CountriesSkelentonLoader v-if="route.name === 'countries'" />
          <CountryDetailSkeletonLoader
            v-else-if="route.name === 'country-details'"
          />
          <AppLoader v-else />
        </template>
      </Suspense>
    </RouterView>

    <AppError v-if="suspenseError" :error="suspenseError" />
  </div>
</template>
