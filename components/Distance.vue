<template lang="pug">
  span
    Icon(
      :class="$style.icon"
      name="location-arrow"
      :size="size"
    )
    span(
      :class="$style[`font_size_${size - 2}`]"
    ) {{ ($store.state.forms.realLocation && value !== '0') ? `${value} km` : '...' }}
</template>

<script>
import Icon from '@/components/Icon.vue'

export default {
  name: 'Distance',
  components: {
    Icon,
  },
  props: {
    value: Number,
    size: {
      type: Number,
      default: 8,
    },
  },
}
</script>

<style module lang="scss">

  @import '@/assets/css/map-size.scss';

  .icon {
    color: $main-color;
    margin-right: 5px;
  }

</style>
