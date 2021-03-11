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
    padding-top: 5px;
    color: $error-color;
    height: 30px;
    margin-bottom: 10px;
  }

</style>