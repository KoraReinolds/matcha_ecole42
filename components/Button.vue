<template lang="pug">
  div(
    :class="[$style.btn, { [$style.disabled]: disabled }]"
    @click="!disabled && $emit('click', $event)"
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
    disabled: Boolean,
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
