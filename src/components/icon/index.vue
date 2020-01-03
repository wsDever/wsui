<template>
    <div class="wsui-icon" :class="iconWrapClazz" @click="$emit('click')">
        <svg class="icon" :class="iconClazz">
            <use :xlink:href="`#i-${type}`"></use>
        </svg>
    </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
@Component({
    props: {
        type: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: ''
        },
        round: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        iconWrapClazz(){
            return {
                ['wsui-icon-round']: this.round,
                [`wsui-icon-${this.color}`]: this.color
            }
        },
        iconClazz () {
            return {
                [`icon-${this.type}`]: this.type
            }
        }
    }
})
export default class WsuiIcon extends Vue {
  mounted () {
    import("./symbol")
  }
}
</script>

<style lang="less" scoped>
@keyframes loadingCircle {
  100% {
    transform: rotate(360deg);
  }
}
.wsui-icon{
    display: inline-flex;
}
.icon {
  width: 1em; 
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
.wsui-icon-round{
    border: 1px solid;
    border-radius: 50%;
    width: 1em;
    height: 1em;
    padding: 5px;
    margin: 0 10px;
}
.wsui-icon-red{
    color:red
}
.icon-spin {
  animation: loadingCircle 1s infinite linear;
}
.icon-loading{
  animation: loadingCircle 1s infinite linear;
}

</style>
