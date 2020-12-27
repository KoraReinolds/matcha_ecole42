<template lang="pug">
  div(
    :class="[$style.user_page, 'footer_bottom']"
  )
    div(
      v-if="user.images.length"
      :class="$style.main_images"
    )
      CustomImage(
        :width="mobile ? '100%' : '200px'"
        :height="mobile ? '100%' : '300px'"
        :src="user ? user.images.filter(img => img.avatar)[0].src : ''"
      )
      div(
        v-if="!myPage"
        :class="$style.icons"
      )
        Like(
          :size="2"
          :user="user"
        )
        Ban(
          :size="2"
          :user="user"
        )
        Block(
          :size="2"
          :user="user"
        )
      Button(
        v-if="chatAvailable"
        :class="$style.chat_link"
        @click="() => $router.push(`/chat/${user.login}`)"
        :user="user"
      ) Join to chat
      
    div(
      :class="$style.info"
    )
      div(
        :class="$style.field"
      )
        span(
          :class="$style.fio"
        )
          NameLink(
            :user="user"
          )
          Raiting(
            :class="$style.rate"
            :value="user ? user.rating : undefined"
            :size="1"
          )
          Online(
            v-if="user"
            :class="$style.online"
            :time="new Date(this.user.time)"
          )

      div.title.left Gender
      div(
        :class="[$style.field, $style.gender]"
      ) {{ ['male', 'female', 'bisexual'][user.gender - 1] }}

      div.title.left Preferences
      div(
        :class="[$style.field, $style.preferences]"
      )
        template(v-if="user")
          span {{ ['male', 'female', 'bisexual'][user.preference - 1] }}
        template(v-else)
          span ...

      div.title.left Biography
      div(
        :class="[$style.field, $style.biography]"
      ) {{ user ? user.biography : '...' }}

      div.title.left Tags
      div(
        :class="[$style.field, $style.tags]"
      )
        template(v-if="user")
          Tag(
            v-for="tag in user.tags"
            :key="`user_tag_${tag}`"
            :name="tag"
          )
        template(v-else)
          span ...

      div.title.left Images
      div(
        :class="[$style.field, $style.images]"
      )
        template(v-if="user")
          CustomImage(
            :class="$style.image"
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
import { mapActions, mapGetters, mapMutations } from 'vuex'
import CustomImage from '@/components/CustomImage.vue'
import NameLink from '@/components/NameLink.vue'
import Button from '@/components/Button.vue'
import Tag from '@/components/Tag.vue'
import Ban from '@/components/Ban.vue'
import Block from '@/components/Block.vue'
import Like from '@/components/Like.vue'
import Distance from '@/components/Distance.vue'
import Raiting from '@/components/Raiting.vue'
import Online from '@/components/Online.vue'

export default {
  name: 'UserPage',
  async validate({ route, store }) {
    let res = await store.dispatch('user/GET_USER', route.params.id)
    return res.type === "ok" ? true : false;
  },
  components: {
    CustomImage,
    NameLink,
    Button,
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
      return this.user ? this.$auth.user.login === this.user.login : true
    },
    chatAvailable: function() {
      return this.user ? this.user.likedFrom && this.user.likedTo : false
    }
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

@mixin userMixin(
  $padding,
  $flex-direction: row,
  $width-info,
  $margin-left-info: 0,
  $online-display: block,
) {

  .user_page {
    padding: $padding;
    display: flex;
    flex-direction: $flex-direction;
    .main_images {
      margin-bottom: 20px;
      .icons {
        color: lightgray;
        display: flex;
        position: relative;
        justify-content: space-around;
      }
      .chat_link {
        position: relative;
        top: 10px;
        width: 100%;
        display: block;
        width: 90%;
        margin: 0 auto;
      }
    }
    .info {
      width: $width-info;
      margin-left: $margin-left-info;
      .field {
        position: relative;
        width: 100%;
        padding: 10px 5%;
        .fio {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          flex-direction: $flex-direction;
          position: relative;
          font-family: 'Lobster', cursive;
          font-size: 20px;
          .rate {
            margin-left: 10px;
          }
          .online {
            display: $online-display;
            margin-left: auto;
          }
        }
      }
      .tags,
      .preferences {
        span {
          margin-right: 10px;
        }
      }
      .image {
        margin: 5px;
      }
    }
  }
}

@include userMixin(
  $padding: 50px 10px,
  $width-info: 600px,
  $margin-left-info: 30px,
);

@media (max-width: 600px) {
  @include userMixin(
    $padding: 0 0 50px 0,
    $flex-direction: column,
    $width-info: 100%,
    $online-display: none,
  );
}

</style>
