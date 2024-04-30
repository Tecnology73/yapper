import './main.scss';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { BrowserOpenURL } from '@wails/runtime';

document.addEventListener('click', e => {
  const anchor = (e.target as HTMLElement).tagName === 'A';
  if (anchor) {
    e.preventDefault();
    BrowserOpenURL((e.target as HTMLAnchorElement).href);
  }
});

const app = createApp(App);

app.use(router);
app.mount('#app');

String.prototype.count = function (c: string, max: number = -1) {
  let count = 0;
  for (let i = 0; i < this.length; i++) {
    if (this[i] === c) {
      count++;
      if (max > -1 && count >= max) {
        return count;
      }
    }
  }

  return count;
};
