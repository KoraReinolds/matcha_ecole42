<template lang="pug">
  font-awesome-icon.icon.block(
    :class="[`fa-${size}x`, { block_color: active }]"
    icon="user-slash"
    @click="block(user)"
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
    active: Boolean,
    user: Object,
  },
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapActions({
      block: 'users/BLOCK',
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
