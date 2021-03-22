<template lang="pug">
  span
    Icon(
      :class="$style.icon"
      name="location-arrow"
      :size="size"
    )
    span(
      :class="$style[`font_size_${size - 2}`]"
    ) {{ (myLocation && value !== '0') ? `${Math.floor(value / 1000)} km` : '...' }}
    //- ) {{ (myLocation && value !== '0') ? `${Math.floor(value * 10) / 10} km` : '...' }}
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import Icon from '@/components/Icon.vue'

export default {
  name: 'Distance',
  data: () => ({
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

<style module lang="scss">

  @import '@/assets/css/map-size.scss';

  .icon {
    color: $main-color;
    margin-right: 5px;
  }

</style>
