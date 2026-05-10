import { onMounted, onBeforeMount } from 'vue';

export function useEventListener<K extends keyof WindowEventMap>(
  target: Window | Document | HTMLElement,
  event: K,
  handler: (e: WindowEventMap[K]) => void,
  options?: AddEventListenerOptions
) {
  onMounted(() => {
    target.addEventListener(event, handler as EventListener, options);
  });

  onBeforeMount(() => {
    target.removeEventListener(event, handler as EventListener, options);
  });
}
