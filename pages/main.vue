<template lang="pug">
  div(
    v-if="$auth.user && users"
    :class="$style.main"
  )
    div(
      :class="$style.users"
      v-if="users.length"
    )
      User(
        :class="$style.user"
        v-for="(user, index) in users"
        :user="user"
        :key="user.login"
      )
      UserMobile(
        v-if="mobileUser"
        :class="$style.mobile_user"
        :user="mobileUser"
      )
    div(
      v-else
      :class="$style.else"
    ) Search returned no results
    RoundedIcon(
      :class="[$style.toggle_state]"
      :name="show ? 'times' : 'cog'"
      @click="show=!show"
    )
    Tools(
      :show="show"
      :tools="$store.state.users.tools"
    )


  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import User from '@/components/User.vue'
import Tools from '@/components/Tools.vue'
import UserMobile from '@/components/UserMobile.vue'
import RoundedIcon from '@/components/RoundedIcon.vue'


export default {
  name: 'mainPage',
  async validate({ route, store, $auth }) {
    store.commit('users/SET_USERS', [])
    // set initial tools params
    store.commit('users/SET_INIT_TOOLS', $auth.user)
    await store.dispatch('users/GET_USERS')
    return true
  },
  components: {
    User,
    Tools,
    UserMobile,
    RoundedIcon,
  },
  data: () => ({
    // hide tools by default
    show: false,
  }),
  computed: {
    ...mapState({
      users: state => state.users.users,
    }),
    ...mapGetters({
      mobileUser: 'users/MOBILE_USER'
    }),
  },
  methods: {
    scroll(e) {
      if ((window.innerHeight + window.scrollY) + 5 >= document.documentElement.scrollHeight) {
        this.$store.dispatch('users/LOAD_MORE_USERS')
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scroll)
  },
  mounted() {
    window.addEventListener('scroll', this.scroll)
  },
}
</script>

<style module lang="scss">

  @mixin mainMixin(
    $mobile_display: none,
    $desktop_display: flex,
    $padding: 50px 20px,
  ) {
    
    .mobile_user {
      display: $mobile_display;
    }

    .user {
      display: $desktop_display;
      &:not(.user:first-child) {
        margin-top: 50px;
      }
    }

    .users {
      width: 800px;
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

    .toggle_state {
      position: fixed;
      display: $mobile_display;
      top: calc(#{$header-height} + 16px);
      right: 16px;
      color: $main-color;
      z-index: 5;
    }
    
  }

  @media (min-width: map-get($grid-breakpoints, sm)) {
    @include mainMixin();
  }

  @media (max-width: map-get($grid-breakpoints, sm)) {
    @include mainMixin(
      $mobile_display: block,
      $desktop_display: none,
      $padding: 0px,
    );
  }

</style>
