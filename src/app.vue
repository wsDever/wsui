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

    <div>
      <WsuiPagination 
      :totalPage="50"
      :currPage="0"
      :hideIfOnePage="false"
      @onChange="onPageChange"
      />
    </div>

    <div style="margin-top: 50px;">
      <wsui-tabs v-model="activeKey" @change="onChangeTabs" @delete="onDeleteTabs" deletabled>
        <wsui-tab-item title="tab 1" name="1" v-if="nameLists.includes(1)">
          content of tab 1
        </wsui-tab-item>
        <wsui-tab-item title="tab 2" name="2" :deletabled="false" v-if="nameLists.includes(2)">
          content of tab 2
        </wsui-tab-item>
        <wsui-tab-item title="tab 3" name="3" disabled v-if="nameLists.includes(3)">
          content of tab 3
        </wsui-tab-item>
        <wsui-tab-item title="tab a" name="a" v-if="nameLists.includes('a')">
          content of tab a
        </wsui-tab-item>
        <wsui-tab-item title="tab b" name="b" v-if="nameLists.includes('b')">
          content of tab b
        </wsui-tab-item>
        <wsui-tab-item title="tab c" name="c" v-if="nameLists.includes('c')">
          content of tab c
        </wsui-tab-item>
      </wsui-tabs>
    </div>
    <div style="margin-top: 50px;">
      
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
    activeKey="1"
    nameLists=[1,2,3,'a','b','c']
    emitEmpty(){

    }
    mounted() {  
      // this.$wsuiToast({"message": "测试测试测试测试测试测试",showClose: false, 'position': 'right-top' });
      // this.$wsuiNotify({message: '看看我给哈哈哈哈哈哈哈哈哈测试测试测试测试测试测试'})
      // this.$wsuiNotify({durition: 5,onClick:() => { alert(0) }})
    }
    onPageChange(i){
      console.log(i);
    }
    onChangeTabs(name) {
      // console.log('name', name);
    }
    onDeleteTabs(name){
      this.nameLists = this.nameLists.filter(item => item != name);
    }
  }
</script>
<style lang="less" scoped>
  
</style>