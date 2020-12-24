<template lang="pug">
  div(
    :class="$style.user"
  )
    div(
      :class="[$style.main, `${gender(user.gender)}_background-light`]"
    )
      div(
        :class="$style.image"
      )
        CustomImage(
          :class="$style.custom_image"
          :src="user.src"
        )
        RoundedIcon(
          :class="$style.gender"
          :icon="gender(user.preference)"
          :size="4"
          :mask="false"
        )
        div(
          v-if="user.likedFrom !== undefined"
          :class="$style.like_icon"
        )
          Like(
            :class="$style.like"
            :user="user"
            :size="2"
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
            :class="[`${gender(user.gender)}_background`]"
            :key="`user_tag_${tag}`"
            :name="tag"
          )

    div(
      :class="$style.sidebar"
    )
      Raiting(
        :class="$style.icon"
        :value="user.rating"
        :size="2"
      )
      Distance(
        :class="$style.icon"
        :value="user.distance"
        :size="2"
      )

</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import RoundedIcon from '@/components/RoundedIcon.vue'
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
  },
  props: {
    user: Object,
  },
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    gender: index => ['male', 'female', 'bisexual'][index - 1],
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
    .icon {
      padding: 20px;
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
        box-shadow: 0 0 10px lightgrey;
        background: #fff;
        z-index: 100;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        .like {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
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
