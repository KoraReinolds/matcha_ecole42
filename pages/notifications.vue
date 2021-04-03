<template lang="pug">
  div(
    :class="$style.short_list"
  )
    template(
      v-if="notifList.length"
    )
      UserShort(
        v-for="({ action, created, who }, index) in notifList"
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
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
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
  computed: {
    ...mapState({
      notifList: state => state.history.notifications,
    }),
    ...mapGetters({
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
    margin: 0 auto;
    padding: 50px 20px;
  }

</style>
