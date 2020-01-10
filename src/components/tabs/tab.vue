<template>
  <div class="wsui-tabs">
    <tabs-nav
      :navList="navList"
      :selectedKey="selectedKey"
      @update:selectedKey="onChange"
      @update:navList="onDelete"
    />
    <div class="wsui-tabs-content" ref="content">
      <slot />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component';
import tabsNav from './tab-nav';
@Component({
  components:{
    tabsNav
  },
  props: {
    deletabled:{
      type: Boolean,
      default: false
    },
    value: {
      type: String,
    },
  },
})
export default class WsuiTabs extends Vue {
  navList = []
  defaultTabItemName = 'wsui-tab-item'
  selectedKey ='1'
  mounted () {
    let childrenElName = this.defaultTabItemName;
    let delSet = this.getBool(this.deletabled)
    this.navList = this.$children
      .filter(item => item.$options.name === childrenElName)
      .map(item => ({
        title: item.title,
        name: item.name,
        deletabled: this.getDifBool(item.deletabled, delSet),
        disabled: this.getBool(item.$options.propsData.disabled)
      }))
    this.selectedKey = this.value || this.navList[0].name;
  }
  getDifBool(cld, prt){
    // console.log("child:", cld);
    // console.log("parent:", prt);
    // console.log("\n");
    return cld ? prt : cld ;
  }
  getBool (v) {
    // TODO
    // 问题调查
    // disabled 简写时：<wsui-tab-item title="tab 2" name="2" disabled>
    // 通过 propsData 得到的 disabled 值是 ""
    // 而通过 this.disabled 得到的是正常的 true 和 false
    if (v === void(0)) {
      return false;
    }
    if (v === '') {
      return true;
    }
    return !!v;
  }
  onChange (name) {
    this.selectedKey = name;
    let index = this.navList.findIndex(item => item.name === name);
    this.$refs.content.style.marginLeft = `-${index * 100}%`
    this.$emit('change', name);
  }
  onDelete (delObj){
    if(this.navList.length <= 1){
      this.$wsuiToast("至少需要一个Tab项");
      return ;
    }
    this.$emit('delete', delObj.name)    
    this.navList = this.navList.filter(item => item.name != delObj.name);
  }
  
}
</script>

<style lang="less" scoped>
@transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
.wsui-tabs {
  overflow: hidden;

  .wsui-tabs-content {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    transition: @transition;
  }
}
</style>
