// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueFirestore from 'vue-firestore';
import 'vuetify/dist/vuetify.min.css';
import { firestore/* , authentication */ } from './firebase';

import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(VueFirestore);

function logger(data) {
  const keys = Object.keys(data);
  console.log(`~!~!~!~!~ ${keys} ~!~!~!~!~\n`, data[keys[0]]);
}
/* premature way of implementing a state management */
const state = { };

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  firestore() {
    const restaurant = firestore.collection('restaurants').doc('test_restaurant');
    const menu = firestore.collection('menus').where('restaurant', '==', restaurant.id);
    const menuSections = firestore
      .collection('menuSections')
      .where('restaurant', '==', restaurant.id);
    return {
      restaurant,
      menu,
      menuSections,
    };
  },
  created() {
    state.menu = this.menu;
    // state.restaurant = this.restaurant;
    state.menuSections = this.menuSections;
    // state.menu.sections = this.menuSections;
    logger({ this: this });
  },
  render: h => h(App),
});


/* this should be moved to somewhere else */
/* eslint-disable-next-line import/prefer-default-export */
export { state };
