<template lang="pug">

  CustomImage(
    :width="'100%'"
    :height="'100%'"
    :src="'https://sun9-2.userapi.com/c627224/v627224882/42b51/Qfyhj4sKGYI.jpg'"
  )
      
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import CustomImage from '@/components/CustomImage.vue';

export default {
  name: 'Page-404',
  components: {
    CustomImage,
  },
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
  mounted() {
  },
};
</script>

<style module lang="scss">


</style>
