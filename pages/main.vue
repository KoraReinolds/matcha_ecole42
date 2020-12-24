<template lang="pug">
  div(
    v-if="$auth.user && users"
    :class="$style.main"
  )
    template(v-if="users.length")
      template(v-if="mobile")
        UserMobile(
          v-for="(user, index) in users"
          :key="'mobile-'+user.login"
          :user="user"
        )
      template(v-else)
        transition-group(tag="p" name="user")
          User(
            v-for="(user, index) in users"
            :key="user.login"
            :user="user"
          )
    template(v-else)
      div(
        :class="$style.else"
      ) Search returned no results
    Tools

  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import User from '@/components/User.vue'
import Tools from '@/components/Tools.vue'
import UserMobile from '@/components/UserMobile.vue'

export default {
  name: 'mainPage',
  components: {
    User,
    Tools,
    UserMobile,
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      mobile: 'IS_MOBILE',
      page: 'users/CUR_PAGE',
      tools: 'users/TOOLS',
      users: 'users/USERS',
    }),
  },
  methods: {
    scroll(e) {
      if ((window.innerHeight + window.scrollY) + 5 >= document.documentElement.scrollHeight) {
        if (this.page * 4 === this.users.length) {
          this.setNewPage(this.page + 1)
          this.getUsers()
        }
      }
    },
    ...mapMutations({
      setNewPage: 'users/CHANGE_PAGE',
      setSettings: 'users/SET_INIT_TOOLS',
      setUsers: 'users/SET_USERS',
    }),
    ...mapActions({
      getUsers: 'users/GET_USERS',
      filterUsers: 'users/FILTER_USERS',
    }),
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scroll)
  },
  mounted() {
    window.addEventListener('scroll', this.scroll)
    this.setSettings(this.$auth.user)
    this.filterUsers()
  },
};
</script>

<style module lang="scss">

  .main {
    position: relative;
    display: flex;
    justify-content: space-between;
    @media (min-width: map-get($grid-breakpoints, sm)) {
      padding: 50px 20px;
    }
    
    .else {
      position: absolute;
      padding: 50px 20px;
      @media (min-width: map-get($grid-breakpoints, sm)) {
        padding: 0px;
        position: relative;
        width: 800px;
      }
    }

  }

</style>
