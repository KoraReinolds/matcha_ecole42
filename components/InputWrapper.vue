<template lang="pug">
  div
    slot(name="title")
    slot
    div(
      :class="$style.tooltip_field"
    ) {{ error }}
</template>

<script>
export default {
  name: 'InputWrapper',
  props: {
    title: String,
    error: String,
  },
  data: () => ({
  }),
  computed: {
  },
  methods: {
  },
  mounted() {
  },
};
</script>

<style module lang="scss">

  .tooltip_field {
    color: $error-color !important;
    height: 30px;
  }

</style>