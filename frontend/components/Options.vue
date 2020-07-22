<template lang="pug">
  div.option-field(
    :class="{ empty: !value, error: data.errorMsg }"
  )
    div.title.left {{ data.title }}
    div.options(
      :class="{ many: type === 'checkbox', icons }"
    )
      div(
        v-for="opt in data.options"
        :key="data.title+opt"
      )
        input(
          :type="type"
          :id="data.title+opt"
          :value="opt"
          @change="change"
          :name="data.title"
          :checked="optionChecked(opt)"
        )
        label(
          :class="{ label: !icons }"
          :for="data.title+opt"
        )
          font-awesome-icon.icon.fa-2x(
            v-if="icons"
            :icon="['fas', icons[opt]]"
            :class="{ active: optionChecked(opt) }"
          )
          template(v-else) {{ opt }}
      div.tooltip-field {{ data.errorMsg }}
</template>

<script>

export default {
  name: 'Options',
  props: {
    value: [Array, String],
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
      return this.type === 'radio' ?
        this.data.value === opt :
        this.data.value.includes(opt)
    },
    change(event) {
      if (Array.isArray(this.value)) {
        const { value } = event.target;
        let newVal = [...this.value];
        if (!this.value.includes(value)) newVal.push(value);
        else newVal = newVal.filter(val => val !== value);
        this.$emit('input', newVal)
      } else {
        this.$emit('input', event.target.value)
      }
    },
  },
  mounted() {
    this.type = this.many ? 'checkbox' : 'radio';
  },
};
</script>

<style scoped lang="scss">
.option-field {
  text-align: left;
  .options {
    .tooltip-field {
      height: 30px;
    }
    input {
      z-index: -1;
      opacity: 0;
      width: 0;
      height: 0;
      &:checked + .label:after {
        top: 10px;
        left: -25px;
        width: 10px;
        height: 10px;
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
        &.active {
          color: $main-color;
        }
      }
    }
  }
  &.error {
    .tooltip-field {
      color: $error-color !important;
    }
    .label:before {
      background: rgba($color: $error-color, $alpha: 0.75) !important;
    }
  }
}

</style>
