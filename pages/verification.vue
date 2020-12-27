<template lang="pug">
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Verification',
  components: {
  },
  data: () => ({
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
    const res = await this.$axios.get(`/registration-check?token=${this.$route.query.token}`)
    if (res.type === 'error') {
      this.$store.dispatch('history/PUSH_POP_WINDOW', {
        type: 'error',
        message: 'Ошибка верификации',
      })
    } else {
      this.$store.dispatch('history/PUSH_POP_WINDOW', {
        type: 'ok',
        message: 'Верификация прошла успешно',
      })
      this.$router.push('/login')
    }
  },
};
</script>

<style module lang="scss">

@import '@/assets/css/form.scss';

</style>
