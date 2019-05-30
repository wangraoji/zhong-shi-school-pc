import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入按需加载的element
import element from './element';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(element)

// 引入富文本
let quillEditor = require("vue-quill-editor").quillEditor; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
Vue.component('quillEditor', quillEditor)

// 引入scss
import "@/styles/index.scss";

// 引入 lodash
import _ from "lodash";

import '@/permission' // permission control

Vue.config.productionTip = false
Vue.prototype.log = (v1: any, v2?: any) => {
  if (v2) {
    console.log(_.cloneDeep(v1), _.cloneDeep(v2));
  } else {
    console.log(_.cloneDeep(v1));
  }
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
