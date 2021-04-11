<template lang="pug">
  img(
    :class="[$style.img, { [$style.rounded]: rounded }]"
    @click="$emit('click', $event)"
    @error="error = 'https://sun9-2.userapi.com/c627224/v627224882/42b51/Qfyhj4sKGYI.jpg'"
    :src="error || src || (images ? images.filter(img => img.avatar)[0].src : error)"
  )
</template>

<script>

export default {
  name: 'CustomImage',
  props: {
    src: String,
    images: Array,
    rounded: Boolean,
  },
  data: () => ({
    error: false,
  }),
}
</script>

<style module lang="scss">

  .img {
    display: block;
    object-fit: cover;
  }

  .rounded {
    border-radius: 50%;;
  }

</style>
