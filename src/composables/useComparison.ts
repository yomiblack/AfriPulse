import { ref, computed, inject, provide } from 'vue';
import type { InjectionKey } from 'vue';
import { CountryCard } from '@/types/country';

export const COMPARISON_KEY: InjectionKey<
  ReturnType<typeof createComparisonState>
> = Symbol('comparison');

function createComparisonState() {
  const selected = ref<CountryCard[]>([]);
  const MAX = 3;

  const isSelected = (cca2: string) =>
    selected.value.some((c) => c.cca2 === cca2);

  const isFull = computed(() => selected.value.length >= MAX);

  function toggle(country: CountryCard) {
    if (isSelected(country.cca2)) {
      selected.value = selected.value.filter((c) => c.cca2 !== country.cca2);
    } else if (!isFull.value) {
      selected.value = [...selected.value, country];
    }
  }

  function clear() {
    selected.value = [];
  }

  function remove(cca2: string) {
    selected.value = selected.value.filter((c) => c.cca2 !== cca2);
  }

  return { selected, isFull, isSelected, toggle, clear, remove };
}

export function provideComparison() {
  const state = createComparisonState();
  provide(COMPARISON_KEY, state);
  return state;
}

export function useComparison() {
  const ctx = inject(COMPARISON_KEY);
  if (!ctx)
    throw new Error('useComparison() called outside comparison provider');
  return ctx;
}
