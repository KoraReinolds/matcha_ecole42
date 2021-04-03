<template lang="pug">
  div(
    :class="$style.short_list"
  )
    template(
      v-if="historyList.length"
    )
      UserShort(
        v-for="({ action, created, target }, index) in historyList"
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
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import UserShort from '@/components/UserShort.vue';

export default {
  name: 'history',
  async validate({ route, store }) {
    await store.dispatch('history/GET_HISTORY')
    return true
  },
  components: {
    UserShort,
  },
  computed: {
    ...mapState({
      historyList: state => state.history.history,
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
  },
};
</script>
<style module lang="scss">

  .short_list {
    margin: 0 auto;
    padding: 50px 20px;
  }

</style>
