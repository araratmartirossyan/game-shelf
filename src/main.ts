import { createApp } from 'vue'
import { IonicVue } from '@ionic/vue';
import vSelect from "vue-select";

import {
  DefaultApolloClient,
  apolloClient
} from './apollo'

import App from './App.vue'
import router from './router';
import { addCircle, trashOutline } from 'ionicons/icons'
import { addIcons } from 'ionicons'

addIcons({
  'ios-add': addCircle,
  'ios-remove': trashOutline,
})

import "vue-select/dist/vue-select.css";

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';


const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .provide(DefaultApolloClient, apolloClient);

app.component('v-select', vSelect)

router.isReady().then(() => {
  app.mount('#app');
});