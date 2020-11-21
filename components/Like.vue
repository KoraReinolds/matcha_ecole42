<template lang="pug">
  font-awesome-icon.icon.like(
    :class="[`fa-${size}x`, { like_color: active }]"
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
    active: Boolean,
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

<style scoped lang="scss">
.like {
  transition: all 0.2s;
  color: lightgray;
  cursor: pointer;
}
</style>
