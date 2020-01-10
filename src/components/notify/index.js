import Notify from "./main.vue";

let instance;
let seek = 0;
export default {
  install (Vue) {
    Vue.prototype.$wsuiNotify = (option) => {
      let params = typeof options === 'string' ? { message: option } : option
      let options = Object.assign({ id: `${ seek ++ }` }, params)
      let instance = getInstance(Vue)
      instance.add(options);
    }
  }
}

function createInstance (Vue) {
  let Notice = Vue.extend(Notify);
  let notice = new Notice()
  
  notice.$mount();
  document.body.appendChild(notice.$el);
  return notice;
}

function getInstance (Vue) {
  return instance = instance || createInstance(Vue)
}