<script setup lang="ts">
import { useDarkMode } from '@/composables/useDarkMode';

const { isDark, toggle } = useDarkMode();
</script>

<template>
  <button
    @click="toggle"
    :aria-pressed="isDark"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    class="relative w-10 h-6 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    :class="isDark ? 'bg-brand-600' : 'bg-gray-300 dark:bg-gray-600'"
  >
    <!-- The sliding knob. Translate with Tailwind: translate-x-4 = 16px -->
    <span
      class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300"
      :class="isDark ? 'translate-x-4' : 'translate-x-0'"
    ></span>
  </button>
</template>
