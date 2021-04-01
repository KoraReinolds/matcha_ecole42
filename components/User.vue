<template lang="pug">
  div
    div(
      :class="[$style.main, $style[`${user.gender}_background-light`]]"
    )
      div(
        :class="$style.image"
      )
        CustomImage(
          :class="$style.custom_image"
          :images="user.images"
        )
        Like(
          :class="[$style.like_icon]"
          :user="user"
        )
      div(
        :class="$style.content"
      )
        NameLink(
          :user="user"
        ) {{ `${user.age} y.o.` }}
        div(
          :class="$style.biography"
        ) {{ `${user.biography}` }}
        div(
          :class="$style.tags"
        )
          Tag(
            v-for="tag in user.tags"
            :class="[$style[`${user.gender}_background`]]"
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
        :value="user.dist"
      )
      span(
        :class="[$style.section, $style.preferences]"
      )
        Icon(
          v-for="icon in user.preference"
          :class="$style[`${icon}_color`]"
          :name="icon"
          :size="10"
        )

</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
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
    ...mapMutations({
      }),
    ...mapActions({
    }),
  },
  mounted() {
  }
};
</script>

<style module lang="scss">

@import '@/assets/css/map-colors.scss';

  .main {
    display: flex;
    align-items: center;
    border-radius: 20px;
  }

  .image {
    padding: 20px;
    position: relative;
    height: 300px;
    width: 300px;
  }

  .custom_image {
    border-radius: 20px;
  }

  .like_icon {
    position: absolute;
    bottom: 30px;
    right: 30px;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
  }

  .biography {
    margin: 15px 20px;
    text-align: center;
    font-family: 'Rubik', sans-serif;
    line-height: 15px;
    font-size: 12px;
    max-height: 60px;
    overflow: hidden;
  }

  .tags {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 300px;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto 0;
  }
  
  .section {
    padding: 20px;
  }

</style>
