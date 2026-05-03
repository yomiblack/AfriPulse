<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useComparison } from '@/composables/useComparison';

const router = useRouter();
const { selected, remove, clear } = useComparison();

function goToCompare() {
  router.push({
    name: 'compare',
    query: { countries: selected.value.map((c) => c.cca2).join(',') },
  });
}
</script>

<template>
  <Transition
    enter-from-class="translate-y-full opacity-0"
    enter-active-class="transition-all duration-300 ease-out"
    enter-to-class="translate-y-0 opacity-100"
    leave-from-class="translate-y-0 opacity-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="selected.length > 0"
      class="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-3 sm:px-4"
    >
      <div
        class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl px-3 sm:px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3"
      >
        <div class="flex items-center gap-2 flex-1 min-w-0">
          <TransitionGroup
            enter-from-class="scale-0 opacity-0"
            enter-active-class="transition-all duration-200"
            enter-to-class="scale-100 opacity-100"
            leave-from-class="scale-100 opacity-100"
            leave-active-class="transition-all duration-150"
            leave-to-class="scale-0 opacity-0"
            tag="div"
            class="flex items-center gap-2"
          >
            <div
              v-for="country in selected"
              :key="country.cca2"
              class="relative group flex-shrink-0"
            >
              <img
                :src="country.flags.svg"
                :alt="country.name.common"
                class="w-8 h-6 object-cover rounded shadow-sm border border-gray-200 dark:border-gray-700"
              />

              <button
                @click="remove(country.cca2)"
                :aria-label="`Remove ${country.name.common}`"
                class="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] leading-none flex items-center justify-center font-bold transition-opacity bg-gray-800 dark:bg-white text-white dark:text-gray-900 sm:opacity-0 sm:group-hover:opacity-100 opacity-100"
              >
                ×
              </button>
            </div>
          </TransitionGroup>

          <span
            class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 ml-1 shrink-0"
          >
            {{ selected.length }}/3 selected
          </span>
        </div>

        <div
          class="flex items-center gap-2 flex-shrink-0 self-stretch sm:self-auto"
        >
          <button
            @click="clear"
            class="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Clear
          </button>
          <button
            @click="goToCompare"
            :disabled="selected.length < 2"
            class="flex-1 sm:flex-none px-4 py-1.5 rounded-xl text-sm font-semibold bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-center"
          >
            Compare →
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
