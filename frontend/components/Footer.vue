<template lang="pug">
  footer(
    v-if="token"
  )
    div.footer_content
      div.only_laptop Made by mskiles (s.shurn94@gmail.com)
      div.only_mobile
        nuxt-link.link(
          :to="`/user/${user.login}`"
        )
          font-awesome-icon.icon(
            icon="user"
          )
        nuxt-link.link(
          to='history'
        )
          font-awesome-icon.icon(
            icon="history"
          )
        nuxt-link.link(
          to='main'
        )
          font-awesome-icon.icon(
            icon="search"
          )
        nuxt-link.link(
          to='chat'
        )
          font-awesome-icon.icon(
            icon="comment-alt"
          )
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'footer-component',
  data: () => ({
  }),
  components: {
  },
  computed: {
    ...mapGetters({
      token: 'auth/TOKEN',
      user: 'auth/GET_USER',
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

<style lang="scss">
footer {
  left: 0;
  z-index: 3;
  position: absolute;
  bottom: 0;
  margin-top: -$footer-height;
  height: $footer-height;
  @media (max-width: map-get($grid-breakpoints, sm)) {
    position: fixed;
    margin-top: -$footer-height-mobile;
    height: $footer-height-mobile;
    .footer_content {
      justify-content: space-around;
    }
  }
  width: 100vw;
  background-color: $main-color;
  .footer_content {
    // position: absolute;
    font-family: 'Oswald', sans-serif;
    font-size: 18px;
    text-align: right;
    color: white;
    margin: 0 auto;
    padding: 0 $padding-content;
    height: 100%;
    max-width: 100%;
    width: $wrapper-width;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .only_mobile {
      width: 100%;
      display: flex;
      justify-content: space-around;
      .icon {
        color: white;
      }
    }
  }
}

</style>
