<template lang="pug">
  font-awesome-icon(
    :class="[`fa-${size || 2}x`, $style.icon]"
    :icon="icons[name] || name"
    @click="$emit('click', $event)"
  )
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
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
    size: Number,
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

  .icon {
    cursor: pointer;
    color: lightgray;
  }

</style>
