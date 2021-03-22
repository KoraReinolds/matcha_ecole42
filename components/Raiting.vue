<template lang="pug">
  span
    Icon(
      :class="$style.icon"
      name="star"
      :style="{ opacity }"
      :size="size"
    )
    span(
      :class="$style[`font_size_${size - 2}`]"
    ) {{ value.toString() || '...' }}
</template>

<script>
import Icon from '@/components/Icon.vue'

export default {
  name: 'Raiting',
  data: () => ({
    opacity: null,
  }),
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
  mounted() {
    this.opacity = this.value / 1000 + 0.2;
  },
};
</script>

<style module lang="scss">

  @import '@/assets/css/map-size.scss';

  .icon {
    color: $main-color;
    margin-right: 5px;
  }

</style>
