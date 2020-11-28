<template lang="pug">
  div#user-page(
  )
    div.main-images
      CustomImage(
        :width="mobile ? '100%' : '200px'"
        :height="mobile ? '100%' : '300px'"
        :src="user ? user.images.filter(img => img.avatar)[0].src : ''"
      )
      div.icons(
        v-if="!myPage"
      )
        Like(
          :size="2"
          :active="user.likedFrom"
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
            :value="user ? user.rating : undefined"
            :size="1"
          )
          Online.online.only_laptop(
            v-if="user"
            :time="new Date(this.user.time)"
          )

      div.title.left Gender
      div.field.gender {{ user ? user.gender : '...' }}

      div.title.left Preferences
      div.field.preferences
        template(v-if="user")
          span {{ ['male', 'female', 'bisexual'][user.preference - 1] }}
        template(v-else)
          span ...

      div.title.left Biography
      div.field.biography {{ user ? user.biography : '...' }}

      div.title.left Tags
      div.field.tags
        template(v-if="user")
          Tag(
            v-for="tag in user.tags"
            :key="`user_tag_${tag}`"
            :name="tag"
          )
        template(v-else)
          span ...

      div.title.left Images
      div.field.images
        template(v-if="user")
          CustomImage.image(
            height="100px"
            width="100px"
            v-for="img in user.images"
            :src="img.src"
            :key="'img'+img.index"
          )
        template(v-else)
          span ...

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
      user: 'user/USER',
      chatAvailable: 'user/CHAT_AVAILABLE',
      mobile: 'IS_MOBILE',
    }),
    myPage: function() {
      return this.user ? this.$auth.user.login === this.user.login : true;
    },
    chatAvailable: function() {
      return this.user ? this.user.likedFrom && this.user.likedTo : false
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
        align-items: center;
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
