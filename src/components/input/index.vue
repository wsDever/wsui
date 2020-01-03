<template>
  <div class="wsui-input-wraper">
    <span class="wsui-input-affix-wrapper" v-if="$slots.prefix || $slots.suffix">
      <span v-if="$slots.prefix" class="wsui-input-prefix">
        <slot name="prefix"></slot>
      </span>
      <input
        class="wsui-input"
        :class="{ 'input-error': error }"
        ref="input"
        :type="type"
        :value="value"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :minlength="minlength"
        v-bind="$attrs"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span v-if="$slots.suffix" class="wsui-input-suffix">
        <slot name="suffix" />
      </span>
    </span>

    <template v-else>
      <input
        class="wsui-input"
        :class="{ 'input-error': error }"
        ref="input"
        :type="type"
        :value="value"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :minlength="minlength"
        v-bind="$attrs"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </template>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
// import { rules, valid } from '../../common/validate.js';
@Component({
    props: {
        type: {
            type: String,
            default: "text"
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        value: {
            type: String,
            default: ''
        },
        maxlength: {
            type: Number,
            default: 9999
        },
        minlength: {
            type: Number,
            default: 0
        },
        require: {
            type: Boolean,
            default: false
        },
        validater: {
            type: String,
            default: 'all',
            validator(v){
                return v.trim().length > 0;
            }
        }
    }
})
export default class WsuiInput extends Vue {
    error = false
    handleInput($event){
        this.$emit('input', $event.target.value)
    }
    handleFocus($event){
        this.error = false
        this.$emit('focus', $event)
    }
    handleChange($event){
        // if(this.validater && this.validater != 'all'){
        //     // let check = rules[`${this.validater}`].test($event.target.value)
        //     this.error = true ;
        // }
        this.$emit('change', $event)
    }
    handleBlur($event){
        if(!this.require){
            this.$emit('blur', $event)
        }else{
            let v = $event.target.value.trim();
            if(v.length == 0){
                this.error = true
                return ;
            }else{
                this.$emit('blur', $event)
            }
        }
    }
};
</script>

<style lang="less" scoped>
.wsui-input-wraper{
    display: inline-block;
    vertical-align: middle;
    .wsui-input {
        padding: 4px 11px;
        outline: none;
        border: 1px solid #d9d9d9;
        display: inline-block;
        width: 100%;
        height: 32px;
        font-size: 14px;
        line-height: 1.5;
        color: rgba(0, 0, 0, 0.65);
        border-radius: 4px;
        transition: all 0.3s;

        &:hover {
            border-color: #1890ff; 
        }
        &:focus {
            border-color: #40a9ff;
            outline: 0;
            box-shadow: 0 0 0 2px rgba(58, 160, 255, 0.2);
            border-right-width: 1px !important;
        }

        &:not(:first-child) {
            padding-left: 30px;
            width: calc(~"100% - 19px");
        }
    }
    .input-error {
        border-color: #ff3288 !important;
        box-shadow: 0 0 0 2px rgba(253, 80, 120, 0.2) !important;
        color: #ff3288 !important;
    }
    .wsui-input-affix-wrapper {
        position: relative;
        .wsui-input-prefix {
            left: 12px;
        }
        .wsui-input-suffix {
            right: 12px;
        }
        .wsui-input-prefix,
        .wsui-input-suffix {
            position: absolute;
            top: 50%;
            z-index: 2;
            transform: translateY(-50%);
            line-height: 0;
            color: rgba(0, 0, 0, 0.65);
        }
    }
}

</style>