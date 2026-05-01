<script setup lang="ts">
import type { CountryCard } from '@/types/country';
import { useComparison } from '@/composables/useComparison';

const props = defineProps<{
  country: CountryCard;
}>();

const { isSelected, isFull, toggle } = useComparison();

function formatPopulation(n: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(n);
}

function getPrimaryCurrency(currencies: CountryCard['currencies']): string {
  const first = Object.values(currencies ?? {})[0];
  return first ? `${first.name} (${first.symbol})` : '-';
}

function getPrimaryLanguage(languages: CountryCard['languages']): string {
  return Object.values(languages ?? {})[0] ?? '-';
}
</script>

<template>
  <div class="relative group/card">
    <!-- Compare toggle button — sits above the card, revealed on hover -->
    <button
      @click.prevent="toggle(country)"
      :disabled="isFull && !isSelected(country.cca2)"
      :aria-label="`${isSelected(country.cca2) ? 'Remove from' : 'Add to'} comparison`"
      class="absolute top-2 right-2 z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-150 opacity-0 group-hover/card:opacity-100 focus:opacity-100"
      :class="
        isSelected(country.cca2)
          ? 'bg-brand-500 text-white shadow-md'
          : 'bg-white/90 dark:bg-gray-800/90 text-gray-500 dark:text-gray-400 hover:bg-brand-50 hover:text-brand-600 shadow-sm disabled:opacity-30 disabled:cursor-not-allowed'
      "
    >
      {{ isSelected(country.cca2) ? '✓' : '+' }}
    </button>

  <RouterLink
    :to="{ name: 'country-details', params: { cca2: country.cca2 } }"
    class="group block rounded-2xl overflow-hidden bg-white dark:bg-surface-dark-muted border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
    :class="isSelected(country.cca2) ? 'ring-2 ring-brand-500' : ''"
  >
    <!-- Flag Image -->
    <div
      class="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800"
    >
      <img
        :src="country.flags.svg"
        :alt="country.flags.alt ?? `Flag of ${country.name.common}`"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>

    <!-- Card body -->
    <div class="p-4 space-y-3">
      <div>
        <h2
          class="font-semibold text-gray-900 dark:text-gray-100 text-base leading-tight truncate"
        >
          {{ country.name.common }}
        </h2>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
          {{ country.name.official }}
        </p>
      </div>

      <dl class="grid grid-cols-1 text-sm">
        <div class="flex justify-between">
          <dt class="text-gray-500 dark:text-gray-400">Capital</dt>
          <dd
            class="font-medium text-gray-800 dark:text-gray-200 truncate ml-2"
          >
            {{ country.capital?.[0] ?? '-' }}
          </dd>
        </div>
        <div class="flex justify-between">
          <dt class="text-gray-500 dark:text-gray-400">Population</dt>
          <dd class="font-medium text-gray-800 dark:text-gray-200">
            {{ formatPopulation(country.population) }}
          </dd>
        </div>
        <div class="flex justify-between">
          <dt class="text-gray-500 dark:text-gray-400">Subregion</dt>
          <dd
            class="font-medium text-gray-800 dark:text-gray-200 truncate ml-2"
          >
            {{ country.subregion ?? '-' }}
          </dd>
        </div>
        <div class="flex justify-between">
          <dt class="text-gray-500 dark:text-gray-400">Currency</dt>
          <dd
            class="font-medium text-gray-800 dark:text-gray-200 truncate ml-2"
          >
            {{ getPrimaryCurrency(country.currencies) }}
          </dd>
        </div>
      </dl>

      <!-- Language badge -->
      <div class="pt-1">
        <span
          class="inline-block text-xs px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
        >
          {{ getPrimaryLanguage(country.languages) }}
        </span>
      </div>
    </div>
  </RouterLink>
  </div>
</template>