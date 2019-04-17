import Vue from 'vue';
import App from './app/App.vue';
import store from './app/store';

import {Tabs, Tab} from 'vue-tabs-component';

Vue.component('tabs', Tabs);
Vue.component('tab', Tab);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
