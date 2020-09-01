<template lang="pug">
  div#user-page(
    v-if="user && me"
  )
    div.main-images
      CustomImage(
        :width="mobile ? '100%' : '200px'"
        :height="mobile ? '100%' : '300px'"
        :src="user.images[user.avatar].src"
        :key="'user_image'+user.login"
      )
      div.icons(
        v-if="!myPage"
      )
        Like(
          :size="2"
          :active="myLikeList.includes(user.login)"
          :user="user"
        )
        Ban(
          :size="2"
          :active="true"
          :user="user"
        )
        Block(
          :size="2"
          :active="true"
          :user="user"
        )
      ChatLink.chat-link(
        v-if="chatAvailable"
        :user="user"
      )
    div.info
      div.field
        span.fio
          NameLink(
            :user="user"
          )
          Raiting.rate(
            :value="user.fameRaiting"
            :size="1"
          )
          Distance.dist(
            v-if="!myPage"
            :value="user.location || user.curLocation"
            :size="1"
          )
          Online.online.only_laptop(
            :time="this.user.time"
          )

      div.title.left Gender
      div.field.gender {{ user.gender }}

      div.title.left Preferences
      div.field.preferences
        span(
          v-for="pref in user.preference"
          :key="`user_pref_${pref}`"
        ) {{ pref }}

      div.title.left Biography
      div.field.biography {{ user.biography }}

      div.title.left Tags
      div.field.tags
        Tag(
          v-for="tag in user.tags"
          :key="`user_tag_${tag}`"
          :name="tag"
        )

      div.title.left Images
      div.field.images
        CustomImage.image(
          height="100px"
          width="100px"
          v-for="img in user.images"
          :src="img.src"
          :key="'img'+img.index"
        )

</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import CustomImage from '@/components/CustomImage.vue';
import NameLink from '@/components/NameLink.vue';
import ChatLink from '@/components/ChatLink.vue';
import Tag from '@/components/Tag.vue';
import Ban from '@/components/Ban.vue';
import Block from '@/components/Block.vue';
import Like from '@/components/Like.vue';
import Distance from '@/components/Distance.vue';
import Raiting from '@/components/Raiting.vue';
import Online from '@/components/Online.vue';

export default {
  name: 'UserPage',
  async validate({ route, store }) {
    let res = await 
      store.dispatch('user/GET_USER', route.params.id)
    return res.type === "ok" ? true : false;
  },
  components: {
    CustomImage,
    NameLink,
    ChatLink,
    Tag,
    Ban,
    Block,
    Like,
    Distance,
    Raiting,
    Online,
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      me: 'auth/GET_USER',
      user: 'user/USER',
      myLikeList: 'auth/MY_LIKES',
      chatAvailable: 'user/CHAT_AVAILABLE',
      mobile: 'IS_MOBILE',
    }),
    myPage: function() {
      return this.me.login === this.user.login
    },
    chatAvailable: function() {
      return this.user.likeList.includes(this.me.login) &&
        this.myLikeList.includes(this.user.login);
    }
  },
  methods: {
    ...mapMutations({
      chatWIthUser: 'users/SET_CUR_CHAT_USER_ID',
    }),
    ...mapActions({
      visitUser: 'user/VISIT_USER',
    }),
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">

#user-page {
  padding: 50px 10px;
  display: flex;
  @media (max-width: map-get($grid-breakpoints, sm)) {
    flex-direction: column;
    padding: 0 0 50px 0;
  }
  .main-images {
    margin-bottom: 20px;
    .icons {
      color: lightgray;
      display: flex;
      position: relative;
      justify-content: space-around;
    }
    .chat-link {
      position: relative;
      top: 10px;
    }
    @media (max-width: map-get($grid-breakpoints, sm)) {
      .chat-link {
        display: block;
        width: 90%;
        margin: 0 auto;
      }
    }
    @media (min-width: map-get($grid-breakpoints, sm)) {
      .chat-link { width: 100%; }
    }
  }
  .info {
    @media (min-width: map-get($grid-breakpoints, sm)) { width: 600px; };
    @media (min-width: map-get($grid-breakpoints, sm)) { margin-left: 30px; }
    .field {
      position: relative;
      width: 100%;
      padding: 10px 5%;
      .fio {
        display: flex;
        flex-wrap: wrap;
        @media (max-width: map-get($grid-breakpoints, sm)) { flex-direction: column; };
        position: relative;
        font-family: 'Lobster', cursive;
        font-size: 20px;
        .name,
        .rate,
        .dist {
          margin: 5px 20px 5px 0;
        }
        .online {
          @media (min-width: map-get($grid-breakpoints, sm)) { margin-left: auto; };
        }
      }
    }
    .tags,
    .preferences {
      span {
        margin-right: 10px;
      }
    }
    .tags span {
      cursor: default;
    }
    .image {
      margin: 5px;
    }
  }
}

</style>
