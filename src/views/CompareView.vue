<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCountriesStore } from '@/stores/countries';
import { useComparison } from '@/composables/useComparison';

const route = useRoute();
const router = useRouter();
const store = useCountriesStore();
const { selected, toggle, clear } = useComparison();

const cca2sFromUrl = computed(() =>
  route.query.countries
    ? String(route.query.countries).split(',').filter(Boolean)
    : []
);

if (selected.value.length === 0 && cca2sFromUrl.value.length > 0) {
  store.fetchCountries().then(() => {
    for (const cca2 of cca2sFromUrl.value) {
      const found = store.countries.find((c) => c.cca2 === cca2);
      if (found && selected.value.length < 3) toggle(found);
    }
  });
}

watchEffect(() => {
  const codes = selected.value.map((c) => c.cca2).join(',');
  router.replace({
    query: codes ? { countries: codes } : {},
  });
});

function formatPopulation(n: number) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(n);
}

function getPrimaryCurrency(
  currencies: Record<string, { name: string; symbol: string }> | undefined
) {
  const first = Object.values(currencies ?? {})[0];
  return first ? `${first.name} (${first.symbol})` : '—';
}

function getPrimaryLanguage(languages: Record<string, string> | undefined) {
  return Object.values(languages ?? {})[0] ?? '—';
}

const rows = [
  { label: 'Flag', type: 'flag' as const },
  {
    label: 'Official name',
    key: (c: (typeof selected.value)[0]) => c.name.official,
  },
  {
    label: 'Capital',
    key: (c: (typeof selected.value)[0]) => c.capital?.[0] ?? '—',
  },
  {
    label: 'Subregion',
    key: (c: (typeof selected.value)[0]) => c.subregion ?? '—',
  },
  {
    label: 'Population',
    key: (c: (typeof selected.value)[0]) => formatPopulation(c.population),
  },
  {
    label: 'Currency',
    key: (c: (typeof selected.value)[0]) => getPrimaryCurrency(c.currencies),
  },
  {
    label: 'Language',
    key: (c: (typeof selected.value)[0]) => getPrimaryLanguage(c.languages),
  },
];
</script>

<template>
  <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8 flex items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Compare Countries
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Side-by-side comparison of African countries
        </p>
      </div>
      <div class="flex items-center gap-3 flex-shrink-0">
        <button
          v-if="selected.length > 0"
          @click="clear"
          class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          Clear all
        </button>
        <RouterLink
          to="/countries"
          class="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline"
        >
          ← Back to countries
        </RouterLink>
      </div>
    </div>

    <div
      v-if="selected.length === 0"
      class="flex flex-col items-center justify-center py-32 text-center gap-4"
    >
      <p class="text-5xl">⚖️</p>
      <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        No countries selected
      </h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
        Go to the countries list and hit
        <span class="font-semibold text-brand-600 dark:text-brand-400">+</span>
        on up to 3 countries to compare them here.
      </p>
      <RouterLink
        to="/countries"
        class="mt-2 inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl bg-brand-500 text-white hover:bg-brand-600 transition-colors"
      >
        Browse countries
      </RouterLink>
    </div>

    <!-- Comparison table -->
    <div v-else class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th class="w-36 sm:w-48 text-left pb-4"></th>

            <th
              v-for="country in selected"
              :key="country.cca2"
              class="pb-4 px-3 text-center align-top"
            >
              <div class="flex flex-col items-center gap-2">
                <img
                  :src="country.flags.svg"
                  :alt="`Flag of ${country.name.common}`"
                  class="w-16 h-10 object-cover rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                />
                <span
                  class="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight text-center"
                >
                  {{ country.name.common }}
                </span>
                <button
                  @click="toggle(country)"
                  class="text-xs text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  Remove
                </button>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(row, rowIndex) in rows"
            :key="row.label"
            :class="
              rowIndex % 2 === 0
                ? 'bg-gray-50 dark:bg-gray-800/40'
                : 'bg-white dark:bg-transparent'
            "
            class="transition-colors"
          >
            <td
              class="py-3 px-3 sm:px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider align-middle rounded-l-xl"
            >
              {{ row.label }}
            </td>

            <td
              v-for="country in selected"
              :key="country.cca2"
              class="py-3 px-3 text-sm text-center align-middle text-gray-800 dark:text-gray-200 rounded-r-xl last:rounded-r-xl"
            >
              <template v-if="row.type === 'flag'">
                <img
                  :src="country.flags.svg"
                  :alt="`Flag of ${country.name.common}`"
                  class="w-12 h-8 object-cover rounded-md mx-auto border border-gray-200 dark:border-gray-700"
                />
              </template>
              <template v-else>
                {{ row.key!(country) }}
              </template>
            </td>

            <td
              v-for="n in 3 - selected.length"
              :key="`empty-${n}`"
              class="py-3 px-3 text-center"
            >
              <span class="text-gray-300 dark:text-gray-700">—</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="selected.length < 3" class="mt-6 text-center">
        <RouterLink
          to="/countries"
          class="inline-flex items-center gap-2 text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium"
        >
          + Add another country
        </RouterLink>
        <span class="text-xs text-gray-400 dark:text-gray-500 ml-2">
          ({{ 3 - selected.length }} slot{{
            3 - selected.length === 1 ? '' : 's'
          }}
          remaining)
        </span>
      </div>
    </div>
  </div>
</template>
