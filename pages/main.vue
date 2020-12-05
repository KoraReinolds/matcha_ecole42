<template lang="pug">
  div#main(v-if="$auth.user && users")
    div.user-list
      //- div(v-for="user in tools") {{ user }}
      template(v-if="users.length")
        transition-group(tag="p" name="user")
          User(
            v-for="(user, index) in users"
            :key="user.login"
            :user="user"
          )
      template(v-else)
        div.else Search returned no results
      //- Paginator.paginator
    Tools.tools

  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import User from '@/components/User.vue';
import Paginator from '@/components/Paginator.vue';
import Tools from '@/components/Tools.vue';

export default {
  name: 'mainPage',
  components: {
    User,
    Paginator,
    Tools,
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      page: 'users/CUR_PAGE',
      tools: 'users/TOOLS',
      users: 'users/USERS',
    }),
  },
  methods: {
    scroll(e) {
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
        this.getUsers(this.page + 1)
      }
    },
    ...mapMutations({
      setSettings: 'users/SET_INIT_TOOLS',
    }),
    ...mapActions({
      getUsers: 'users/GET_USERS',
    }),
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scroll);
  },
  mounted() {
    window.addEventListener('scroll', this.scroll);
    this.setSettings(this.$auth.user);
    this.getUsers();
  },
};
</script>

<style scoped lang="scss">
#main {
  display: flex;
  @media (min-width: map-get($grid-breakpoints, sm)) {
    padding: 50px 20px;
  }
  @media (max-width: map-get($grid-breakpoints, sm)) {
    flex-direction: column;
  }
.user-list {
    .else {
      @media (min-width: map-get($grid-breakpoints, sm)) {
        width: 800px;
      }
    }
  }
}
</style>
