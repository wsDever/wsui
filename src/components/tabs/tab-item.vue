<template>
  <div class="wsui-tab-item">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'wsui-tab-item',
  props: {
    title: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    deletabled: {
      type: Boolean,
      default: true
    }
  },
}
</script>

<style lang="less" scoped>
.wsui-tab-item {
  width: 100%;
  flex-shrink: 0;
}
</style>


