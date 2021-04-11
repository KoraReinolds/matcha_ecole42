<template lang="pug">

  InputWrapper(
    :class="[$style.options, { [$style.icons]: icons, [$style.error]: errorMsg }]"
    :error="errorMsg"
  )
    template(v-slot:title)
      div(
        :class="[$style.title]"
      ) {{ title }}
    div(
      :class="{ [$style.icons]: icons }"
      v-for="value in options"
      :key="title+value"
    )
      input(
        :class="$style.option_input"
        v-bind="$attrs"
        :id="title+value"
        :value="value"
        v-model="inputValue"
        @change="$emit('change', inputValue)"
        :name="title"
      )
      label(
        :class="{ [$style.label]: !icons }"
        :for="title+value"
      )
        Icon(
          :class="$style.option_icon"
          v-if="icons"
          :name="value"
        )
        template(v-else) {{ value }}

</template>

<script>
import InputWrapper from '@/components/InputWrapper.vue'
import Icon from '@/components/Icon.vue'

export default {
  inheritAttrs: false,
  name: 'Options',
  components: {
    InputWrapper,
    Icon,
  },
  props: {
    value: [Number, String, Array],
    icons: Boolean,
    options: Array,
    errorMsg: String,
    title: String,
  },
  data: () => ({
    inputValue: [],
  }),
  watch: {
    value(val) {
      this.inputValue = val
    }
  },
  mounted() {
    this.inputValue = this.value
  },
}
</script>

<style module lang="scss">

  @import '@/assets/css/title.scss';
  @import '@/assets/css/remove_from_screen.scss';

  @mixin pseudoRadioMixin(
    $size: 20px,
    $delta-radius: 0px,
    $inner: false,
    $scale: 1,
  ) {

    @if $inner == true {
      $delta-radius: 5px,
    }

    cursor: pointer;
    content: '';
    position: absolute;
    transition: transform .2s;
    transform: translate(calc(-30px + #{$delta-radius}), -50%) scale($scale);
    top: 50%;
    left: 0;
    width: calc(#{$size} - #{$delta-radius} * 2);
    height: calc(#{$size} - #{$delta-radius} * 2);
    border-radius: 50%;
  }

  @mixin optionsMixin(
    $base-color: $main-color,
    $text-color: #000,
    $error: false,
  ) {
  
    @if $error == true {
      $base-color: $error-color;
      $text-color: $error-color;
    }

    .label {
      cursor: pointer;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      position: relative;
      font-weight: normal;
      left: 30px;
      color: $text-color;
      &:before {
        @include pseudoRadioMixin();
        background: $base-color;
      }
      &:after {
        @include pseudoRadioMixin($inner: true, $scale: 0);
        background: #fff;
      }
    }

    .icons {
      display: inline-block;
    }
  
    .title {
      @include titleMixin(
        $base-color: $base-color,
      )
    }
  
    .option_input[type=checkbox] {
      & + .label:after,
      & + .label:before,
      &:checked + .label:after {
        border-radius: 3px;
      }
    }
  
    .option_input {
      @include removeFromScreenMixin();
      &:checked + .label:after {
        @include pseudoRadioMixin($inner: true);
      }
    }

    .option_input:checked ~ label .option_icon {
      color:$base-color;
    }
  }

  .options {

    @include optionsMixin();

    &.error {

      @include optionsMixin($error: true);

    }

  }

</style>