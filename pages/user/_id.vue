<template lang="pug">
  div(
    :class="[$style.user_page]"
  )
    template(
      v-if="user.images.length"
    )
      CustomImage(
        :class="$style.main_image"
        :images="user.images"
      )
      div(
        :class="$style.tools"
      )
        Like(
          :class="$style.icon"
          :user="user"
        )
        RoundedIcon(
          v-if="user.likedFrom && user.likedTo"
          :class="$style.icon"
          name="comment-dots"
          :size="15"
          :innerScale="0.6"
          @click="() => $router.push(`/chat/${user.login}`)"
        )
      
    div(
      :class="$style.info"
    )
      div( :class="$style.field" )
        NameLink(
          :user="user"
        ) {{ `, ${user.age}` }} y.o.
          Raiting(
            :class="$style.rate"
            :value="user ? user.rating : undefined"
            :size="6"
          )

      div( :class="[$style.title]" ) Gender
      div( :class="[$style.field]" ) {{ user.gender }}

      div( :class="[$style.title]" ) Preferences
      div( :class="[$style.field]" )
        span {{ user.preference.join(', ') }}

      div( :class="[$style.title]" ) Biography
      div( :class="[$style.field]" ) {{ user ? user.biography : '...' }}

      div( :class="[$style.title]" ) Tags
      div( :class="[$style.field]" )
        Tag(
          v-for="tag in user.tags"
          :key="`user_tag_${tag}`"
          :name="tag"
        )

      div( :class="[$style.title]" ) Images
      div(
        :class="[$style.field, $style.images]"
      )
        CustomImage(
          :class="$style.mini_image"
          v-for="img in user.images"
          :src="img.src"
          :key="'img'+img.index"
        )

</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import CustomImage from '@/components/CustomImage.vue'
import Like from '@/components/Like.vue'
import Raiting from '@/components/Raiting.vue'
import NameLink from '@/components/NameLink.vue'
import RoundedIcon from '@/components/RoundedIcon.vue'
import Tag from '@/components/Tag.vue'

export default {
  name: 'UserPage',
  async validate({ route, store, redirect }) {
    let res = await store.dispatch('user/GET_USER', route.params.id)
    return res.type === "ok" ? true : redirect('/404')
  },
  components: {
    CustomImage,
    Like,
    Raiting,
    NameLink,
    RoundedIcon,
    Tag,
  },
  data: () => ({
  }),
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
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

@import '@/assets/css/title.scss';


@mixin userMixin(
  $padding,
  $height,
) {
  
  .user_page {
    max-width: 800px;
    padding: $padding;
  }

  .tools {
  position: absolute;
    bottom: 0;
    right: 0;
    padding: 10px 0;
  }

  .icon {
    margin-right: 10px;
  }

  .main_image {
    height: $height;
    position: relative;
    width: 100%;
    margin-bottom: 20px;
  }

  .info {
    padding-bottom: calc(#{$footer-height} + 20px);
    max-width: 600px;
  }

  .title {
    @include titleMixin(
      $base-color: $main-color,
    )
  }

  .field {
    padding: 10px 5%;
  }

  .rate {
    margin-left: 10px;
  }

  .images {
    display: flex;
  }

  .mini_image {
    height: 100px;
    width: 100px;
    margin-right: 10px;
  }

}

@include userMixin(
  $padding: 50px 10px,
  $height: 400px,
);

@media (max-width: map-get($grid-breakpoints, sm)) {
  @include userMixin(
    $padding: 0,
    $height: calc(100vh - #{$header-height} - #{$footer-height}),
  );
}

</style>
