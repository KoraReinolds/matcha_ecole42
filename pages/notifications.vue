<template lang="pug">
  div(
    :class="$style.short_list"
  )
    template(
      v-if="notifList.length"
    )
      UserShort(
        v-for="({ time, ...who }, index) in notifList"
        :key="'notif'+index+who.login"
        :user="who"
        :time="time"
      )
    template(
      v-else
    ) Notifications list is empty
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import UserShort from '@/components/UserShort.vue';

export default {
  name: 'notif',
  async validate({ route, store }) {
    let res = await store.dispatch('history/GET_NOTIFICATIONS')
    return true
  },
  components: {
    UserShort,
  },
  computed: {
    ...mapGetters({
      notifList: 'history/NOTIFICATIONS',
    }),
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
    }),
  },
  mounted() {
    this.$store.commit('history/SET_UNREADED_NOTIFICATIONS', 0, { root: true })
  },
};
</script>
<style module lang="scss">

  .short_list {
    padding: 50px 10px;
  }

</style>
