<template lang="pug">

  header(
    :class="{ [$style.fill]: !$auth.loggedIn }"
  )
    div.wrapper(
      :class="$style.nav"
      v-if="$auth.loggedIn"
    )
      template(
        v-if="$auth.user.isFilled"
      )
        nuxt-link(
          :class="['only_laptop', $style.link]"
          :to="`/user/${$auth.user.login}`"
        ) My page
        nuxt-link(
          :class="['only_laptop', $style.link]"
          to=`/main`
        ) Search
        nuxt-link(
          :class="['only_laptop', $style.link]"
          to=`/history`
        ) History
        nuxt-link(
          :class="['only_laptop', $style.link]"
          to=`/chat`
        ) Chat

        div(
          :class="$style.filler"
        )

        nuxt-link(
          :class="$style.link"
          v-if="$auth.user.isFilled"
          to=`/notifications`
        )
          font-awesome-icon-layers
            font-awesome-icon.icon(
              icon="bell"
            )
            span.fa-layers-counter.fa-3x(
              :class="$style.counter"
              v-if="notificationCount"
            ) {{ notificationCount }}

      div(
        v-if="!$auth.user.isFilled"
        :class="$style.filler"
      )
      
      nuxt-link(
        :class="$style.link"
        to=`/settings`
      )
        font-awesome-icon.icon(
          icon="cogs"
        )
      a(
        :class="$style.link"
        @click="logout"
      )
        font-awesome-icon.icon(
          icon="sign-out-alt"
        )

</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'header-component',
  data: () => ({
  }),
  components: {
  },
  computed: {
    ...mapGetters({
      notificationCount: 'history/NOTIFICATION_COUNT',
    }),
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
      logout: 'forms/LOGOUT',
    }),
  },
  mounted() {
  },
};
</script>

<style module lang="scss">

  header {
    top: 0;
    position: fixed;
    height: $header-height;
    line-height: $header-height;
    width: 100%;
    z-index: 1000;
    transition: height 0.5s;
    background-color: $main-color;
    .nav {
      background-color: $main-color;
      padding: 0 20px;
      font-family: 'Do Hyeon', sans-serif;
      display: flex;
      justify-content: space-between;

      .link {
        cursor: pointer;
        font-weight: bold;
        text-decoration: none;
        color: white;
        margin-right: 20px;

        &:last-child {
          margin: 0;
        }

      }
      .filler {
        flex-grow: 1;
      }
      .counter {
        right: 19px;
        top: -3px;
      }
    }
    &.fill {
      z-index: 1000;
      height: 100%;
    }
  }

</style>
