<script setup lang="ts">
import DarkModeToggle from '@/components/DarkModeToggle.vue';
import AppLoader from './components/AppLoader.vue';
import AppError from './components/AppError.vue';
import { useDarkMode } from '@/composables/useDarkMode';
import { Analytics } from '@vercel/analytics/vue';
import { ref } from 'vue';
import { useCountriesStore } from './stores/countries';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';

useDarkMode();

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
        class="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between"
      >
        <div class="flex items-center gap-6">
          <RouterLink
            to="/countries"
            class="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight leading-none"
          >
            AfriPulse</RouterLink
          >

          <div class="flex items-center gap-1">
            <RouterLink
              to="/countries"
              exact-active-class="bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400"
              class="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >Countries</RouterLink
            >
            <RouterLink
              to="/favourites"
              exact-active-class="bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400"
              class="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5"
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
          </div>
        </div>

        <div>
          <Analytics />
          <DarkModeToggle />
        </div>
      </div>
    </nav>

    <Suspense @error="onSuspenseError">
      <template #default>
        <RouterView />
      </template>

      <template #fallback>
        <AppLoader />
      </template>
    </Suspense>
    <AppError v-if="suspenseError" :error="suspenseError" />
  </div>
</template>
