<template lang="pug">

  div(
    :class="[$style.side_bar, { [$style.hide]: !visible }]"
  )
    nuxt-link(
      v-for="user in $store.state.chat.users"
      :class="$style.link"
      :key="'chat'+user.login"
      :to="`/chat/${user.login}`"
    )
      CustomImage(
        :class="$style.image"
        :images="user.images"
        rounded
      )
      div(
        :class="$style.name"
      ) {{ `${user.fname} ${user.lname}` }}

</template>

<script>
import CustomImage from '@/components/CustomImage.vue'

export default {
  name: 'ChatSidebar',
  components: {
    CustomImage,
  },
  props: {
    visible: Boolean,
  },
}
</script>

<style module lang="scss">

  @mixin chatSidebarMixin(
    $image-size,
  ) {

    .side_bar {
      right: 0px;
      overflow: scroll;
      position: absolute;
    }

    .link {
      min-height: 60px;
      display: flex;
      background: #fff;
      font-family: 'Lobster', cursive;
      align-items: center;
      text-decoration: none;
      color: $font-color;
    }

    .image {
      width: $image-size;
      height: $image-size;
    }
    
  }


  @media (min-width: map-get($grid-breakpoints, sm)) {
    
    .side_bar {
      transform: translateX(130px);
      height: 100%;
      width: 120px;
    }
    
    .name {
      display: none;
    }

    .link:not(.link:last-child) {
      margin-bottom: 16px;
    }

    @include chatSidebarMixin(
      $image-size: 100px,
    )

  }

  @media (max-width: map-get($grid-breakpoints, sm)) {

    .side_bar {
      top: 50px;
      border-bottom: solid 1px $main-color;
      max-height: 180px;
      width: 100%;
    }

    .hide {
      display: none;
    }

    .link {
      padding: 10px 0;
      &:not(.link:last-child) {
        border-bottom: 1px solid $main-color;
      }
    }

    .name,
    .image {
      margin-left: 20px;
    }

    @include chatSidebarMixin(
      $image-size: 40px,
    )

  }

</style>
