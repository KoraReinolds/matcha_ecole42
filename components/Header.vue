<template lang="pug">
  header(
    :class="{ fill: !token }"
  )
    div.nav(
      v-if="token"
    )
      div.only_laptop(
        v-if="informationFilled"
      )
        nuxt-link.link(
          :to="`/user/${user.login}`"
        ) My page
        nuxt-link.link(
          to=`/main`
        ) Search
        nuxt-link.link(
          to=`/history`
        ) History
        nuxt-link.link(
          to=`/chat`
        ) Chat
      
      div.right-panel
        nuxt-link.link(
          v-if="informationFilled"
          to=`/notifications`
        )
          font-awesome-icon-layers
            font-awesome-icon.icon(
              icon="bell"
            )
            span.fa-layers-counter.counter.fa-3x(
              v-if="notificationCount"
            ) {{ notificationCount }}
        nuxt-link.link(
          to=`/settings`
        )
          font-awesome-icon.icon(
            icon="cogs"
          )
        a.link(
          @click="logout"
        )
          font-awesome-icon.icon(
            icon="sign-out-alt"
          )
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'header-component',
  data: () => ({
  }),
  components: {
  },
  computed: {
    ...mapGetters({
      token: 'auth/TOKEN',
      user: 'auth/GET_USER',
      informationFilled: 'auth/INFO_FILLED',
      notificationCount: 'history/NOTIFICATION_COUNT',
    }),
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
      logout: 'auth/LOGOUT',
    }),
  },
  mounted() {
  },
};
</script>

<style lang="scss">
header {
  top: 0;
  left: 0;
  position: fixed;
  @media (max-width: map-get($grid-breakpoints, sm)) {
    height: $header-height-mobile;
    line-height: $header-height-mobile;
  }
  height: $header-height;
  line-height: $header-height;
  width: 100%;
  background-color: $main-color;
  z-index: 4;
  transition: height 0.5s;
  box-shadow: inset 0 -5px 20px $main-color-shadow;
  .nav {
    display: flex;
    align-items: center;
    font-family: 'Do Hyeon', sans-serif;
    max-width: $wrapper-width;
    margin: 0 auto;
    padding: 0 $padding_content;
    .right-panel {
      margin-left: auto;
    }
    .link {
      font-weight: bold;
      text-decoration: none;
      color: white;
      height: inherit;
      line-height: inherit;
      text-align: center;
      position: relative;
      margin-right: 20px;
      &:last-child {
        margin: 0;
      }
    }
    .counter {
      right: 19px;
      top: -10px;
    }
  }
  &.fill {
    z-index: -1;
    height: 100%;
  }
}

</style>
