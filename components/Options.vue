<template lang="pug">

  InputWrapper(
    :class="{ [$style.error]: data.errorMsg }"
    :error="data.errorMsg"
  )
    template(v-slot:title)
      div.title.left {{ data.title }}
    div(
      :class="[$style.options, { [$style.many]: type === 'checkbox', [$style.icons]: icons }]"
    )
      div(
        v-for="[opt, value] in Object.entries(data.options)"
        :key="data.title+value"
      )
        input(
          :type="type"
          :id="data.title+value"
          :value="value"
          @change="change"
          :name="data.title"
          :checked="optionChecked(value)"
        )
        label(
          :class="{ [$style.label]: !icons }"
          :for="data.title+value"
        )
          font-awesome-icon.fa-2x(
            v-if="icons"
            :icon="['fas', icons[value]]"
            :class="[$style.icon, { [$style.active]: optionChecked(value) }]"
          )
          template(v-else) {{ opt }}

</template>

<script>
import InputWrapper from '@/components/InputWrapper.vue'

export default {
  name: 'Options',
  components: {
    InputWrapper,
  },
  props: {
    value: [Number, String, Array],
    data: Object,
    many: Boolean,
    icons: Object,
  },
  data: () => ({
    type: null,
    errorMsg: null,
  }),
  computed: {
  },
  methods: {
    optionChecked(opt) {
      return this.many ?
        this.value.includes(opt) :
        this.value === opt
    },
    change(event) {
      if (Array.isArray(this.value)) {
        const { value } = event.target
        let newVal = [...this.value]
        if (!this.value.includes(value)) newVal.push(value)
        else newVal = newVal.filter(val => val !== value)
        this.$emit('input', newVal)
      } else {
        this.$emit('input', event.target.value)
      }
    },
  },
  mounted() {
    this.type = this.many ? 'checkbox' : 'radio'
  },
};
</script>

<style module lang="scss">

  .options {
    .tooltip_field {
      height: 30px;
    }
    input {
      z-index: -1;
      opacity: 0;
      width: 0;
      
      height: 0;
      &:checked + .label:after {
        top: 10px;
        left: -26px;
        width: 11px;
        height: 11px;
      }
    }
    .label {
      cursor: pointer;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      position: relative;
      font-weight: normal;
      left: 30px;
      &:before {
        cursor: pointer;
        content: '';
        position: absolute;
        top: 5px;
        left: -30px;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background: $main-color;
        transition: .2s;
      }
      &:after {
        content: '';
        width: 0;
        height: 0;
        top: 15px;
        left: -20px;
        position: absolute;
        border-radius: 8px;
        background: #fff;
        transition: .2s;
      }
    }
    &.many {
      input:checked + .label:after {
        top: 10px;
        left: -25px;
        width: 10px;
        height: 10px;
      }
      .label {
        &:before {
          cursor: pointer;
          content: '';
          position: absolute;
          top: 5px;
          left: -30px;
          width: 20px;
          height: 20px;
          border-radius: 4px;
          background: $main-color;
          transition: .2s;
        }
        &:after {
          content: '';
          width: 0;
          height: 0;
          top: 15px;
          left: -20px;
          position: absolute;
          border-radius: 2px;
          background: #fff;
          transition: .2s;
        }
      }
    }
    &.icons {
      display: flex;
      padding: 10px 0;
      .icon {
        cursor: pointer;
        color: lightgray;
        &.active {
          color: $main-color;
        }
      }
    }
  &.error {
    .tooltip_field {
      color: $error-color !important;
    }
    .label:before {
      background: rgba($color: $error-color, $alpha: 0.75) !important;
    }
  }
}
</style>