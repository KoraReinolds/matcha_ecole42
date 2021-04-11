<template lang="pug">
  div(
    :class="$style.short_list"
  )
    template(
      v-if="$store.state.history.notifications.length"
    )
      UserShort(
        v-for="({ action, created, who }, index) in $store.state.history.notifications"
        :key="'notif'+index+who.login"
        :user="who"
        :type="action"
        :time="created"
      )
    template(
      v-else
    ) Notifications list is empty
</template>

<script>
import UserShort from '@/components/UserShort.vue';

export default {
  name: 'notif',
  async validate({ route, store }) {
    await store.dispatch('history/GET_NOTIFICATIONS')
    return true
  },
  components: {
    UserShort,
  },
  mounted() {
    this.$store.commit('history/SET_UNREADED_NOTIFICATIONS', 0, { root: true })
  },
}
</script>

<style module lang="scss">

  .short_list {
    margin: 0 auto;
    padding: 50px 20px;
  }

</style>
