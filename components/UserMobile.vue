<template lang="pug">

  div(
    :class="$style.user_mobile"
  )
    div(
      :class="$style.image"
    )
      div(
        :class="$style.gradient"
      )
      CustomImage(
        :class="$style.custom_image"
        :images="user.images"
      )
      NameLink(
        :class="$style.name"
        :user="user"
        color="white"
      ) {{ `,  ${user.age} y.o.` }}
    div(
      :class="$style.panel"
    ) 
      Icon(
        :class="$style.main_color"
        name="chevron-circle-left"
        :size="10"
        @click="changeMobileUser(-1)"
      )
      Like(
        :class="[$style.like, { [$style.active]: user.likedFrom }]"
        :user="user"
      )
      Icon(
        :class="$style.main_color"
        name="chevron-circle-right"
        :size="10"
        @click="changeMobileUser(1)"
      )

</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import Icon from '@/components/Icon.vue'
import CustomImage from '@/components/CustomImage.vue'
import NameLink from '@/components/NameLink.vue'
import Like from '@/components/Like.vue'

export default {
  name: 'UserMobile',
  components: {
    Icon,
    CustomImage,
    NameLink,
    Like,
  },
  props: {
    user: Object,
  },
  computed: {
    ...mapState({
    }),
    ...mapGetters({
    }),
  },
  methods: {
    // paginate(e) {
      // if (e.clientX > window.innerWidth * 0.8) {
      //   this.changeMobileUser(this.mobilePage + 1)
      // } else if (e.clientX < window.innerWidth * 0.2) {
      //   this.changeMobileUser(this.mobilePage - 1)
      // }
    // },
    ...mapMutations({
      }),
    ...mapActions({
      changeMobileUser: 'users/CHANGE_MOBILE_USER',
    }),
  },
  mounted() {
  }
};
</script>

<style module lang="scss">

  @import '@/assets/css/map-colors.scss';

  @mixin userMobMixin(
    $panel-height: 50px,
  ) {

    .name {
      display: block;
      position: relative;
      top: -70px;
      padding: 20px;
      width: 100%;
    }

    .user_mobile {
      height: calc(100vh - #{$footer-height} - #{$header-height});
      padding: 11px;
    }
  
    .image {
      position: relative;
      height: calc(100% - #{$panel-height});
    }
  
    .panel {
      padding-top: 11px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: $panel-height;
    }

    .like {
      z-index: 4;
      border-radius: 50%;
      border: 2px solid lightgray;
      transform: scale(1.3) translateY(-10px);
      &.active {
        border-color: $main-color;
      }
    }
  
    .gradient {
      border-radius: 5px 24px 5px 5px;
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(rgba(1,1,1,0) 60%, #2c2c2c 100%);

    }

    .custom_image {
      border-radius: 5px 24px 5px 5px;
      width: 100%;
      height: 100%;
    }

  }

  @include userMobMixin();

  @media (max-width: map-get($grid-breakpoints, sm)) {
    @include userMobMixin(
    );
  }


</style>
