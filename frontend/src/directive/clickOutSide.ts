// src/directives/ClickAwayListener.ts
import { type App, type ObjectDirective } from 'vue';

const clickAwayListener: ObjectDirective = {
  beforeMount(el: HTMLElement, binding) {
    // Click event handler
    const handleClick = (e: MouseEvent) => {
      if (!el.contains(e.target as Node)) {
        binding.value();
      }
    };

    // Attach the event listener
    document.addEventListener('click', handleClick);

    // Store the event handler on the element
    (el as any)._clickAwayListener = handleClick;
  },

  // Cleanup when the element is unmounted
  unmounted(el: HTMLElement) {
    if ((el as any)._clickAwayListener) {
      document.removeEventListener('click', (el as any)._clickAwayListener);
      delete (el as any)._clickAwayListener;
    }
  },
};

// Create a Vue 3 plugin to use the directive
const ClickAwayListenerPlugin = {
  install(app: App) {
    app.directive('click-away', clickAwayListener);
  },
};

export default ClickAwayListenerPlugin;
