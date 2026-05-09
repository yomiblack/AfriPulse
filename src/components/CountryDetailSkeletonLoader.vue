<template>
  <div class="px-2 min-h-screen bg-gray-50 dark:bg-gray-900">
    <div
      class="h-14 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center px-6 justify-between"
    >
      <div
        class="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
      />
      <div
        class="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
      />
    </div>

    <main class="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div class="flex flex-col sm:flex-row items-start gap-6">
        <div
          class="w-full sm:w-48 h-32 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse shrink-0"
        />
        <div class="flex-1 space-y-3 w-full">
          <div
            class="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
          />
          <div
            class="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
          />
          <div class="flex gap-2">
            <div
              class="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
            />
            <div
              class="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
            />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="n in 4"
          :key="n"
          class="h-24 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"
        />
      </div>

      <div class="h-56 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          class="h-40 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"
        />
        <div
          class="h-40 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"
        />
      </div>

      <div class="h-24 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
    </main>
  </div>
</template>
