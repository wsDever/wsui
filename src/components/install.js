import WsuiButton      from './button/index.vue';
import WsuiIcon        from './icon/index.vue';
import WsuiButtonGroup        from './buttonGroup/index.vue';
import WsuiInput       from './input/index.vue';

export default {
    install:(Vue) => {
        Vue.component('WsuiButton', WsuiButton);
        Vue.component('WsuiIcon', WsuiIcon);
        Vue.component('WsuiButtonGroup', WsuiButtonGroup);
        Vue.component('WsuiInput', WsuiInput);
    }
}