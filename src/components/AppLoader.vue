<template>
  <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="animate-pulse space-y-6`">
      <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl w-80" />
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <div
          v-for="n in 12"
          :key="n"
          class="rounded-2xl bg-gray-100 dark:bg-gray-800 aspect-[3/4]"
        />
      </div>
    </div>
  </div>
</template>
