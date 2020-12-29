<template lang="pug">
  div.app
    Header
    main
      nuxt.wrapper
    Footer
    PopWindow
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import PopWindow from '@/components/PopWindow.vue';

export default {
  middleware: ['customAuth'],
  components: {
    Header,
    Footer,
    PopWindow,
  },
  computed: {
    ...mapGetters({
      login: 'forms/LOGIN',
    }),
  },
  methods: {
    ...mapMutations({
      resize: 'RESIZE',
      pushMessage: 'chat/PUSH_MESSAGE',
      setAllNotifAsChecked: 'history/SET_ALL_NOTIF_AS_CHECKED',
    }),
    ...mapActions({
      getLocation: 'forms/GET_LOCATION',
      getUnreadedNotifications: 'history/GET_UNREADED_NOTIFICATIONS',
      innitSocketConection: 'forms/INIT_SOCKETS',
    }),
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  mounted() {
    console.log = function() {}
    this.resize()
    window.addEventListener('resize', this.resize)
    this.getLocation()

    if (this.$auth.getToken('local')) {
      this.innitSocketConection()
    }

    if (this.$auth.loggedIn && this.$store.state.auth.user.isFilled) {
      this.getUnreadedNotifications()
    }
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

  .wrapper {
    max-width: $wrapper-width;
    width: 100%;
    margin: 0 auto;
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

  .app {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  main {
    padding-top: $header-height;
    flex-grow: 1;
    display: flex;
    @media (max-width: 600px) {
      margin-bottom: $footer-height;
    }
  }

</style>

