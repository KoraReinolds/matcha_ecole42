<template lang="pug">

  font-awesome-icon-layers.rounded-icon(
    v-if="!mask"
    :class="[`fa-${size}x`]"
    @click="$emit('click', $event)"
  )
    font-awesome-icon.circle(
      icon="circle"
      :style="{ borderRadius: `${8 * size}px` }"
    )
    font-awesome-icon.inner-icon(
      :class="[`${icon}_color`]"
      :icon="icons[icon] ? icons[icon] : icon"
      :transform="`shrink-5`"
    )

  font-awesome-icon(
    v-else
    :icon="icons[icon] ? icons[icon] : icon"
    :class="[`${icon}_color`]"
    @click="$emit('click', $event)"
    transform="shrink-5"
    mask="circle"
    :size="`${size}x`"
  )
</template>

<script>
import iconsMixin from '../mixins/iconMixin';

export default {
  name: 'roundIcon',
  props: {
    icon: String,
    size: Number,
    mask: Boolean,
  },
  mixins: [iconsMixin],
  mounted() {
  },
};
</script>

<style scoped lang="scss">
.rounded-icon {
  .circle {
    color: white;
    box-shadow: 0 0 10px lightgrey;
  }
}
</style>
