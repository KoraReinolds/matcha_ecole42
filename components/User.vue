<template lang="pug">
  div(
    :class="$style.user"
  )
    div(
      :class="[$style.main, $style[`${user.gender}_background-light`]]"
    )
      div(
        :class="$style.image"
      )
        CustomImage(
          :class="$style.custom_image"
          :src="user ? user.images.filter(img => img.avatar)[0].src : ''"
        )
        RoundedIcon(
          v-if="user.likedFrom !== undefined"
          :class="[$style.like_icon, $style.inactive_color]"
          :innerScale="0.6"
          name="like"
          :size="14"
        )
      div(
        :class="$style.content"
      )
        span(
          :class="$style.fio"
        )
          NameLink(
            :class="$style.age"
            :user="user"
          )
          span(
            :class="$style.age"
          ) {{ `${user.age} y.o.` }}
        div(
          :class="$style.biography"
        )
          div(
            :class="$style.text"
          ) {{ `${user.biography}` }}
        div(v-if="user.tagsCount !== undefined") Match tags: {{ user.tagsCount || '0' }}
        div(
          :class="$style.tags"
        )
          Tag(
            v-for="tag in user.tags"
            :class="[`${user.gender}_background`]"
            :key="`user_tag_${tag}`"
            :name="tag"
          )

    div(
      :class="$style.sidebar"
    )
      Raiting(
        :class="$style.section"
        :value="user.rating"
      )
      Distance(
        :class="$style.section"
        :value="user.distance"
      )
      //- span(
      //-   :class="[$style.section, $style.preferences]"
      //- )
      //-   Icon(
      //-     v-for="icon in user.preference"
      //-     :class="$style[`${icon}_color`]"
      //-     :name="icon"
      //-     :size="10"
      //-   )

</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import RoundedIcon from '@/components/RoundedIcon.vue'
import Icon from '@/components/Icon.vue'
import CustomImage from '@/components/CustomImage.vue'
import Distance from '@/components/Distance.vue'
import NameLink from '@/components/NameLink.vue'
import Raiting from '@/components/Raiting.vue'
import Tag from '@/components/Tag.vue'
import Like from '@/components/Like.vue'

export default {
  name: 'user',
  components: {
    RoundedIcon,
    CustomImage,
    Distance,
    NameLink,
    Raiting,
    Tag,
    Like,
    Icon,
  },
  props: {
    user: Object,
  },
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    // gender: index => ['male', 'female', 'bisexual'][index - 1],
    ...mapMutations({
      }),
    ...mapActions({
      like: 'users/LIKE',
    }),
  },
  mounted() {
  }
};
</script>

<style module lang="scss">

@import '@/assets/css/map-colors.scss';

.user {
  display: flex;
  align-items: center;
  height: 300px;
  width: 800px;
  &:not(:nth-child(1)) {
    margin-top: 50px;
  }

  .sidebar {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .section {
      padding: 20px;
      display: flex;
    }
  }

  .main {
    display: flex;
    align-items: center;
    width: 600px;
    height: 100%;
    border-radius: 20px;

    .image {
      padding: 20px;
      position: relative;
      height: 300px;
      max-width: 300px;
      min-width: 300px;
      .custom_image {
        border-radius: 20px;
      }
      .gender {
        position: absolute;
        top: 30px;
        left: 30px;
      }
      .like_icon {
        position: absolute;
        bottom: 30px;
        right: 30px;
        z-index: 100;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 300px;
      .fio {
        font-family: 'Lobster', cursive;
      }
      .biography {
        padding: 15px;
        .text {
          text-align: center;
          font-family: 'Rubik', sans-serif;
          line-height: 15px;
          font-size: 12px;
          max-height: 90px;
          overflow: hidden;
        }
      }
      .tags {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        max-width: 300px;
      }
    }
  }
}

</style>
