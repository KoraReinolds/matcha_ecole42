<template lang="pug">
  div.app
    div.wrapper
      Header
      nuxt.content
    Footer
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Header,
    Footer,
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
      getLocation: 'auth/GET_LOCATION',
    }),
  },
  mounted() {
    this.getLocation();
  }
}
</script>

<style lang="scss">
.app,
#__layout,
#__nuxt {
  min-height: 100vh;
}
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
.app {
  position: relative;
}
.wrapper {
  position: relative;
  max-width: $wrapper-width;
  width: 100%;
  margin: 0 auto;
  @media (max-width: map-get($grid-breakpoints, sm)) {
    padding-top: $header-height-mobile;
    padding-bottom: $footer-height-mobile;
  }
  padding-top: $header-height;
  padding-bottom: $footer-height;
}
body,
html {
  p {
    margin: 0;
  }
  div {
    text-align: left;
  }
  min-height: 100vh;
  height: 100%;
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  fieldset {
    padding: 0;
    margin: 0;
    legend {
      padding: 0;
    }
  }
  input {
    border: none;
  }
}
h1, h2, h3, h4, h5, h6 {
  margin: 0;
}
</style>

