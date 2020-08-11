<template lang="pug">
  font-awesome-icon.icon.ban(
    :class="[`fa-${size}x`, { banColor: active }]"
    icon="ban"
    @click="ban(user)"
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
    user: Object,
  },
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapActions({
      ban: 'users/BAN',
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
