<template lang="pug">
  span.raiting
    font-awesome-icon.star(
      icon="star"
      :class="[`fa-${size}x`]"
      :style="{ opacity }"
    )
    span(
      :style="{ fontSize: `${size * 10}px` }"
    ) {{ value.toString() || '...' }}
</template>

<script>
export default {
  name: 'Raiting',
  data: () => ({
    opacity: null,
  }),
  props: {
    value: [String, Number],
    size: Number,
  },
  mounted() {
    this.opacity = this.value / 1000 + 0.2;
  },
};
</script>

<style scoped lang="scss">
.raiting {
  .star {
    color: $main-color;
  }
}
</style>
