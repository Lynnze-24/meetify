import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

import './style.css';
import ClickAwayListenerPlugin from './directive/clickOutSide';

const app = createApp(App);
app.use(router);

app.use(ClickAwayListenerPlugin);
router.isReady().then(() => {
  app.mount('#app');
});
window.history.scrollRestoration = 'manual';
