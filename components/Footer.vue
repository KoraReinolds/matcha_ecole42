<template lang="pug">
  footer(
    v-if="$auth.loggedIn"
  )
    div(
      :class="['wrapper', 'only_laptop', $style.footer_content]"
    ) Dating website form 21 School
    div(
      :class="['wrapper', 'only_mobile', $style.mobile_nav]"
    )
      Icon(
        class="only_mobile"
        @click="$router.push(`/user/${$auth.user.login}`)"
        name="user"
        :size="5"
      )
      Icon(
        class="only_mobile"
        @click="$router.push('/history')"
        name="history"
        :size="5"
      )
      Icon(
        class="only_mobile"
        @click="$router.push('/main')"
        name="search"
        :size="5"
      )
      Icon(
        class="only_mobile"
        @click="$router.push('/chat')"
        name="comment-alt"
        :size="5"
      )

</template>

<script>
import Icon from '@/components/Icon.vue'

export default {
  name: 'Footer',
  components: {
    Icon,
  },
}
</script>

<style module lang="scss">

  @mixin footerMixin(
    $position: relative,
  ) {

    footer {
      z-index: $footer-z;
      height: $footer-height;
      position: $position;
      bottom: 0;
      width: 100vw;
      background-color: $main-color;
      display: flex;
      align-items: center;
    }

    .footer_content {
      padding: 0 $laptop-page-padding;
      font-size: 18px;
      color: white;
      width: 100%;
    }

    .mobile_nav {
      display: flex;
      justify-content: space-around;

      svg {
        color: white;
      }

    }
    
  }

  @media (min-width: map-get($grid-breakpoints, sm)) {
    @include footerMixin()
  }

  @media (max-width: map-get($grid-breakpoints, sm)) {
    @include footerMixin(
      $position: fixed,
    )
  }

</style>
