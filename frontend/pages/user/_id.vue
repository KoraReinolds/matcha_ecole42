<template lang="pug">
  div#user-page(
    v-if="user && me"
  ) {{ user }}
    //- div.main-images
    //-   CustomImage(
    //-     :width="mobile ? '100%' : '200px'"
    //-     :height="mobile ? '100%' : '300px'"
    //-     :src="user.images[user.avatar].src"
    //-     :key="'user_image'+user.login"
    //-   )
    //-   div.icons(
    //-     v-if="user.index !== me.index"
    //-   )
    //-     Like(
    //-       :size="2"
    //-       :active="myLikeList.includes(user.index)"
    //-       :user="user"
    //-     )
    //-     Ban(
    //-       :size="2"
    //-       :user="user"
    //-     )
    //-     Block(
    //-       :size="2"
    //-       :user="user"
    //-     )
    //-   //- ChatLink.chat-link(
    //- //-     v-if="user.index != me.index &&
    //- //-     myLikeList.includes(user.index) &&
    //- //-     visitorLikeList.includes(user.index)"
    //- //-     :user="user"
    //-   //- )
    //- div.info
    //-   div.field
    //-     span.fio
    //-       NameLink(
    //-         :user="user"
    //-       )
    //-       Raiting.rate(
    //-         :value="user.fameRating"
    //-       )
    //-       Distance.dist(
    //-         :value="user.dist"
    //-       )
    //-       Online.online(
    //-         :time="this.user.time"
    //-       )

    //-   div.title.left Gender
    //-   div.field.gender {{ user.gender }}

    //-   div.title.left Preferences
    //-   div.field.preferences
    //-     span(
    //-       v-for="pref in user.preference"
    //-       :key="`user_pref_${pref}`"
    //-     ) {{ pref }}

    //-   div.title.left Biography
    //-   div.field.biography {{ user.biography }}

    //-   div.title.left Tags
    //-   div.field.tags
    //-     Tag(
    //-       v-for="tag in user.tags"
    //-       :key="`user_tag_${tag}`"
    //-       :name="tag"
    //-     )

    //-   div.title.left Images
    //-   div.field.images
    //-     CustomImage.image(
    //-       height="100px"
    //-       width="100px"
    //-       v-for="img in user.pictures"
    //-       :src="img.src"
    //-       :key="'img'+img.id"          
    //-     )

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
      me: 'user/USER',
      user: 'user/USER',
      visitorLikeList: 'users/VISITOR_LIKES',
      myLikeList: 'users/MY_LIKES',
      location: 'user/LOCATION',
      mobile: 'IS_MOBILE',
    }),
  },
  methods: {
    ...mapMutations({
      chatWIthUser: 'users/SET_CUR_CHAT_USER_ID',
      setCurUserId: 'users/SET_CUR_USER_ID',
    }),
    ...mapActions({
      visitUser: 'users/VISIT_USER',
      getUser: 'user/GET_USER',
    }),
  },
  // watch: {
  //   $route() {
  //     this.setCurUserId(this.$route.params.id);
  //   },
  // },
  mounted() {
    this.getUser(this.$route.params.id);
    // this.setCurUserId(+this.$route.params.id);
    // this.visitUser(+this.$route.params.id);
  },
};
</script>

<style scoped lang="scss">

#user-page {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 50px 10px;
  @media (max-width: map-get($grid-breakpoints, sm)) { padding: 0 0 50px 0; }
  .main-images {
    position: relative;
    @media (max-width: map-get($grid-breakpoints, sm)) { margin-bottom: 90px; };
    @media (max-width: map-get($grid-breakpoints, sm)) { width: 100%; }
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
  }
  .info {
    @media (min-width: map-get($grid-breakpoints, sm)) { width: 600px; };
    @media (max-width: map-get($grid-breakpoints, sm)) { width: 100%; };
    margin: 0 30px;
    @media (max-width: map-get($grid-breakpoints, sm)) { margin: 0; }
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
