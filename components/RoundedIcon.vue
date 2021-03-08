<template lang="pug">

  font-awesome-icon-layers(
    :class="[$style[`size_${size}`]]"
    @click="$emit('click', $event)"
  )
    Icon(
      :class="[$style.circle]"
      name="circle"
    )
    Icon(
      :class="[$style.inner]"
      :name="name"
    )

</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
  name: 'RoundedIcon',
  props: {
    name: String,
    size: {
      type: Number,
      default: 12,
    },
    mask: Boolean,
  },
  components: {
    Icon,
  },
  mounted() {
  },
};
</script>

<style module lang="scss">

  @import '@/assets/css/map-size.scss';

  .circle {
    color: #fff;
    min-width: 100%;
    min-height: 100%;
  }

  .inner {
    color: inherit;
    transform: scale(0.75);
    min-width: 100%;
    min-height: 100%;
  }
</style>
