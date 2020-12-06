<template lang="pug">
  font-awesome-icon.icon.ban(
    :class="[`fa-${size}x`, { ban_color: true }]"
    icon="ban"
    @click="ban(user.login)"
  )
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Ban',
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
      ban: 'user/BAN',
    }),
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
.ban {
  transition: all 0.2s;
  cursor: pointer;
}
</style>
