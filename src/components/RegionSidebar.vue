<script setup lang="ts">
import { ref } from 'vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    subregions: string[];
    selected: string;
  }>(),
  {
    subregions: () => [],
    selected: 'All',
  }
);

const emit = defineEmits<{
  selectRegion: [region: string];
}>();

const drawerOpen = ref(false);

// Optional icons — gracefully falls back to 📍 for anything not listed
const REGION_ICONS: Record<string, string> = {
  All: '🌐',
  'Northern Africa': '🏜️',
  'Eastern Africa': '🦁',
  'Western Africa': '🌴',
  'Middle Africa': '🌿',
  'Southern Africa': '💎',
};

function selectRegion(region: string) {
  emit('selectRegion', region);
  drawerOpen.value = false; // close drawer after selection on mobile
}
</script>

<template>
  <aside class="hidden lg:flex flex-col w-56 shrink-0">
    <h3
      class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 px-2 mt-3"
    >
      Subregion
    </h3>
    <nav class="space-y-0.5">
      <button
        v-for="region in subregions"
        :key="region"
        @click="selectRegion(region)"
        :class="[
          'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-150',
          region === props.selected
            ? 'bg-brand-500 text-white font-medium'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
        ]"
      >
        {{ REGION_ICONS[region] ?? '📍' }} {{ region }}
      </button>
    </nav>
  </aside>

  <!-- ── MOBILE TRIGGER + DRAWER (below lg) ────────────────────────────── -->
  <div class="lg:hidden">
    <!-- Trigger: shows whichever subregion is currently selected -->
    <button
      @click="drawerOpen = true"
      class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm w-full"
    >
      <span
        >{{ REGION_ICONS[props.selected] ?? '📍' }} {{ props.selected }}</span
      >
      <span class="ml-auto text-gray-400">▾</span>
    </button>

    <Transition
      enter-from-class="opacity-0"
      enter-active-class="transition-opacity duration-200"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-to-class="opacity-0"
    >
      <div
        v-show="drawerOpen"
        class="fixed inset-0 bg-black/40 dark:bg-black/60 z-40"
        @click="drawerOpen = false"
      />
    </Transition>

    <!-- Drawer panel: slides in from the right -->
    <Transition
      enter-from-class="translate-x-full"
      enter-active-class="transition-transform duration-300 ease-out"
      enter-to-class="translate-x-0"
      leave-from-class="translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-to-class="translate-x-full"
    >
      <div
        v-show="drawerOpen"
        class="fixed right-0 top-0 h-full w-72 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
      >
        <!-- Drawer header -->
        <div
          class="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800"
        >
          <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Subregion
          </p>
          <button
            @click="drawerOpen = false"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl leading-none"
            aria-label="Close filter drawer"
          >
            ×
          </button>
        </div>

        <!-- Drawer options: same v-for loop, same emit, same active check -->
        <nav class="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          <button
            v-for="region in subregions"
            :key="region"
            @click="selectRegion(region)"
            class="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-medium text-left transition-colors"
            :class="
              region === props.selected
                ? 'bg-brand-500 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            "
          >
            {{ REGION_ICONS[region] ?? '📍' }} {{ region }}
          </button>
        </nav>
      </div>
    </Transition>
  </div>
</template>
