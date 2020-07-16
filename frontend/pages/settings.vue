<template lang="pug">
  h2 Settings {{user}}
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Settings',
  components: {
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      token: 'auth/TOKEN',
      user: 'user/USER',
    }),
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
      getUser: 'user/GET_USER'
    }),
  },
  mounted() {
    this.getUser(this.token);
  },
};
</script>

<style scoped lang="scss">
</style>
