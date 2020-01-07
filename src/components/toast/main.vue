<template>
  <section class="wsui-toast-wrapper" ref="toastEl" :class="clazz">
    <div class="wsui-toast-inner">
      <span class="wsui-toast-massage" v-if="enableHtml" v-html="message" />
      <span class="wsui-toast-massage" v-else v-text="message" />

      <span
        v-if="showClose && closeText"
        ref="close-box"
        @click="onClickClose"
        class="wsui-toast-close-box"
      >
        {{ closeText }}
      </span>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component';
@Component({
  props: {
    message: {
      type: String,
      required: true
    },
    durition: {
      type: Number,
      default: 3
    },
    enableHtml: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: false
    },
    autoClose: {
      type: Boolean,
      default: true
    },
    closeText: {
      type: String,
      default: "确定"
    },
    onClose: {
      type: Function
    },
    position: {
      type: String,
      default: "top",
      validtor(v) {
        return ["top", "middle", "bottom", "right-bottom", "right-top"].includes(v);
      }
    }
  }
})
export default class WsuiToast extends Vue {
  timer = null
  closed = false
  get clazz() {
    return [`wsui-toast-position-${this.position}`];
  }
  
  mounted() {
    this.updateStyles();
    this.execAutoClose();
  }

  
  updateStyles() {
    if (!this.showClose) { return; }
    this.$nextTick(() => {
      let height = this.$refs.toastEl.getBoundingClientRect().height;
      this.$refs['close-box'].style.height = `${height}px`;
      this.$refs['close-box'].style.lineHeight = `${height}px`;
    });
  }
  execAutoClose() {
    if (this.autoClose) {
      this.timer = setTimeout(() => {
        this.remove();
      }, this.durition * 1000);
    }
  }
  remove() {
    if (this.closed) { return; }
    /**
     * closed 状态可以避免 onClose 中再次调用 toast 时导致的循环调用
     */
    this.closed = true;
    clearTimeout(this.timer);
    this.closeText && this.onClose && this.onClose();
    this.$el.remove();
    // destroy 并不会把元素删掉，所以要自己手动删掉
    this.$destroy();
  }
  onClickClose() {
    this.remove();
  }
  
};
</script>

<style lang="less" scoped>
@animation-duration: 500ms;

@keyframes slide-up {
  0% { opacity: 0; transform: translateY(100%); }
  100% { opacity: 1; transform: translateY(0%); }
}
@keyframes slide-down {
  0% { opacity: 0; transform: translateY(-100%); }
  100% { opacity: 1; transform: translateY(0%); }
}
@keyframes slide-right {
  0% { opacity: 0; transform: translateX(100%);}
  100% { opacity: 1; transform: translateX(0%);}
}
@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.wsui-toast-wrapper {
  position: fixed;
  
  z-index: 100;

  &.wsui-toast-position-top {
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    .wsui-toast-inner {
      animation: slide-down @animation-duration;
    }
  }
  &.wsui-toast-position-middle {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .wsui-toast-inner {
      animation: fade-in @animation-duration;
    }
  }
  &.wsui-toast-position-bottom {
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);

    .wsui-toast-inner {
      animation: slide-up @animation-duration;
    }
  }
  &.wsui-toast-position-right-top {
    top: 15px;
    right: 0;

    .wsui-toast-inner {
      animation: slide-right @animation-duration;
    }
  }
  &.wsui-toast-position-right-bottom {
    bottom: 15px;
    right: 0;

    .wsui-toast-inner {
      animation: slide-right @animation-duration;
    }
  }
}

.wsui-toast-inner {
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.75);
  min-height: 40px;
  line-height: 1.8;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.50);
  
  display: flex;
  align-items: center;

  .wsui-toast-massage {
    padding: 8px 16px;
  }

  .wsui-toast-close-box {
    border-left: 1px solid #666;
    padding: 0 16px;
    cursor: pointer;
  }
}
</style>
