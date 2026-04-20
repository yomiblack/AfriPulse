<script setup lang="ts">
    const props = defineProps<
    {
        modelValue: string
    }>()

    const emit = defineEmits<
    {
        'update:modelValue': [value: string]
    }>()
</script>

<template>
    <div class="relative w-full max-w-md">
        <!-- Search icon -->
        <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                         d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"/>
            </svg>
        </div>

        <input
            type="text"
            placeholder="Search African countries..."
            :value="modelValue"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            class="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm
             bg-white dark:bg-surface-dark-muted
             border border-gray-200 dark:border-gray-700
             text-gray-900 dark:text-gray-100
             placeholder:text-gray-400 dark:placeholder:text-gray-500
             focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
             transition-colors duration-150"
            />
    </div>
</template>
