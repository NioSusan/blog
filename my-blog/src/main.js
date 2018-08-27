import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueQuillEditor from 'vue-quill-editor'
import axios from 'axios'


import 'quill/dist/quill.snow.css'

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.get['Accepts'] = 'application/json'


Vue.config.productionTip = false
Vue.use(VueQuillEditor, /* { default global options } */)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
