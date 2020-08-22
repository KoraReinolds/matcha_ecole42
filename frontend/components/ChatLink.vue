<template lang="pug">
  div.btn
    nuxt-link.link(
      :to="{ path: `/chat/${user.login}` }"
    ) Join to chat
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';

export default {
  name: 'ChatLink',
  data: () => ({
    closeButton: null,
  }),
  props: {
    user: Object,
  },
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
    }),
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
.btn {
  a {
    color: white;
    text-decoration: none;
  }
}
</style>
