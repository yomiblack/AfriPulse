<template>
  <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mt-8 mb-4 flex items-center gap-4">
      <div
        class="h-10 w-full max-w-md bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
      />
      <div
        class="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse shrink-0"
      />
    </div>

    <div class="flex gap-8">
      <aside class="hidden lg:flex flex-col w-56 shrink-0 gap-1.5 pt-3">
        <div
          class="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1"
        />
        <div
          v-for="n in 6"
          :key="n"
          class="h-9 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse"
        ></div>
      </aside>

      <main class="flex-1 min-w-0">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <div
            v-for="n in 12"
            :key="n"
            class="rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse aspect-[3/4]"
          />
        </div>
      </main>
    </div>
  </div>
</template>
