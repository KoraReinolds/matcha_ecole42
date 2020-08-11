<template lang="pug">
  nuxt-link.link(
    :to="{ path: `/chat/${user.login}` }"
  )
    div.btn(
      @click="chatWIthUser(user.login)"
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
      chatWIthUser: 'chat/SET_CUR_CHAT_USER_ID',
    }),
    ...mapActions({
    }),
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
a .btn {
  text-align: center !important;
  width: 100%;
}
</style>
