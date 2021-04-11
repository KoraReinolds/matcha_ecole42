<template lang="pug">
  div(
    :class="$style.short_list"
  )
    template(
      v-if="$store.state.history.history.length"
    )
      UserShort(
        v-for="({ action, created, target }, index) in $store.state.history.history"
        :key="'history'+index+target.login"
        :user="target"
        :type="action"
        :time="created"
      )
    template(
      v-else
    ) History list is empty
</template>

<script>
import UserShort from '@/components/UserShort.vue';

export default {
  name: 'History',
  async validate({ route, store }) {
    await store.dispatch('history/GET_HISTORY')
    return true
  },
  components: {
    UserShort,
  },
}
</script>

<style module lang="scss">

  .short_list {
    margin: 0 auto;
    padding: 50px 20px;
  }

</style>
