<template lang="pug">
  div.app
    div.wrapper
      Header
      nuxt.content
      PopWindow
    Footer
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
      pushNotification: 'history/PUSH_NOTIFICATION',
      pushMessage: 'chat/PUSH_MESSAGE',
      setAllNotifAsChecked: 'history/SET_ALL_NOTIF_AS_CHECKED',
      rechangeCount: 'users/CHANGE_COUNT_PER_PAGE',
    }),
    ...mapActions({
      getLocation: 'forms/GET_LOCATION',
      pushPopWindow: 'history/PUSH_POP_WINDOW',
    }),
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('resize', this.rechangeCount);
  },
  mounted() {
    this.resize();
    this.rechangeCount();
    window.addEventListener('resize', this.resize);
    window.addEventListener('resize', this.rechangeCount);
    this.getLocation();

    // let socket = new WebSocket(
    //   "ws://192.168.29.71:4567/chat?token=access_token",
    // );
    // socket.onopen = function(e) {
    //   console.log("[open] Соединение установлено");
    //   console.log("Отправляем данные на сервер");
    //   socket.send("Меня зовут Джон");
    // };

    // socket.onmessage = function(event) {
    //   alert(`[message] Данные получены с сервера: ${event.data}`);
    // };

    // socket.onclose = function(event) {
    //   if (event.wasClean) {
    //     console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
    //   } else {
    //     // например, сервер убил процесс или сеть недоступна
    //     // обычно в этом случае event.code 1006
    //     console.log('[close] Соединение прервано');
    //   }
    // };

    // socket.onerror = function(error) {
    //   alert(`[error] ${error.message}`);
    // };
    // console.log(socket)
    // // let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");
    // console.log("socket ", socket)
    if (this.$auth.loggedIn) {
    //   this.socket = this.$nuxtSocket({});
    //   this.socket
    //     .on(this.$auth.user.login, (notif, cb) => {
    //       if (notif.action === 'messages') {
    //         if (notif.who.login === this.$route.params.id) {
    //           this.pushMessage(notif);
    //         }
    //       }
    //       this.pushPopWindow(notif);
    //       this.pushNotification(notif);
    //       if (this.$router.currentRoute.name === 'notifications') {
    //         this.setAllNotifAsChecked();
    //       }
    //     })
    //   conosle.log(this.socket)
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

