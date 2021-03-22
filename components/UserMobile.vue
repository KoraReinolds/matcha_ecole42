<template lang="pug">
  div(
    :class="[$style.user, gender(user.gender)]"
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
          @click="paginate"
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

</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import RoundedIcon from '@/components/RoundedIcon.vue'
import CustomImage from '@/components/CustomImage.vue'
import Distance from '@/components/Distance.vue'
import NameLink from '@/components/NameLink.vue'
import Raiting from '@/components/Raiting.vue'
import Tag from '@/components/Tag.vue'
import Like from '@/components/Like.vue'

export default {
  name: 'UserMobile',
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
    ...mapState({
      mobilePage: state.users.mobilePage,
    }),
    ...mapGetters({
      mobile: 'IS_MOBILE',
    }),
  },
  methods: {
    gender: index => ['male', 'female', 'bisexual'][index - 1],
    paginate(e) {
      if (this.mobile) {
        if (e.clientX > window.innerWidth * 0.8) {
          this.changeMobileUser(this.mobilePage + 1)
        } else if (e.clientX < window.innerWidth * 0.2) {
          this.changeMobileUser(this.mobilePage - 1)
        }
      }
    },
    ...mapMutations({
      }),
    ...mapActions({
      like: 'users/LIKE',
      changeMobileUser: 'users/CHANGE_MOBILE_USER',
    }),
  },
  mounted() {
  }
};
</script>

<style module lang="scss">

.user {
  .like_icon {
    bottom: 40px;
    right: 0;
    right: 10%;
    transform: translateX(50%);
    position: fixed;
    height: 50px;
    width: 50px;
    background: #fff;
    border-radius: 50%;
    .like {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .fio {
    bottom: 50px;
    left: 20px;
    font-family: 'Lobster', cursive;
    position: fixed;
    font-size: 25px;
  }
  .age {
    display: block;
    font-size: 14px;
  }
  img {
    opacity: 0.9;
    height: 80%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    mask-image: linear-gradient(rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%);
  }
}

</style>
