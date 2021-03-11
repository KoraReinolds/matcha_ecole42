<template lang="pug">

  InputWrapper(
    :class="[$style['text-field'], modesClasses, { [$style.error]: errorMsg }]"
    :error="errorMsg"
  )
    label(:for="id" ref="label")
      fieldset(
        :class="$style.input_field"
        align="left"
        aria-hidden="true"
      )
        textarea(
          ref="input"
          required
          :id="id"
          v-bind="$attrs"
          :class="$style.input"
          v-if="many"
          @input="inputValue"
          @blur="$emit('blur', $event)"
          @focus="$emit('focus', $event)"
          :value="value"
        )
        input(
          required
          :id="id"
          v-bind="$attrs"
          :class="$style.input"
          v-else
          @input="inputValue"
          @blur="$emit('blur', $event)"
          @focus="$emit('focus', $event)"
          :value="value"
        )
        //- points for width (like paddings)
        legend(
          :data-title="title"
        ) ..{{ title }}...
    slot

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
  }),
  computed: {
    modesClasses() {

      const regular = !this.outlined &&!this.rounded

      return {
        [this.$style.outlined]: this.outlined,
        [this.$style.regular]: regular,
        [this.$style.filled]: this.filled && !regular,
        [this.$style.rounded]: this.rounded
      }
    }
  },
  methods: {
    inputValue(event) {
      this.$emit('input', event.target.value)
    },
    setHeight(elem) {
      if (elem) {
        elem.style.cssText = 'height:0px'
        elem.style.cssText = `height:${ elem.scrollHeight }px`
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
      this.setHeight(this.$refs.input)
    });
  },
};
</script>

<style module lang="scss">

  @import '@/assets/css/skeleton-animation.scss';
  @import '@/assets/css/field_border_color.scss';
  
  .skeleton {
    @include skeleton-mixin();
    height: 56px;
    width: 100%;
    border: none;
  }

  @mixin textFieldMixin(
    $base-color: #000,
  ) {
    
    &.regular {

      @include inputMixin(
        $base-color: $base-color,
        $top-offset: 10px,
      );

      // underline effect
      .input_field {
        legend::after {
          content: "";
          position: absolute;
          transition: width 0.3s;
          display: inline-block;
          height: 2px;
          left: 0;
          bottom: 0;
          width: 0%;
          visibility: visible;
          background: $base-color;
        }
        .input:focus ~ legend::after {
          width: 100%;
        }

      }

    }

    &.outlined {

      @include inputMixin(
        $base-color: $base-color,
        $border: solid 1px,
        $border-radius: 8px,
      );

    }

    &.rounded {
      
      @include inputMixin(
        $base-color: $base-color,
        $border-radius: 28px,
        $left-offset: 14px,
      );

    }

  }

  @mixin inputMixin(
    $base-color: #000,
    $border: transparent,
    $border-bottom: solid 1px,
    $label-size: 16px,
    $border-radius: 0px,
    $left-offset: 0px,
    $top-offset: 0px,
  ) {

    &.filled {
      
      .input_field {
        background-color: rgba($color: $base-color, $alpha: 0.05);

        &:hover {
          background-color: rgba($color: $base-color, $alpha: 0.1);
        }

      }

    }

    .input_field {
      border-radius: $border-radius;
      border: $border;
      border-bottom: $border-bottom;
      position: relative;
      height: auto;
      min-height: 56px;
      display: block;
      cursor: text;
      @include fieldBorderColorMixin(
        $base-color: $base-color,
      );

      // legend - empty space
      // legend:before - placeholder and legend text simultaneously
      legend {
        height: 0;
        max-width: 0%;
        transition: all 0.5s ease-in-out;
        transition-property: max-width font-size;
        font-size: $label-size;
        margin-left: $left-offset;
        visibility: hidden;

        &:before {
          transition: all 0.5s ease-in-out;
          transition-property: font-size top;
          visibility: visible;
          content: attr(data-title);
          position: absolute;
          font-size: $label-size;
          left: calc(10px + #{$left-offset});
          top: calc(50% + #{$top-offset});
          transform: translateY(-50%);
          color: rgba($color: $base-color, $alpha: 0.45);
        }

      }
      .input:focus,
      .input:valid {

        &~legend {
          font-size: calc(#{$label-size} * 0.75);
          max-width: 100%;
          &:before {
            font-size: calc(#{$label-size} * 0.75);
            top: calc(0px + #{$top-offset});
            color: rgba($color: $base-color, $alpha: 1.0);
          }
        }

      }

      textarea.input {
        margin-top: calc((54px - 16px) / 2 + #{$top-offset});
        margin-bottom: calc((54px - 16px) / 2 - #{$top-offset} - 8px);
        height: 16px;
        padding: 0 calc(12px + #{$left-offset});
      }
      input.input {
        top: calc(54px / 2 + #{$top-offset});
        transform: translateY(-50%);
      }
      .input {
        position: relative;
        border-radius: $border-radius;
        border: none;
        padding: 8px calc(12px + #{$left-offset});
        resize: none;
        overflow: hidden;
        background: transparent;
        font-size: 16px;
        width: 100%;
        &:focus {
          outline: none;
        }
      }

    }
  }

  .text-field {

    @include textFieldMixin(
      $base-color: $main-color,
    );

    &.error {
      @include textFieldMixin(
        $base-color: $error-color,
      )
    }

  }

</style>
