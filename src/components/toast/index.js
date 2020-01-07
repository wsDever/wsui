import Toast from './main.vue'
let currToast
export default {
  install (Vue, options) {
    Vue.prototype.$wsuiToast = (options) => {
      currToast && currToast.remove();
      currToast = createToast(Vue, options);
    }
  }
}

/** helper function */
function createToast (Vue, options) {
  let propsData = typeof options === 'string' ? { message: options } : options;
  let Constructor = Vue.extend(Toast)
  let ele =  new Constructor({ propsData })
  ele.$mount()
  document.body.appendChild(ele.$el)

  return ele
}