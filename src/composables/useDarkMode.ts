import { ref, watch, onMounted } from 'vue';

const isDark = ref(false);
let initialised = false;

export function useDarkMode() {
  onMounted(() => {
    if (initialised) return;
    initialised = true;

    const stored = localStorage.getItem('afripulse-dark-mode');
    if (stored !== null) {
      isDark.value = stored === 'true';
    } else {
      // Fall back to OS preference
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    applyDarkMode(isDark.value);
  });

  watch(isDark, (val) => {
    applyDarkMode(val);
    localStorage.setItem('afripulse-dark-mode', String(val));
  });

  function applyDarkMode(dark: boolean) {
    // Tailwind's class strategy: add/remove 'dark' on <html>
    document.documentElement.classList.toggle('dark', dark);
  }

  function toggle() {
    isDark.value = !isDark.value;
  }

  return { isDark, toggle };
}
