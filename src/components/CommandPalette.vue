<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useCountriesStore } from '@/stores/countries';
import { useCommandPalette } from '@/composables/useCommandPalette';
import { usePaletteSearch } from '@/composables/usePaletteSearch';
import { useEventListener } from '@/composables/useEventListener';

const router = useRouter();
const { isOpen, close } = useCommandPalette();

const store = useCountriesStore();
const { countries } = storeToRefs(store);

const query = ref('');
const activeIndex = ref(0);
const inputRef = ref<HTMLInputElement>();

const { results } = usePaletteSearch(countries, query);

watch(isOpen, async (opened) => {
  if (opened) {
    query.value = '';
    activeIndex.value = 0;

    await nextTick();
    inputRef.value?.focus();
  }
});

watch(results, () => {
  activeIndex.value = 0;
});

function onKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return;

  if (e.key === 'Escape') {
    close();
    return;
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    activeIndex.value = Math.min(
      activeIndex.value + 1,
      results.value.length - 1
    );
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault();
    activeIndex.value = Math.max(activeIndex.value - 1, 0);
  }

  if (e.key === 'Enter' && results.value[activeIndex.value]) {
    navigate(results.value[activeIndex.value].country.cca2);
  }
}

useEventListener(window, 'keydown', onKeydown);

function navigate(cca2: string) {
  router.push({ name: 'country-details', params: { cca2 } });
  close();
}

const BADGE: Record<string, string> = {
  name: 'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300',
  capital: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  subregion:
    'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  language:
    'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
};
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-from-class="opacity-0"
      enter-active-class="transition-opacity duration-150"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-active-class="transition-opacity duration-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
      >
        <div
          class="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
          @click="close"
        />

        <Transition
          enter-from-class="opacity-0 scale-95 -translate-y-2"
          enter-active-class="transition-all duration-150 ease-out"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-100 ease-in"
          leave-to-class="opacity-0 scale-95 -translate-y-2"
        >
          <div
            v-if="isOpen"
            class="relative z-10 w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div
              class="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-800"
            >
              <svg
                class="w-4 h-4 text-gray-400 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"
                />
              </svg>

              <input
                ref="inputRef"
                v-model="query"
                type="text"
                placeholder="Search countries, capitals, languages…"
                class="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none"
              />

              <kbd
                class="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700"
              >
                ESC
              </kbd>
            </div>

            <ul
              v-if="results.length > 0"
              class="py-2 max-h-96 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-800/50"
              role="listbox"
            >
              <li
                v-for="(result, index) in results"
                :key="result.country.cca2"
                role="option"
                :aria-selected="index === activeIndex"
                @click="navigate(result.country.cca2)"
                @mouseenter="activeIndex = index"
                class="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-75"
                :class="
                  index === activeIndex
                    ? 'bg-brand-50 dark:bg-brand-900/20'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                "
              >
                <img
                  :src="result.country.flags.svg"
                  :alt="`Flag of ${result.country.name.common}`"
                  class="w-8 h-5 object-cover rounded shadow-sm border border-gray-200 dark:border-gray-700 shrink-0"
                />

                <div class="flex-1 min-w-0">
                  <p
                    class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate"
                  >
                    {{ result.country.name.common }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {{ result.country.capital?.[0] ?? '—' }} ·
                    {{ result.country.subregion ?? '—' }}
                  </p>
                </div>

                <span
                  class="shrink-0 text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded"
                  :class="BADGE[result.matchedOn]"
                >
                  {{ result.matchedOn }}
                </span>

                <span
                  v-if="index === activeIndex"
                  class="shrink-0 hidden sm:flex items-center gap-0.5"
                >
                  <kbd
                    class="px-1 py-0.5 rounded text-[10px] font-mono text-gray-400 border border-gray-200 dark:border-gray-700 dark:text-gray-500"
                    >↵</kbd
                  >
                </span>
              </li>
            </ul>

            <div v-else-if="query.trim()" class="px-4 py-10 text-center">
              <p class="text-sm text-gray-400 dark:text-gray-500">
                No countries match
                <span class="font-medium text-gray-600 dark:text-gray-300"
                  >"{{ query }}"</span
                >
              </p>
            </div>

            <div v-else class="px-4 py-6">
              <p
                class="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3"
              >
                Quick tips
              </p>
              <div class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <p>
                  Search by country name —
                  <span class="text-gray-700 dark:text-gray-300">Nigeria</span>
                </p>
                <p>
                  Search by capital —
                  <span class="text-gray-700 dark:text-gray-300">Nairobi</span>
                </p>
                <p>
                  Search by language —
                  <span class="text-gray-700 dark:text-gray-300">Swahili</span>
                </p>
                <p>
                  Search by subregion —
                  <span class="text-gray-700 dark:text-gray-300"
                    >Eastern Africa</span
                  >
                </p>
              </div>
            </div>

            <div
              class="px-4 py-2.5 border-t border-gray-100 dark:border-gray-800 flex items-center gap-4 text-[11px] text-gray-400 dark:text-gray-500"
            >
              <span class="flex items-center gap-1">
                <kbd
                  class="px-1 py-0.5 rounded border border-gray-200 dark:border-gray-700 font-mono"
                  >↑↓</kbd
                >
                navigate
              </span>
              <span class="flex items-center gap-1">
                <kbd
                  class="px-1 py-0.5 rounded border border-gray-200 dark:border-gray-700 font-mono"
                  >↵</kbd
                >
                open
              </span>
              <span class="flex items-center gap-1">
                <kbd
                  class="px-1 py-0.5 rounded border border-gray-200 dark:border-gray-700 font-mono"
                  >ESC</kbd
                >
                close
              </span>
              <span class="ml-auto">59 African countries</span>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
