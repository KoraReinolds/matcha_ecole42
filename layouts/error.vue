<template lang="pug">

  CustomImage(
    :class="$style.image"
    :src="'https://sun9-2.userapi.com/c627224/v627224882/42b51/Qfyhj4sKGYI.jpg'"
  )
      
</template>

<script>
import CustomImage from '@/components/CustomImage.vue';

export default {
  name: 'Page-404',
  components: {
    CustomImage,
  },
};
</script>

<style module lang="scss">

  .image {
    z-index: 10000;
  }

</style>
