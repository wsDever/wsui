<template>
  <div class="wsui-tabs-nav">
    <div class="wsui-tabs-ink-bar" ref="bar"></div>
    <div class="wsui-tabs-tab-list" ref="nav-list">
      <div
        v-for="item in navList"
        :key="item.name"
        class="wsui-tabs-tab"
        :ref="`wsui-tabs-nav-${item.name}`"
        :class="{'wsui-tabs-tab-selected': selectedKey === item.name, 'wsui-tabs-tab-disabled': item.disabled}"
        @click="onClick(item)"
        @mouseenter="onMouseEnter()"
      >
        <a class="wsui-tabs-close" @click.stop="removeItem(item)" v-if="item.deletabled">
          <wsui-icon type="close-circle" />
        </a>
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  components:{

  },
  props: {
    navList: {
      type: Array,
    },
    selectedKey: {
      type: String,
    }
  }
})
export default class WsuiTabsNav extends Vue {
  updated () {
    // this.$nextTick(() => {
    this.selectChange(this.selectedKey);
    // })
  }
  onClick (item) {
    if (item.disabled || this.selectedKey == item.name) { return; }
    this.$emit('update:selectedKey', item.name);
    this.selectChange(item.name);
  }
  selectChange (itemName) {
    let ref = `wsui-tabs-nav-${itemName}`
    let { width, left } = this.$refs[ref][0].getBoundingClientRect();
    let { left: left2 } = this.$refs['nav-list'].getBoundingClientRect();

    this.$refs.bar.style.width = `${width}px`
    this.$refs.bar.style.left = `${left - left2}px`
  }
  removeItem(item){
    if(this.navList.length > 1){
      // TODO
      // 此处必须先从原navlist中获取到即将删除的nav,
      // 然后更新(删除)navlist
      // 最后更新tabcontent视图
      // 顺序不能变
      let curIdx = this.navList.findIndex(nav => nav.name == item.name)
      let nextItem = this.navList.find((v,i,arr) => {
        return i == curIdx + 1
      })
      let preItem = this.navList.find((v,i,arr) => {
        return i == curIdx - 1
      })
      let nextName = ''
      this.$emit('update:navList', item);
      if(this.selectedKey == item.name){
        nextName = !nextItem ? preItem.name : nextItem.name ;
      }else{
        nextName = this.selectedKey
      }
      this.$emit('update:selectedKey', nextName);
      this.selectChange(nextName);
    } else {
      this.$wsuiToast("至少需要一个Tab项");
      return ;
    }
    
  }
  onMouseEnter(){

  }
  
}
</script>

<style lang="less" scoped>
@primary-color: #1890ff;
@transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

.wsui-tabs-nav {
  position: relative;
  margin: 0 0 16px 0;

  .wsui-tabs-tab-list {
    border-bottom: 1px solid rgb(232, 232, 232);

    .wsui-tabs-tab {
      display: inline-block;
      position: relative;
      cursor: pointer;
      margin-right: 32px;
      min-width: 100px;
      text-align: center;
      padding: 12px 0;
      &:last-child {
        margin-right: 0;
      }
  
      &.wsui-tabs-tab-selected {
        color: @primary-color;
        font-weight: bold;
      }
      &.wsui-tabs-tab-disabled {
        color: rgba(0, 0, 0, 0.25);
        cursor: not-allowed;
        pointer-events: none;
      }
      .wsui-tabs-close{
        position: absolute;
        color: rgba(0, 0, 0, 0.25) !important;
        right: 0;
        top:0;
        display: none;
      }
      &:hover{
        .wsui-tabs-close{
          display: inline;
        }
      }
    }
  }
  .wsui-tabs-ink-bar {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1;
    transition: @transition;

    // width: 40px;
    box-sizing: border-box;
    background-color: @primary-color;
    height: 2px;
  }
}
</style>


