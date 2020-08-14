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
        RoundedIcon.gender(
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
          ) {{ `${user.age} y.o.` }}
        div.only_laptop.biography
          div.text {{ `${user.biography}` }}
        div.only_laptop.tags
          Tag(
            v-for="tag in user.tags"
            :class="[`${user.gender}_background`]"
            :key="`user_tag_${tag}`"
            :name="tag"
          )

    div.sidebar
      Raiting.icon.only_laptop(
        :value="user.fameRaiting"
        :size="2"
      )
      Distance.icon.only_laptop(
        :value="user.location || user.curLocation"
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
      // mobile: 'IS_MOBILE',
      myLikeList: 'auth/MY_LIKES',
    }),
  },
  methods: {
    paginate(e) {
      if (this.mobile) {
        if (e.clientX > window.innerWidth * 0.8) {
          this.moveUpPage();
        } else if (e.clientX < window.innerWidth * 0.2) {
          this.moveDownPage();
        }
      }
    },
    ...mapMutations({
      }),
    ...mapActions({
      like: 'users/LIKE',
      moveUpPage: 'tools/MOVE_UP_PAGE',
      moveDownPage: 'tools/MOVE_DOWN_PAGE',
      addTag: 'tools/ADD_TAG',
    }),
  },
};
</script>

<style scoped lang="scss">

// @media (max-width: map-get($grid-breakpoints, sm)) {
//   .user {
//     height: 80vh;
//     .like-icon {
//       z-index: 10;
//       bottom: 1px;
//       right: 50%;
//       transform: translateX(50%);
//       position: fixed;
//       height: 50px;
//       width: 50px;
//       background: #fff;
//       border-radius: 50%;
//       .like {
//         position: absolute;
//         left: 50%;
//         top: 50%;
//         transform: translate(-50%, -50%);
//       }
//     }
//     .gender {
//       position: fixed;
//       top: 70px;
//       right: 10px;
//       opacity: 0.8;
//     }
//     .pref_icon {
//       position: fixed;
//       top: 70px;
//       opacity: 0.8;
//     }
//     .pref_icon:nth-child(n) {
//       right: 180px;
//     }
//     .pref_icon:nth-child(2n) {
//       right: 140px;
//     }
//     .pref_icon:nth-child(3n) {
//       right: 100px;
//     }
//     .fio {
//       bottom: 70px;
//       left: 30px;
//       font-family: 'Lobster', cursive;
//       position: fixed;
//       font-size: 25px;
//     }
//     img {
//       opacity: 0.9;
//       height: 80%;
//       width: 100%;
//       position: fixed;
//       top: 0;
//       left: 0;
//       mask-image: linear-gradient(rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%);
//     }
//   }
// }
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
