<template lang="pug">
  font-awesome-icon(
    :class="[$style.like, `fa-${size}x`, { [$style.active]: user.likedFrom }]"
    :style="{ cursor: disabled === '' ? 'default' : 'pointer' }"
    icon="heart"
    @click="disabled !== '' && like(user)"
  )
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'Like',
  data: () => ({
  }),
  props: {
    size: Number,
    user: Object,
    disabled: Boolean,
  },
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapActions({
      like: 'forms/LIKE',
    }),
  },
  mounted() {
  },
};
</script>

<style module lang="scss">
.like {
  transition: all 0.2s;
  color: lightgray;
  cursor: pointer;
}
.active {
  color: $like-color;
}
</style>
