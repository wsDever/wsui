<template>
  <div class="wsui-pager-wraper" v-if="!hideIfOnePage || totalPage > 1">
    <span
      class="wsui-pager wsui-prev-page"
      :class="{ disabled: currIndex === 1 }"
      @click="onClick(currIndex - 1)"
    >上一页</span>
    <template v-if="mode === 'normal'">
      <span
        class="wsui-pager"
        :class="{ 'wsui-curr-page': item == currIndex, 'wsui-separator': item === '...'}"
        v-for="(item, index) in pages"
        :key="item + index"
        @click="onClick(item)"
      >
        {{ item }}
      </span>
    </template>
    <span v-else>
      {{ currIndex }} / {{ totalPage }}
    </span>
    <span 
      class="wsui-pager wsui-next-page"
      :class="{ disabled: currIndex === totalPage }"
      @click="onClick(currIndex + 1)"
    >下一页</span>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
@Component({
  props: {
    totalPage: {
      type: Number,
      required: true
    },
    currPage: {
      type: Number,
      default: 1
    },
    maxPageNum: {
      type: Number,
      default: 7
    },
    hideIfOnePage: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: 'normal',
      validator (v) {
        if (['normal', 'simple'].includes(v)) {
          return v
        }
        return 'normal'
      }
    }
  }
})
export default class WsuiPagination extends Vue {
  currIndex = Number(this.currPage > 0 ? this.currPage : 1)
  get offset(){
    let mnum = 0;
    if(this.maxPageNum <= 5){
      mnum = 5
    }else{
      if(this.maxPageNum % 2 != 1){
        mnum = this.maxPageNum + 1
      } else {
        mnum = this.maxPageNum
      }
    }
    return Math.floor(mnum / 2) - 1;
  }
  get pages() {
    const { currIndex, totalPage } = this
    let pages = this.autoPages();
    // 第一种方式
    // return this.filterPages(pages.filter(item => item <= totalPage && item > 0))
    //   .sort((a, b) => a - b)
    //   .reduce((prev, curr, index, array) => {
    //     prev.push(curr)
    //     array[index + 1] && array[index + 1] - curr > 1 && prev.push('...')
    //     return prev
    //   }, [])
    return pages ;
  }
  filterPages (arr) {
    const ret = []
    arr.forEach(item => !ret.includes(item) && ret.push(item))
    return ret
  }
  autoPages(){
    // let curr = Number(this.currIndex);
    let idx = 0;
    let pages = [];

    // 第一种方式
    // let half = Math.floor(this.maxPageNum / 2) - 1;
    // for(idx = half;idx >= 0;idx--){
    //   (curr-idx > 0) && !pages.includes(curr - idx) && pages.push(curr - idx)
    // }
    // for(idx = 0;idx <= half;idx++){
    //   (curr + idx < this.totalPage) && !pages.includes(curr + idx) && pages.push(curr + idx)
    // }
    // pages.push(this.totalPage);
    // return pages ;
    if(this.currIndex > this.totalPage){
      this.currIndex = this.totalPage
    }
    if(this.maxPageNum >= this.totalPage){
      for(idx = 1;idx <= this.totalPage; idx ++){
        !pages.includes(idx) && pages.push(idx)
      }
    } else {
      pages.push(1)
      if(this.currIndex - this.offset > 1){
        pages.push('...')
      }
      for(idx = this.currIndex - this.offset;idx <= this.currIndex + this.offset;idx ++){
        idx > 1 && idx < this.totalPage && !pages.includes(idx) && pages.push(idx);
      }
      if(this.currIndex + this.offset < this.totalPage - 1 ){
        pages.push('...');
      }
      pages.push(this.totalPage)
    }
    return pages ;
  }
  onClick (item) {
    if(item == '...'){
      // this.currIndex += (this.offset * 2 + 1)
      return ;
    } else {
      if (this.pages.includes(item)) {
        this.currIndex = item 
        this.$emit('onChange', item)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@primary-color: #1890ff;                         // 全局主色
.wsui-pager-wraper {
  display: flex;
  user-select: none;
  font-size: 12px;
  line-height: 30px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.wsui-pager {
  display: inline-flex;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 4px;
  margin: 0 4px;
  min-width: 20px;
  height: 20px;
  line-height: 18px;
  min-width: 32px;
  height: 32px;
  line-height: 30px;
  cursor: pointer;

  &.wsui-separator {
    border: none;
    cursor: default;
  }
  &.wsui-curr-page {
    color: @primary-color;
    border-color: @primary-color;
    pointer-events: none;
  }
  &:hover {
    border-color: @primary-color;
  }
  &.disabled {
    cursor: not-allowed;
    pointer-events: none;
    border-color: #d9d9d9;
    color: rgba(0, 0, 0, 0.25);
  }
  &.wsui-prev-page {
    margin-left: 0;
  }
  &.wsui-next-page {
    margin-right: 0;
  }
}

</style>
