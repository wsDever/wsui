
import Vue from 'vue';
import App from './app.vue';
import WSUI from '../src/components/install.js'
// import WSUI  from '../dist/main.js'

Vue.use(WSUI)

new Vue({
    el: '#app',
    render: h => h(App),
});
