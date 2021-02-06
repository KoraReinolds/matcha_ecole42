<template lang="pug">
  span.distance
    font-awesome-icon.icon(
      :class="[`fa-${size}x`]"
      icon="location-arrow"
    )
    span(
      :style="{ fontSize: `${size * 10}px` }"
    ) {{ (myLocation && value !== '0') ? `${Math.floor(value * 10) / 10} km` : '...' }}
    //- ) {{ (myLocation && value !== '0') ? `${Math.floor(value / 1000)} km` : '...' }}
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Distance',
  data: () => ({
  }),
  props: {
    value: Number,
    size: Number,
  },
  computed: {
    ...mapState({
      myLocation: state => state.forms.realLocation,
    }),
    ...mapGetters({
    }),
  },
  methods: {
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
