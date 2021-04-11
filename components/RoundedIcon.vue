<template lang="pug">

  font-awesome-icon-layers(
    :class="[$style[`size_${size}`]]"
    @click="$emit('click', $event)"
  )
    Icon(
      :class="[$style.circle, $style[`${ circleColor }_color`]]"
      name="circle"
    )
    Icon(
      :class="[$style.inner]"
      :style="{ transform: `scale(${innerScale})` }"
      :name="name"
    )

</template>

<script>
import Icon from '@/components/Icon.vue'

export default {
  name: 'RoundedIcon',
  props: {
    name: String,
    circleColor: {
      type: String,
      default: 'white',
    },
    size: {
      type: Number,
      default: 12,
    },
    innerScale: {
      type: Number,
      default: 0.75,
    },
  },
  components: {
    Icon,
  },
}
</script>

<style module lang="scss">

  @import '@/assets/css/map-colors.scss';
  @import '@/assets/css/map-size.scss';

  .circle {
    min-width: 100%;
    min-height: 100%;
  }

  .inner {
    color: inherit;
    min-width: 100%;
    min-height: 100%;
  }
  
</style>
