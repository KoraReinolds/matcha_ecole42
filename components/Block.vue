<template lang="pug">
  font-awesome-icon.icon.block(
    :class="[`fa-${size}x`, { block_color: user.isBlocked }]"
    icon="user-slash"
    @click="block({ toLogin: user.login, isBlocked: !user.isBlocked })"
  )
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Block',
  data: () => ({
  }),
  props: {
    size: Number,
    user: Object,
  },
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapActions({
      block: 'user/BLOCK',
    }),
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
.block {
  transition: all 0.2s;
  cursor: pointer;
}
</style>
