<template lang="pug">

  font-awesome-icon(
    :class="[$style[`size_${size}`], $style.icon]"
    :icon="icons[name] || name"
    v-bind="$attrs"
    @click="$emit('click', $event)"
    :mask="mask ? 'circle' : ''"
    :transform="mask ? 'shrink-4' : ''"
  )

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  inheritAttrs: false,
  name: 'Icon',
  data: () => ({
    icons: {
      ban: 'ban',
      block: 'user-slash',
      like: 'heart',
      dislike: 'heart-broken',
      visit: 'eye',
      messages: 'comment-alt',
      connected: 'yin-yang',
      male: 'mars',
      female: 'venus',
      bisexual: 'transgender',
      error: 'ban',
      ok: 'check',
    },
  }),
  props: {
    name: String,
    size: {
      type: Number,
      default: 8,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapActions({
    }),
  },
  mounted() {
  },
};
</script>

<style module lang="scss">

  @import '@/assets/css/map-size.scss';

  .icon {
    cursor: pointer;
    color: lightgray;
  }

</style>
