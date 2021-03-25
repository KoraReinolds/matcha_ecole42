<template lang="pug">
  div(
    v-if="$auth.user && users"
    :class="$style.main"
  )
    div(
      :class="$style.users"
      v-if="users.length"
    )
      UserMobile(
        :class="$style.mobile_users"
        v-for="(user, index) in users"
        :key="'mobile-'+user.login"
        :user="user"
      )
      User(
        v-for="(user, index) in users"
        :user="user"
        :key="user.login"
      )
    div(
      v-else
      :class="$style.else"
    ) Search returned no results
    div(
      :class="$style.sidebar"
    )
      Tools

  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import User from '@/components/User.vue'
import Tools from '@/components/Tools.vue'
import UserMobile from '@/components/UserMobile.vue'

export default {
  name: 'mainPage',
  async validate({ route, store, $auth }) {
    // set initial tools params
    store.commit('users/SET_INIT_TOOLS', $auth.user)
    await store.dispatch('users/GET_USERS')
    return true
  },
  components: {
    User,
    Tools,
    UserMobile,
  },
  data: () => ({
  }),
  computed: {
    ...mapState({
    }),
    ...mapGetters({
      users: 'users/USERS',
    }),
  },
  methods: {
    scroll(e) {
      if ((window.innerHeight + window.scrollY) + 5 >= document.documentElement.scrollHeight) {
        this.loadMoreUsers()
      }
    },
    ...mapMutations({
    }),
    ...mapActions({
      loadMoreUsers: 'users/LOAD_MORE_USERS',
    }),
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scroll)
  },
  mounted() {
    window.addEventListener('scroll', this.scroll)
  },
};
</script>

<style module lang="scss">

  @mixin mainMixin(
    $mobile: false,
    $mobile_display: none,
    $desktop_display: block,
    $padding: 50px 20px,
    $sidebar_width: 260px,
  ) {
    
    @if $mobile {
      $mobile_display: block;
      $desktop_display: none;
      $sidebar_width: 100%;
    }

    .mobile_users {
      display: $mobile_display;
    }

    .sidebar {
      width: $sidebar_width;
      height: 100%;
    }

    .users {
      width: 800px;
      display: $desktop_display;
    }
  
    .main {
      position: relative;
      display: flex;
      justify-content: space-between;
      padding: $padding;
    }

    .else {
      padding: 50px 20px;
    }
    
  }

  @include mainMixin();

  @media (max-width: map-get($grid-breakpoints, sm)) {
    @include mainMixin(
      $mobile: true,
      $padding: 0px,
    );
  }


</style>
