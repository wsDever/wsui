
import Vue from 'vue';
import App from './app.vue';
import Wsui from '../src/components/install.js'
// import Wsui  from '../dist/main.js'

Vue.use(Wsui)

new Vue({
    el: '#app',
    render: h => h(App),
});
