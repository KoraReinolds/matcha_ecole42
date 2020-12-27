<template lang="pug">
  div(
    :class="$style.short_list"
  )
    template(
      v-if="historyList.length"
    )
      UserShort(
        v-for="({ time, ...target }, index) in historyList"
        :key="'history'+index+target.login"
        :user="target"
        :time="time"
      )
    template(
      v-else
    ) History list is empty
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import UserShort from '@/components/UserShort.vue';

export default {
  name: 'history',
  async validate({ route, store }) {
    let res = await store.dispatch('history/GET_HISTORY')
    return true
  },
  components: {
    UserShort,
  },
  computed: {
    ...mapGetters({
      historyList: 'history/HISTORY',
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
    padding: 50px 10px;
  }

</style>
