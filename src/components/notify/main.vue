<template>
  <section class="wsui-notification" ref="notificationEl">
    <transition-group name="wsui-slide-left">
      <div
        class="wsui-notification-item"
        v-for="item in notices"
        :key="item.id"
        @click="clickItem(item.id)"
      >
        <a class="wsui-notification-close" @click.stop="remove(item.id)">
          <wsui-icon type="close-circle" />
        </a>
        <div class="wsui-notification-title">{{ item.title || title}}</div>
        <div class="wsui-notification-message">{{ item.message || message }}</div>
      </div>
    </transition-group>
  </section>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component';
@Component({
})

export default class WsuiNotification extends Vue{
  notices = []
  title = "标题"
  message = '通知内容'
  durition = 3
  add(options) {
    let _notice = Object.assign({ durition: this.durition }, options);
    this.notices.push(options);
    this.setTimer(_notice);

    // let { top, height } = this.$refs.notificationEl.getBoundingClientRect();
  }
  remove(id) {
    let index = this.notices.findIndex(item => {
      return item.id === id
    });
    if (index >= 0 ) {
      let onClose = this.notices[index]['onClose']
      this.notices.splice(index, 1);
      onClose && onClose();
    }
  }
  setTimer(_notice) {
    let durition = _notice.durition;
    if (durition === 0) { return }
    setTimeout(() => {
      this.remove(_notice.id);
    }, durition * 1000);
  }
  clickItem(id){
    let index = this.notices.findIndex(item => {
      return item.id === id
    })
    if (index >= 0 ) {
      let onClick = this.notices[index]['onClick'];
      onClick && onClick()
    }
  }
};
</script>

<style lang="less" scoped>
.wsui-notification {
  position: fixed;
  top: 10px;
  right: 0;
  z-index: 100;

  overflow: hidden;

  &-item {
    position: relative;
    background-color: #ccc;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 12px;
    padding: 14px 26px 14px 13px;
    border-radius: 8px;
    box-sizing: border-box;
    border: 1px solid #ebeef5;
    background-color: #fff;
    margin-bottom: 10px;
    margin-right: 16px;
    width: 330px;

    &:last-child {
      margin-bottom: 0;
    }

    .wsui-notification-title {
      padding: 0;
      margin: 0;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 8px;
      line-height: 24px;
      display: inline-block;
      padding-right: 24px;
      font-weight: bold;

      margin-left: 13px;
    }
    .wsui-notification-message {
      color: #606266;
      margin-left: 13px;
    }

    .wsui-notification-close {
      position: absolute;
      top: 18px;
      right: 15px;
      cursor: pointer;
      color: #909399;
      font-size: 16px;

      &:hover {
        color: rgba(0, 0, 0, 0.67);
      }
    }

  }
}

.left {
  left: 16px;
}
.right {
  right: 16px;
}

.wsui-slide-left-enter-active,
.wsui-slide-left-leave-active {
  transition: all .3s ease-out;
}
.wsui-slide-left-enter {
  transform: translateX(100%);
}
.wsui-slide-left-leave-to {
  opacity: 0;
}

</style>
