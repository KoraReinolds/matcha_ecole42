<template lang="pug">
  div(:class="['text-field', modesClasses, { focus: focus, empty: !value, error: data.errorMsg }]")
    fieldset(:class="['input-field']" align="left" aria-hidden="true" @click.prevent="($refs.input || $refs.textarea).focus()")
      legend(:style="{ width: (focus || value) ? `${legendLen + 8}px`: '0px' }")
      textarea(v-if="textarea" ref="textarea" type="text" @focus="onFocuc" @blur="onBlur" @input="$emit('input', $event.target.value);" :value="value")
      input(v-else ref="input" type="text" @focus="onFocus" @blur="onBlur" @input="$emit('input', $event.target.value)" :value="value")
      label(ref="label") {{ data.title }}
    div(:class="['tooltip-field']") {{ data.errorMsg }}
</template>

<script>
export default {
  name: 'TextField',
  props: {
    value: String,
    outlined: Boolean,
    filled: Boolean,
    rounded: Boolean,
    data: Object,
    many: Boolean,
  },
  data: () => ({
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
    modesClasses: function() {
      return {
        filled: this.filledMode,
        regular: this.regularMode,
        outlined: this.outlinedMode,
        rounded: this.roundedMode,
      }
    }
  },
  methods: {
    onFocus(event) {
      this.focus = true;
      this.$emit('focus', event);
    },
    onBlur(event) {
      this.focus = false;
      this.$emit('blur', event);
    },
    setHeight(elem) {
      const el = elem;
      if (el) {
        el.style.cssText = 'height:0px';
        el.style.cssText = `height:${
          el.scrollHeight + 12
        }px`;
      }
    },
  },
  watch: {
    value() {
      this.$nextTick(() => {
        this.setHeight(this.$refs.textarea);
      });
    },
  },
  mounted() {
    this.textarea = this.many;
    this.filledMode = this.filled;
    this.outlinedMode = this.outlined;
    this.roundedMode = this.rounded;
    if (!this.outlined) {
      this.regularMode = true;
    }
    if (this.rounded) {
      this.outlinedMode = true;
      this.regularMode = null;
    }
    if (this.value) this.legendLen = this.$refs.label.offsetWidth;
    else this.legendLen = this.$refs.label.offsetWidth * 0.75;
    this.$nextTick(() => {
      this.setHeight(this.$refs.textarea);
    });
  },
};
</script>

<style lang="scss">

  .text-field {
    min-height: 86px;
    .input-field {
      height: auto;
      cursor: text;
      transition: all 0.3s;
      border: solid 1px rgba($color: #000000, $alpha: 0.45);
      position: relative;
      width: 100%;
      left: 0;
      top: 0px;
      min-height: 56px;
      legend {
        transition: width 0.3s;
        margin-left: 8px;
      }
      textarea,
      input {
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
        position: absolute;
        left: 12px;
        top: 16px;
        transition: all 0.3s;
        font-size: 16px;
        color: rgba($color: #000000, $alpha: 0.45);
      }
      &:hover {
        border-color: rgba(0.0, 0.0, 0.0, 0.75);
        label {
          color: rgba(0.0, 0.0, 0.0, 0.75);
        }
      }
    }
    &.error {
      .tooltip-field,
      label {
        color: $error-color !important;
      }
      .input-field::after {
        background: $error-color !important;
      }
      .input-field {
        border-color: $error-color !important;
      }
    }
    &.focus,
    &:not(.empty) {
      label {
        font-size: 12px;
      }
    }

    &.regular {
      .input-field {
        border: transparent;
        border-bottom: solid 1px rgba($color: #000000, $alpha: 0.45);
        textarea {
          position: relative;
          top: 20px;
          padding: 8px 12px;
        }
        input {
          padding: 8px 12px;
          position: absolute;
          bottom: 0;
        }
        label {
          top: 26px;
        }
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
        &:hover {
          border-color: rgba(0.0, 0.0, 0.0, 0.75);
        }
      }
      &.focus,
      &:not(.empty) {
        .input-field {
          label {
            top: 5px;
          }
        }
      }
      &.focus {
        .input-field::after {
          width: 100%;
        }
      }
    }

    &.outlined {
      .input-field {
        border-radius: 8px;
        textarea,
        input {
          position: relative;
          top: 11px;
          padding: 8px 12px;
        }
      }
      &.focus,
      &:not(.empty) {
        label {
          top: -9px;
        }
      }
      &.focus {
        fieldset {
          border: 2px solid rgba(0.0, 0.0, 0.0, 0.45);
        }
      }
    }

    &.rounded {
      .input-field {
        border-radius: 28px;
        legend {
          margin-left: 22px;
        }
        textarea {
          padding: 8px 26px;
        }
        input {
          position: absolute;
          bottom: 0px;
          padding: 8px 26px;
        }
        label {
          left: 26px;
        }
      }
    }

    &.filled {
      .input-field {
        background: rgba($color: #000000, $alpha: 0.05);
        &:hover {
          background: rgba($color: #000000, $alpha: 0.1);
        }
      }
      &.error {
        .input-field {
          background: rgba($color: $error-color, $alpha: 0.05);
        }
      }
    }

  &.rounded .tooltip-field {
    padding: 0 26px;
  }

}
</style>
