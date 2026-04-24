<script setup lang="ts">
import DarkModeToggle from '@/components/DarkModeToggle.vue';
import AppLoader from './components/AppLoader.vue';
import AppError from './components/AppError.vue';
import { useDarkMode } from '@/composables/useDarkMode';
import { Analytics } from '@vercel/analytics/vue';
import { ref } from 'vue';

useDarkMode();

const suspenseError = ref<Error | null>(null);

function onSuspenseError(err: unknown) {
  suspenseError.value = err instanceof Error ? err : new Error(String(err));
}
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
        <Analytics />
        <DarkModeToggle />
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
