<template lang="pug">

  header(
    :class="{ [$style.fill]: !$auth.loggedIn }"
  )
    div(
      :class="['wrapper', $style.nav]"
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

      div(
        v-if="$store.getters['history/NOTIFICATION_COUNT']"
        :class="$style.counter"
      )
        div(
          :class="$style.digit"
        ) {{ $store.getters['history/NOTIFICATION_COUNT'] }}

      Icon(
        v-if="$auth.user.isFilled"
        :class="$style.link"
        @click="$router.push('/notifications')"
        name="bell"
        :size="5"
      )


      Icon(
        :class="$style.link"
        @click="$router.push('/settings')"
        name="cogs"
        :size="5"
      )
      Icon(
        :class="$style.link"
        @click="$store.dispatch('forms/LOGOUT')"
        name="sign-out-alt"
        :size="5"
      )

</template>

<script>
import Icon from '@/components/Icon.vue'

export default {
  name: 'HeaderComponent',
  components: {
    Icon,
  },
}
</script>

<style module lang="scss">

  header {
    top: 0;
    position: fixed;
    height: $header-height;
    line-height: $header-height;
    width: 100%;
    z-index: $header-z;
    transition: height 0.5s;
    background-color: $main-color;
  }

  .nav {
    background-color: $main-color;
    padding: 0 $laptop-page-padding;
    font-family: 'Do Hyeon', sans-serif;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  .link {
    margin-right: 20px;
    &:last-child { margin: 0; }
    color: white;
    font-weight: bold;
    text-decoration: none;
  }

  .filler {
    flex-grow: 1;
  }

  .counter {
    position: relative;
    background-color: $notification-color;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    
  }

  .digit {
    transform: scale(0.8);
    color: white;
    font-weight: bold;
  }

  .fill {
    z-index: $header_filled-z;
    height: 100%;
  }

</style>
