<!-- src/App.vue — updated -->
<script setup lang="ts">
import DarkModeToggle from '@/components/DarkModeToggle.vue';
import { useDarkMode } from '@/composables/useDarkMode';

useDarkMode();
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
  >
    <!-- Top nav bar with dark mode toggle -->
    <nav
      class="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors"
    >
      <div
        class="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between"
      >
        <RouterLink
          to="/countries"
          class="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight"
        >
          AfriPulse
          <p
            class="text-xs font-extralight text-gray-500 dark:text-gray-400 mt-1"
          >
            Intelligence dashboard for African countries.
          </p>
        </RouterLink>
        <DarkModeToggle />
      </div>
    </nav>

    <RouterView />
  </div>
</template>
