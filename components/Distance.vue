<template lang="pug">
  span.distance
    font-awesome-icon.icon(
      :class="[`fa-${size}x`]"
      icon="location-arrow"
    )
    span(
      :style="{ fontSize: `${size * 10}px` }"
    ) {{ (myLocation && value) ? `${distance()} km` : '...' }}
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Distance',
  data: () => ({
  }),
  props: {
    value: Object,
    size: Number,
  },
  computed: {
    ...mapGetters({
      myLocation: 'forms/MY_LOCATION',
    }),
  },
  methods: {
    distance() {
      const diffX = Math.abs(this.myLocation.x - this.value.x);
      const diffY = Math.abs(this.myLocation.y - this.value.y);
      return Math.floor(Math.sqrt(diffX * diffX + diffY * diffY) * 111.3);
    },
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
.distance {
  .icon {
    color: lighten($main-color, 10%);
  }
}
</style>
