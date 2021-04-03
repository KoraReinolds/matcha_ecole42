<template lang="pug">
  footer(
    v-if="$auth.loggedIn"
  )
    div.wrapper(
      :class="$style.footer_content"
    )
      div.only_laptop Dating website form 21 School
      div.only_mobile(
        :class="$style.mobile_nav"
      )
        nuxt-link(
          :class="$style.link"
          :to="`/user/${$auth.user.login}`"
        )
          font-awesome-icon.icon(
            icon="user"
          )
        nuxt-link(
          :class="$style.link"
          to='/history'
        )
          font-awesome-icon.icon(
            icon="history"
          )
        nuxt-link(
          :class="$style.link"
          to='/main'
        )
          font-awesome-icon.icon(
            icon="search"
          )
        nuxt-link(
          :class="$style.link"
          to='/chat'
        )
          font-awesome-icon.icon(
            icon="comment-alt"
          )
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Footer',
  data: () => ({
  }),
  components: {
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

  @mixin footerMixin(
    $position: relative,
  ) {

    footer {
      // margin-bottom: -20px;
      z-index: 3;
      height: $footer-height;
      position: $position;
      bottom: 0;
      width: 100vw;
      background-color: $main-color;
      display: flex;
      align-items: center;
      .footer_content {
        margin: 0 auto;
        font-family: 'Oswald', sans-serif;
        font-size: 18px;
        color: white;
        width: 100%;
        div {
          text-align: right;
        }
        .mobile_nav {
          width: 100%;
          display: flex;
          justify-content: space-around;
          a {
            color: white;
          }
        }
      }
    }

  }

  @include footerMixin();

  @media (max-width: 600px) {
    @include footerMixin(
      $position: fixed,
    );
  }

</style>
