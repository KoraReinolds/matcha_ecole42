<template lang="pug">
  div#main(v-if="user && users")
    div.user-list
      template(v-if="users.length")
        transition-group(tag="p" name="user")
          User(
            v-for="(user, index) in users"
            :key="user.login"
            :user="{...user, index: index}"
          )
      template(v-else)
        div.else Search returned no results
      Paginator.paginator
    //- Tools.tools

  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import User from '@/components/User.vue';
import Paginator from '@/components/Paginator.vue';

export default {
  name: 'mainPage',
  components: {
    User,
    Paginator,
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      users: 'users/USERS',
      user: 'auth/GET_USER'
    }),
  },
  methods: {
    ...mapMutations({
      }),
    ...mapActions({
      getUsers: 'users/GET_USERS',
    }),
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style scoped lang="scss">
#main {
  padding: 50px 20px;
  display: flex;
  .user-list {
    
  }
}
</style>
