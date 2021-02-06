<template lang="pug">
  div(
    :class="[$style.btn]"
  )
    slot

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Button',
  data: () => ({
  }),
  props: {
  },
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapActions({
    }),
  },
  mounted() {
  },
};
</script>

<style module lang="scss">

@import '@/assets/css/button.scss';

</style>
