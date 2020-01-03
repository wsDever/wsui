<template>
  <div class="wsui-button-group">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
@Component({

})
export default class WsuiButtonGroup extends Vue {
  mounted () {
    for (let node of this.$el.children) {
      let name = node.nodeName.toLowerCase()
      if (name !== 'button') {
        console.warn(`注意：buttonGroup组件的子元素应该使用button组件`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.wsui-button-group {
  display: inline-flex;
  vertical-align: middle;
  > .wsui-button {
    border-radius: 0;
    &:not(:last-child) {
      margin-right: 0;
    }
    &:not(:first-child) {
      margin-left: -1px;
    }
    &.wsui-button-primary:last-child:not(:first-child),
    &.wsui-button-primary + .wsui-button-primary {
      border-left-color: #40a9ff;
    }
    &:hover {
      position: relative;
      z-index: 1;
    }
    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }

}
</style>
