<template lang="pug">
  div#fill(
    :class="{ fill: !$auth.loggedIn }"
  )
    div(v-for="msg in status") {{ msg }}

</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import fakeBD from '../../test/api';

export default {
  name: 'Fill',
  components: {
  },
  data: () => ({
    status: [],
  }),
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
    }),
  },
  async mounted() {
    const id = this.$route.params.id
    const num = Number.isInteger(+id) ? +id : 10
    fakeBD.setCount(num)
    await fakeBD.clearDB()
    this.status.push("DB clear")
    await fakeBD.registerAll()
    this.status.push("users registred")
    this.status.push("users login")
    this.status.push("users update")
    this.status.push("'User_0: Пользователь поставил лайк User_1'")
    await fakeBD.likeUser('User_1', 'User_0', 1)
    this.status.push("'User_1: Пользователь поставил лайк User_0'")
    await fakeBD.likeUser('User_2', 'User_1', 1)
    this.status.push("'User_2: Пользователь поставил лайк User_1'")
    await fakeBD.likeUser('User_1', 'User_2', 1)
    this.status.push("'User_1: Пользователь поставил лайк User_2'")

  },
};
</script>

<style scoped lang="scss">

#fill {
  z-index: 10000;
  position: relative;
  &.fill {
    color: white;
  }
}

</style>
