<template lang="pug">

  InputWrapper(
    :class="[modesClasses, stateClasses]"
    :error="data.errorMsg"
  )
    fieldset(
      v-show="showField"
      :class="$style.input_field"
      align="left"
      aria-hidden="true"
      @click.prevent="($refs.input || $refs.textarea).focus()"
    )
      legend(
        :style="{ width: `${(focus || value) ? legendLen + 8 : 0}px` }"
      )
      label(ref="label") {{ data.title }}
      textarea(
        :class="$style.input"
        v-if="textarea"
        ref="textarea"
        :type="type || 'text'"
        @focus="onFocus"
        @blur="onBlur"
        @input="inputValue"
        :value="value"
        :name="name"
        :step="step || 1"
        :min="min || 0"
        :max="max || ''"
      )
      input(
        :class="$style.input"
        v-else
        ref="input"
        :type="type || 'text'"
        @focus="onFocus"
        @blur="onBlur"
        @input="inputValue"
        :value="value"
        :name="name"
        :step="step || 1"
        :min="min || 0"
        :max="max || ''"
      )
    fieldset(
      v-show="!showField"
      :class="$style.skeleton"
    )
</template>

<script>
import InputWrapper from '@/components/InputWrapper.vue'

export default {
  name: 'TextField',
  components: {
    InputWrapper,
  },
  props: {
    min: String,
    max: String,
    step: String,
    name: String,
    type: String,
    value: [String, Number],
    outlined: Boolean,
    filled: Boolean,
    rounded: Boolean,
    data: Object,
    many: Boolean,
  },
  data: () => ({
    showField: false,
    filledMode: null,
    regularMode: null,
    outlinedMode: null,
    roundedMode: null,
    focus: false,
    legendLen: null,
    textarea: null,
  }),
  mixins: [],
  computed: {
    stateClasses: function() {
      return {
        [this.$style.focus]: this.focus,
        [this.$style.not_empty]: this.value,
        [this.$style.error]: this.data.errorMsg,
      }
    },
    modesClasses: function() {
      return {
        [this.$style.filled]: this.filledMode,
        [this.$style.regular]: this.regularMode,
        [this.$style.outlined]: this.outlinedMode,
        [this.$style.rounded]: this.roundedMode,
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
        this.setHeight(this.$refs.textarea)
      });
    },
  },
  mounted() {
    this.textarea = this.many
    this.filledMode = this.filled
    this.outlinedMode = this.outlined
    this.roundedMode = this.rounded
    if (!this.outlined) {
      this.regularMode = true
    }
    if (this.rounded) {
      this.outlinedMode = true
      this.regularMode = null
    }
    this.showField = true
    this.$nextTick(() => {
      if (this.value) this.legendLen = this.$refs.label.offsetWidth
      else this.legendLen = this.$refs.label.offsetWidth * 0.75
      this.setHeight(this.$refs.textarea)
    });
  },
};
</script>

<style module lang="scss">

  .skeleton {
    @keyframes changeColor {
      from {
        background: rgba($color: black, $alpha: 0.05);
      }
      to {
        background: rgba($color: black, $alpha: 0.15);
      }
    }
    animation: changeColor 1s infinite alternate;
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
        display: block;
        height: 1px;
        bottom: 0;
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
