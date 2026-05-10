import { ref, provide, inject } from 'vue';
import type { InjectionKey } from 'vue';

export const PALETTE_KEY: InjectionKey<ReturnType<typeof createPaletteState>> =
  Symbol('command-palette');

function createPaletteState() {
  const isOpen = ref(false);

  function open() {
    isOpen.value = true;
  }
  function close() {
    isOpen.value = false;
  }

  function toggle() {
    isOpen.value = !isOpen.value;
  }

  return { isOpen, open, close, toggle };
}

export function provideCommandPalette() {
  const state = createPaletteState();
  provide(PALETTE_KEY, state);
  return state;
}

export function useCommandPalette() {
  const ctx = inject(PALETTE_KEY);
  if (!ctx) throw new Error('useCommandPalette() called outside provider');
  return ctx;
}
