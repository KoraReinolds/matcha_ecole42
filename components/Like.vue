<template lang="pug">
  RoundedIcon(
    v-if="user.likedFrom !== undefined"
    :class="[$style.like, user.likedFrom ? $style.like_color : $style.inactive_color]"
    :innerScale="0.6"
    name="heart"
    :size="size || 14"
    @click="like(user)"
    :circleColor="circleColor"
  )
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import RoundedIcon from '@/components/RoundedIcon.vue'

export default {
  name: 'Like',
  components: {
    RoundedIcon,
  },
  data: () => ({
  }),
  props: {
    circleColor: String,
    size: Number,
    user: Object,
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

@import '@/assets/css/map-colors.scss';

  .like {
    transition: color 0.2s;
  }

</style>
