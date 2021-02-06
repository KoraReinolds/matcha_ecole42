<template lang="pug">

  InputWrapper(
    :class="[modesClasses, stateClasses]"
    :error="errorMsg"
  )
    fieldset(
      :class="$style.input_field"
      align="left"
      aria-hidden="true"
    )
      legend(
        :style="{ width: `${(focus || value) ? legendLen + 8 : 0}px` }"
      )
      label(:for="id" ref="label") {{ title }}
      textarea(
        :id="id"
        v-bind="$attrs"
        :class="$style.input"
        v-if="textarea"
        ref="input"
        @focus="onFocus"
        @blur="onBlur"
        @input="inputValue"
        :value="value"
      )
      input(
        :id="id"
        v-bind="$attrs"
        :class="$style.input"
        v-else
        ref="input"
        @focus="onFocus"
        @blur="onBlur"
        @input="inputValue"
        :value="value"
      )

</template>

<script>
import InputWrapper from '@/components/InputWrapper.vue'

export default {
  inheritAttrs: false,
  name: 'TextField',
  components: {
    InputWrapper,
  },
  props: {
    value: [String, Number],
    outlined: Boolean,
    filled: Boolean,
    rounded: Boolean,
    title: String,
    errorMsg: String,
    many: Boolean,
  },
  data: () => ({
    id: Math.random(),
    focus: false,
    legendLen: null,
    textarea: null,
  }),
  computed: {
    stateClasses() {
      return {
        [this.$style.focus]: this.focus,
        [this.$style.not_empty]: this.value,
        [this.$style.error]: this.errorMsg,
      }
    },
    modesClasses() {
      return {
        [this.$style.outlined]: this.outlined,
        [this.$style.regular]: !this.outlined && !this.rounded,
        [this.$style.outlined]: this.outlined,
        [this.$style.rounded]: this.rounded
      }
    }
  },
  methods: {
    inputValue(event) {
      this.$emit('input', event.target.value)
    },
    onFocus(event) {
      this.focus = true
      this.$emit('focus', event)
    },
    onBlur(event) {
      this.focus = false
      this.$emit('blur', event)
    },
    setHeight(elem) {
      const el = elem;
      if (el) {
        el.style.cssText = 'height:0px'
        el.style.cssText = `height:${
          el.scrollHeight + 12
        }px`
      }
    },
  },
  watch: {
    value() {
      this.$nextTick(() => {
        this.setHeight(this.$refs.input)
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.value) this.legendLen = this.$refs.label.offsetWidth
      else this.legendLen = this.$refs.label.offsetWidth * 0.75
      this.setHeight(this.$refs.input)

      // for move placeholder top when browser set saved value
      this.onFocus()
      this.onBlur()
    });
  },
};
</script>

<style module lang="scss">

  @import '@/assets/css/skeleton-animation.scss';
  
  .skeleton {
    @include skeleton-mixin();
    height: 56px;
    width: 100%;
    border: none;
  }

  @mixin errorMixin() {
    &.error {
      .tooltip_field,
      label {
        color: $error-color !important;
      }
      .input_field::after {
        background: $error-color !important;
      }
      .input_field {
        border-color: $error-color !important;
      }
      &.filled .input_field {
        background: rgba($color: $error-color, $alpha: 0.05);
      }
    }
  }

  @mixin inputMixin(
    $border: solid 1px rgba($color: #000000, $alpha: 0.45),
    $border-bottom: solid 1px rgba($color: #000000, $alpha: 0.45),
    $label-top-offset: 0px,
    $input-top-offset: 20px,
    $label-size: 16px,
    $border-radius: 0px,
    $left-offset: 0px,
  ) {
    .input_field {
      border-radius: $border-radius;
      cursor: text;
      transition: all 0.3s;
      border: $border;
      border-bottom: $border-bottom;
      position: relative;
      width: 100%;
      left: 0;
      top: 0px;
      min-height: 56px;
      legend {
        transition: width 0.3s;
        margin-left: calc(8px + #{$left-offset});
      }
      .input {
        position: relative;
        padding: 8px calc(12px + #{$left-offset});
        top: $input-top-offset;
        resize: none;
        border: none;
        background: transparent;
        font-size: 16px;
        height: 32px;
        width: 100%;
        &:focus {
          outline: none;
        }
      }
      label {
        font-size: $label-size;
        position: absolute;
        top: 50%;
        left: calc(12px + #{$left-offset});
        top: $label-top-offset;
        transition: all 0.3s;
        color: rgba($color: #000000, $alpha: 0.45);
      }
      &:hover {
        border-color: rgba(0.0, 0.0, 0.0, 0.75);
        label {
          color: rgba(0.0, 0.0, 0.0, 0.75);
        }
      }
    }
  }

  @mixin inputWrapperMixin(
    $args,
    $label-top-offset,
    $label-top-offset-focus,
  ) {

    &.not_empty,
    &.focus {
      @include inputMixin(
        $label-top-offset: $label-top-offset,
        $label-size: 12px,
        $args...,
      );
    }

    @include errorMixin();

    @include inputMixin(
      $label-top-offset: $label-top-offset-focus,
      $args...,
    );
  }

  .regular {
    
    @include inputWrapperMixin(
      $args: (
        'border': transparent,
        'border-bottom': solid 1px rgba($color: #000000, $alpha: 0.45),
      ),
      $label-top-offset: 5px,
      $label-top-offset-focus: 26px,
    );

    .input_field {
      &::after {
        content: "";
        position: absolute;
        transition: width 0.5s;
        display: inline-block;
        height: 1px;
        left: 0;
        bottom: calc(-100% - 1px);
        width: 0%;
        background: rgba(0.0, 0.0, 0.0, 0.45);
      }
    }
    &.focus {
      .input_field::after {
        width: 100%;
      }
    }

  }

  .outlined {

    @include inputWrapperMixin(
      $args: (
        'input-top-offset': 11px,
        'border-radius': 8px,
      ),
      $label-top-offset: -9px,
      $label-top-offset-focus: 16px,
    );

    &.focus {
      .input_field {
        border: 2px solid rgba(0.0, 0.0, 0.0, 0.45);
      }
    }
    
  }

  .rounded {

    @include inputWrapperMixin(
      $args: (
        'input-top-offset': 11px,
        'border-radius': 28px,
        'left-offset': 14px,
      ),
      $label-top-offset: -9px,
      $label-top-offset-focus: 16px,
    );

  }

  .filled {

    .input_field {
      background: rgba($color: #000000, $alpha: 0.05);
      &:hover {
        background: rgba($color: #000000, $alpha: 0.1);
      }
    }

  }

</style>
