<template>
  <div id="app">
    <div>
      <WsuiButton>默认</WsuiButton>
      <WsuiButton type="primary">普通</WsuiButton>
      <WsuiButton type="danger">危险</WsuiButton>
      <WsuiButton type="danger" :disabled=true>禁用</WsuiButton>
      <WsuiButton type="info">禁用</WsuiButton>
      <WsuiButton type="text">文字</WsuiButton>
      <WsuiButton iconPos="right">
        <WsuiIcon slot="icon" type="home" />
        返回
      </WsuiButton>
    </div>
    <div>
      <WsuiButtonGroup>
        <WsuiButton>上一步</WsuiButton>
        <WsuiButton>下一步</WsuiButton>
      </WsuiButtonGroup>
        <WsuiButtonGroup>
          <WsuiButton>
          <WsuiIcon slot="icon" type="left" />
          上一步
        </WsuiButton>
        <WsuiButton iconPos="right">
          <WsuiIcon slot="icon" type="right" />
          下一步
        </WsuiButton>
      </WsuiButtonGroup>
    </div>
    <div>
      <WsuiIcon type="home" color="red"></WsuiIcon>
      <WsuiIcon type="home" :round=true></WsuiIcon>
      <WsuiIcon type="home" :round=true  color="red"></WsuiIcon>
    </div>

    <div>
      <WsuiInput :require=true />
      <WsuiInput :require=true v-model="userName">
        <WsuiIcon slot="prefix" type="user" />
      </WsuiInput>
      <WsuiInput :require=true v-model="userName">
        <WsuiIcon v-if="userName" slot="suffix" type="close-circle" @click="emitEmpty" />
      </WsuiInput>
    </div>

  </div>
</template>


<script>
  import Vue from 'vue';
  import Component from 'vue-class-component';
  // import WsuiButton from '@component/button/index.vue';
  // import WsuiIcon from '@component/icon/index.vue';
  // import WsuiButtonGroup from '@component/buttonGroup/'
  // import WsuiInput from '@component/input/index.vue'
 
  @Component({
    components:{
      // WsuiButton,
      // WsuiButtonGroup,
      // WsuiIcon,
      // WsuiInput
    }
  })
  export default class HomePage extends Vue {
    userName=""
    emitEmpty(){

    }
    mounted() {  
    }
  }
</script>
<style lang="less" scoped>
  
</style>