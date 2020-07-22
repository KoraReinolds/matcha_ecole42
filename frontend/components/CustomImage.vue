<template lang="pug">
  img(
    @click="$emit('click', $event)"
    @error="error = true"
    :style="computedStyles"
    :src="error ? 'https://sun9-2.userapi.com/c627224/v627224882/42b51/Qfyhj4sKGYI.jpg' : src"
  )
</template>

<script>

export default {
  name: 'CustomImage',
  props: {
    src: String,
    width: Number,
    height: Number,
    rounded: Boolean,
  },
  data: () => ({
    error: false,
  }),
  computed: {
    computedStyles() {
      return {
        width: this.width ? this.width : '100%',
        height: this.height ? this.height : '100%',
        borderRadius: this.rounded || this.rounded === '' ? '50%' : '',
      }
    }
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
img {
  object-fit: cover;
}
</style>
