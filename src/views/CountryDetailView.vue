<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCountriesStore } from '@/stores/countries';
import { useCountryDetail } from '@/composables/useCountryDetail';

const route = useRoute();
const router = useRouter();

const code = computed(() => route.params.cca2 as string);

const { country, loading, error } = useCountryDetail(code);
const store = useCountriesStore();

const formattedPopulation = computed(() =>
  country.value ? new Intl.NumberFormat().format(country.value.population) : ''
);

const formattedArea = computed(() =>
  country.value?.area
    ? new Intl.NumberFormat().format(country.value.area) + ' km²'
    : 'N/A'
);

const currencyList = computed(() => {
  if (!country.value?.currencies) return [];
  return Object.entries(country.value.currencies).map(([code, cur]) => ({
    code,
    name: cur.name,
    symbol: cur.symbol,
  }));
});

const languageList = computed(() =>
  country.value?.languages ? Object.values(country.value.languages) : []
);

const isFavourite = computed(() =>
    country.value ? store.isFavourite(country.value.cca2) : false
)

function navigateToBorder(cca3: string) {
  const borderCountry = store.countries.find((c) => c.cca3 === cca3);
  if (borderCountry) {
    router.push({
      name: 'country-detail',
      params: { cca2: borderCountry.cca2 },
    });
  }
}

function toggleFavourite() {
  if (!country.value) return;
  store.toggleFavourite(country.value.cca2);
}
</script>

<template>
  <div class="p-2 min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- ── STICKY HEADER NAV ───────────────────────────────────────────── -->
    <header
      class="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700"
    >
      <div
        class="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between"
      >
        <RouterLink
          to="/countries"
          class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-text-brand-400 transition-colors"
        >
          <!-- ← Back label -->
          <spsn class="text-lg leading-none">←</spsn>
          <spsn>All countries</spsn>
        </RouterLink>
        <!-- Favourite toggle -->
        <button
          v-if="country"
          @click="toggleFavourite"
          class="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
          :class="
            isFavourite
              ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
              : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          "
        >
          <span>{{ isFavourite ? '★' : '☆' }}</span>
          <span>{{ isFavourite ? 'Saved' : 'Save' }}</span>
        </button>
      </div>
    </header>

    <main>
      <!-- ── LOADING STATE ──────────────────────────────────────────────── -->
      <div v-if="loading" class="space-y-6 animate-pulse">
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64" />
        <div class="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
        <div class="grid grid-cols-2 gap-4">
          <div class="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          <div class="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        </div>
      </div>
      <!-- ── ERROR STATE ────────────────────────────────────────────────── -->
      <div
        v-else-if="error"
        class="flex flex-col items-center justify-between py-24 text-center gap-4"
      >
        <p class="text-5xl">🌍</p>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Country not found
        </h2>
        <p class="text-gray-500 dark:text-gray-400 text-sm">{{ error }}</p>
        <RouterLink
          to="/countries"
          class="mt-2 text-sm text-brand-600 dark:text-brand-400 underline"
        >
          Back to all countries
        </RouterLink>
      </div>
      <!-- ── COUNTRY DETAIL ─────────────────────────────────────────────── -->
      <div v-else-if="country" class="space-y-8">
        <!-- Hero section -->
        <div class="flex flex-col sm:flex-row items-start gap-6">
          <img
            :src="country.flags.svg || country.flags.png"
            :alt="country.flags.alt ?? `Flag of ${country.name.common}`"
            class="w-full sm:w-48 h-32 object-cover rounded-xl shadow-md border birder-gray-200 dark:border-gray-700 flex-shrink-0"
          />
          <div class="flex-1 min-w-0">
            <h1
              class="text-3xl font-bold text-gray-900 dark:text-gray-100 truncate"
            >
              {{ country.name.common }}
            </h1>
            <p class="text-base text-gray-500 dark:text-gray-400 mt-1 italic">
              {{ country.name.official }}
            </p>
            <div class="flex flex-wrap gap-2 mt-3">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
              >
                {{ country.region }}
              </span>
              <span
                v-if="country.subregion"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {{ country.subregion }}
              </span>
            </div>
          </div>
        </div>
        <!-- Stats grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="(stat, i) in [
              { label: 'Population', value: formattedPopulation, icon: '👥' },
              { label: 'Area', value: formattedArea, icon: '📐' },
              {
                label: 'Capital',
                value: country.capital?.[0] ?? 'N/A',
                icon: '🏛️',
              },
              {
                label: 'Timezone',
                value: country.timezones?.[0] ?? 'N/A',
                icon: '🕐',
              },
            ]"
            :key="i"
            class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <p class="text-2xl mb-1">{{ stat.icon }}</p>
            <p
              class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide"
            >
              {{ stat.label }}
            </p>
            <p
              class="text-base font-semibold text-gray-900 dark:text-gray-100 mt-0.5 truncate"
            >
              {{ stat.value }}
            </p>
          </div>
        </div>

        <!-- Details two-column -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Language & Currencies -->
          <div
            class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm space-y-5"
          >
            <div>
              <h3
                class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2"
              >
                Languages
              </h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-if="languageList.length === 0"
                  class="text-sm text-gray-400 dark:text-gray-500"
                >
                  None listed
                </span>
                <span
                  v-for="lang in languageList"
                  :key="lang"
                  class="px-2.5 py-1 bg-gray-100 dark:text-gray-700 text-xs rounded-lg font-medium"
                >
                  {{ lang }}
                </span>
              </div>
            </div>

            <div>
              <h3
                class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2"
              >
                Currencies
              </h3>
              <div class="space-y-1">
                <div
                  v-for="cur in currencyList"
                  :key="cur.code"
                  class="flex items-center justify-between text-sm"
                >
                  <span class="text-gray-700 dark:text-gray-300 font-medium">{{
                    cur.name
                  }}</span>
                  <span class="text-gray-500 dark:text-gray-400 font-mono">
                    {{ cur.code }} {{ cur.symbol }}
                  </span>
                </div>
                <p
                  v-if="currencyList.length === 0"
                  class="text-sm text-gray-400 dark:text-gray-500"
                >
                  None listed
                </p>
              </div>
            </div>
          </div>

          <!-- Maps link + coat of arm -->
          <div
            class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm space-y-5"
          >
            <div v-if="country.coatOfArms?.svg || country.coatOfArms?.png">
              <h3
                class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3"
              >
                Coat of arms
              </h3>
              <img
                :src="country.coatOfArms?.svg ?? country.coatOfArms?.png"
                :alt="`Coat of arms of ${country.name.common}`"
                class="h-24 object-contain"
              />
            </div>

            <div v-if="country.maps?.googleMaps">
              <h3
                class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2"
              >
                Location
              </h3>

              <a
                :href="country.maps.googleMaps"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium"
              >
                View on Google Maps
                <span class="text-xs opacity-60">↗</span>
              </a>
            </div>

            <div>
              <h3
                class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1"
              >
                Coordinates
              </h3>
              <p class="text-sm text-gray-700 dark:text-gray-300 font-mono">
                {{ country.latlng?.[0].toFixed(2) }}°,
                {{ country.latlng?.[1].toFixed(2) }}°
              </p>
            </div>
          </div>
        </div>

        <!-- Bordering countries -->
        <div
          v-if="country.borders && country.borders.length > 0"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <h3
            class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4"
          >
            Bordering Countries
          </h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="border in country.borders"
              :key="border"
              @click="navigateToBorder(border)"
              class="px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 dark:hover:bg-brand-900/20 dark:hover:text-brand-400 transition-colors"
            >
              {{ border }}
            </button>
          </div>
          <p class="text-xs text-gray-400 dark:text-gray-500 mt-3">
            Border codes shown as cca3 — click to navigate. Country names load
            once the countries list is populated.
          </p>
        </div>

        <div
          v-else
          class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-dashed border-gray-200 dark:border-gray-700 text-center"
        >
          <p class="text-sm text-gray-400 dark:text-gray-500">
            {{ country.name.common }} shares no land borders
          </p>
        </div>
      </div>
    </main>
  </div>
</template>
