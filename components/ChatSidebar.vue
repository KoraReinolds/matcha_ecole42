<template lang="pug">

  div(
    v-if="show"
    :class="$style.side_bar"
  )
    nuxt-link(
      v-for="user in chatList"
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
import { mapState, mapGetters, mapActions } from 'vuex'
import CustomImage from '@/components/CustomImage.vue'

export default {
  name: 'ChatSidebar',
  components: {
    CustomImage,
  },
  data: () => ({
    show: true,
  }),
  props: {
  },
  computed: {
    ...mapState({
      chatList: state => state.chat.users,
    }),
    ...mapGetters({
    }),
  },
  methods: {
    ...mapActions({
    }),
  },
  mounted() {
  },
};
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
    );

  }

  @media (max-width: map-get($grid-breakpoints, sm)) {

    .side_bar {
      top: 50px;
      border-bottom: solid 1px $main-color;
      max-height: 180px;
      width: 100%;
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
    );

  }

</style>
