<template lang="pug">
  div.user(
    :class="[user.gender]"
  )
    div.main(
      :class="[`${user.gender}_background-light`]"
    )
      div.image
        CustomImage.custom_image(
          :src="user.images[user.avatar].src"
          @click="paginate"
        )
        RoundedIcon.gender.only_laptop(
          :icon="user.gender"
          :size="4"
          :mask="false"
        )
        div.like-icon(
        )
          Like.like(
            :user="user"
            :size="2"
            :active="myLikeList.includes(user.login)"
          )
      div.content
        span.fio
          NameLink.age(
            :user="user"
          )
          span.age {{ `${user.age} y.o.` }}
        div.only_laptop.biography
          div.text {{ `${user.biography}` }}
        div.only_laptop.tags
          Tag(
            v-for="tag in user.tags"
            :class="[`${user.gender}_background`]"
            :key="`user_tag_${tag}`"
            :name="tag"
          )

    div.sidebar.only_laptop
      Raiting.icon(
        :value="user.fameRaiting"
        :size="2"
      )
      Distance.icon(
        :value="user.curLocation || user.location"
        :size="2"
      )
      div.icon.pref
        RoundedIcon.pref_icon(
          :class="['pref_icon']"
          v-for="(gender, index) in user.preference"
          :key="'pref'+user.login+gender"
          :icon="gender"
          :size="3"
          :mask="false"
        )

</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import RoundedIcon from '@/components/RoundedIcon.vue';
import CustomImage from '@/components/CustomImage.vue';
import Distance from '@/components/Distance.vue';
import NameLink from '@/components/NameLink.vue';
import Raiting from '@/components/Raiting.vue';
import Tag from '@/components/Tag.vue';
import Like from '@/components/Like.vue';

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
      mobile: 'IS_MOBILE',
      myLikeList: 'auth/MY_LIKES',
      curPage: 'users/CUR_PAGE',
      maxLength: 'users/MAX_LENGTH',
    }),
  },
  methods: {
    paginate(e) {
      if (this.mobile) {
        if (e.clientX > window.innerWidth * 0.8) {
          this.getUsers((this.curPage + 1) % this.maxLength || this.maxLength);
        } else if (e.clientX < window.innerWidth * 0.2) {
          this.getUsers((this.curPage - 1) % this.maxLength || this.maxLength);
        }
      }
    },
    ...mapMutations({
      }),
    ...mapActions({
      like: 'users/LIKE',
      getUsers: 'users/GET_USERS',
    }),
  },
};
</script>

<style scoped lang="scss">

@media (max-width: map-get($grid-breakpoints, sm)) {
  .user {
    .like-icon {
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
}
@media (min-width: map-get($grid-breakpoints, sm)) {

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
      width: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .icon {
        padding: 0 20px;
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
        .like-icon {
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
}

</style>
