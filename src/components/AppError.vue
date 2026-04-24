<script setup lang="ts">
defineProps<{
  error: Error;
}>();
</script>

<template>
  <div
    class="flex flex-col items-center justify-center py-24 text-center gap-4"
  >
    <p class="text-5xl">⚠️</p>
    <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
      Failed to load
    </h2>
    <p class="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
      {{ error.message }}
    </p>
    <RouterLink
      to="/countries"
      class="mt-2 text-sm text-brand-600 dark:text-brand-400 underline"
    >
      Back to all countries
    </RouterLink>
  </div>
</template>
