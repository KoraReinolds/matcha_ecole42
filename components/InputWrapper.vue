<template lang="pug">
  div
    slot
    //- div.title.left {{ data.title }}
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
    color: $error-color !important;
    height: 30px;
  }

</style>