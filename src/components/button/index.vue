<template>
  <button
    class="wui-button"
    :class="clazz"
    @click="$emit('click')">
    <slot name="icon"></slot>
    <div class="wui-button-content">
      <slot></slot>
    </div>
  </button>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component';
@Component({
  components:{
  },
  props: {
    // 如果有icon
    iconPos: {
      type: String,
      default: 'left',
      validator (v) {
        return v === 'left' || v === 'right'
      }
    },
    // 本组件
    type: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    }
  }
})
export default class WsuiButton extends Vue{  
    get clazz() {
      const { iconPos, type, block, disabled, round } = this;
      const typeList = [ 'primary', 'default', 'dashed', 'danger', 'text', 'info' ]
      let hasIcon = this.$slots.icon != undefined;
      return {
        [`wui-button-${type}`]: typeList.includes(type),
        ['wui-button-block']: block,
        ['wui-button-disabled']: disabled,
        ['wui-button-round']: round,
        [`icon-pos-${iconPos}`]: hasIcon ? true : false
      } 
    }
  
}
</script>

<style lang="less" scoped>
.wui-button {
  position: relative;
  font-size: @font-size;
  height: @button-height;
  color: @color;
  background-color: @button-bg;
  border: 1px solid;
  border-color: @border-color;
  border-radius: @border-radius;
  padding: 0 1.5em;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  margin-right: 8px;
  margin-bottom: 12px;

  > .wui-button-content {
    order: 2;
  }
  > .wsui-icon {
    order: 1;
    margin: 0 .2em 0 0;
  }
  &.icon-pos-right {
    > .wui-button-content {
      order: 1;
    }
    > .wsui-icon {
      order: 2;
      margin: 0 0 0 .2em;
    }
  }
  &:hover {
    color: @primary-color;
    border-color: @primary-color;
  }
  &:active {
    top: 1px;
  }
  &:focus {
    outline: none;
  }

  &.wui-button-dashed {
    border-style: dashed;
  }
  &.wui-button-primary {
    background-color: @primary-color;
    border-color: @primary-color;
    color: #fff;
    &:hover {
      color: #fff;
      background-color: #40a9ff;
      border-color: #40a9ff;
    }
  }
  &.wui-button-danger {
    background-color: #f5f5f5;
    color: @error-color;
    &:hover {
      border-color: @error-color;
      background-color: @error-color;
      color: #fff;
    }
  }
  &.wui-button-info {
    background-color: #b1b1b1;
    color: #fff;
    &:hover {
      border-color: #c5c5c5;
      background-color: #c5c5c5;
      color: #fff;
    }
  }
  
  &.wui-button-block {
    display: block;
    width: 100%;
  }
  &.wui-button-text{
    border: none;
    background: none !important;
  }
  &.wui-button-disabled,
  &.wui-button-disabled:hover,
  &.wui-button-disabled:focus {
    color: rgba(0, 0, 0, 0.25);
    background-color: #f5f5f5;
    border-color: #d9d9d9;
    text-shadow: none;
    box-shadow: none;
    cursor: not-allowed;
    pointer-events: none;
  }
  &.wui-button-round{
    border-radius: @button-height / 2;
  }
}
</style>
