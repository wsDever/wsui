import WsuiButton      from './button/index.vue';
import WsuiIcon        from './icon/index.vue';
import WsuiButtonGroup        from './buttonGroup/index.vue';
import WsuiInput       from './input/index.vue';

import WsuiToast       from './toast/index.js';
import WsuiNotification       from './notify/index.js';
export default {
    install:(Vue) => {
        Vue.use(WsuiToast);
        Vue.use(WsuiNotification);
        
        Vue.component('WsuiButton', WsuiButton);
        Vue.component('WsuiIcon', WsuiIcon);
        Vue.component('WsuiButtonGroup', WsuiButtonGroup);
        Vue.component('WsuiInput', WsuiInput);
    }
}