<template lang="pug">
  div#chat(
    v-if="chatList.length"
  )
    div.window

      div.info
        template(
          v-if="curUser"
        )
          CustomImage.image(
            v-if="!mobile"
            class="image"
            height="36px"
            width="36px"
            rounded
            :src="curUser.images[curUser.avatar].src"
          )
          span.user-name
            NameLink(
              :user="curUser"
            )
            font-awesome-icon.list-toggle(
              v-if="mobile"
              size="1x"
              :icon="show ? 'caret-down' : 'caret-left'" @click="show = !show"
            )
        span.user-name(
          v-else
        ) Choose conversation

      div.messages-box(
        ref="messageBox"
      )
        div.messages(
          v-if="messages"
        )
          div.message(
            v-for="(message, index) in messages"
            :key="'message'+index+curUser.login"
            :class="{ our: message.who.login !== curUser.login }"
          )  who: {{ message.who.login }} target: {{ curUser.login }}
            span.text_block(
              v-html="message.message"
            )

      div.input_field(
        v-if="curUser"
      )
        textarea.text_field(
          ref="input"
          type="text"
          @input="setHeight"
          v-model="message"
          placeholder="Write message"
        )
        font-awesome-icon.icon.send.fa-1x(
          icon="paper-plane"
          @click="sendMessage"
        )

    div.side-bar
      div.fixed-box(
        v-if="show"
      )
        div.side-bar_item(
          v-for="user in chatList"
          :key="'chat'+user.login"
          @click="changeChat(user)"
        ) 
          CustomImage.image(
            :height="`${mobile ? 48 : 70}px`"
            :width="`${mobile ? 48 : 70}px`"
            rounded
            :src="user.images[user.avatar].src"
          )
          div.only_mobile {{ `${user.fname} ${user.lname}` }}

  div#chat(
    v-else
  ) Chat is empty now. Like other users and you can chat with them if you will match each other.

</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import CustomImage from '@/components/CustomImage.vue';
import NameLink from '@/components/NameLink.vue';

export default {
  name: 'chat',
  components: {
    CustomImage,
    NameLink,
  },
  data() {
    return {
      message: '',
      show: true,
    };
  },
  computed: {
    ...mapGetters({
      messages: 'chat/CHAT_MESSAGES',
      curUser: 'chat/CUR_USER',
      chatList: 'chat/CHAT_LIST',
      mobile: 'IS_MOBILE',
    }),
  },
  methods: {
    setHeight() {
      const el = this.$refs.input;
      if (el) {
        el.style.cssText = 'height:0px';
        el.style.cssText = `height:${el.scrollHeight}px`;
      }
    },
    scroll() {
      this.$nextTick(() => {
        const objDiv = this.$refs.messageBox;
        if (objDiv) objDiv.scrollTop = objDiv.scrollHeight;
      });
    },
    ...mapMutations({
      chatWith: 'chat/SET_CUR_CHAT_USER_ID',
    }),
    sendMessage() {
      if (this.message.trim()) {
        this.$store.dispatch('chat/SEND_MESSAGE', this.message);
        this.message = '';
        this.$refs.input.style.cssText = 'height:30px';
        this.$refs.input.focus();
      }
    },
    changeChat(user) {
      this.show = false;
      this.getMessages(user);
      this.scroll();
    },
    ...mapActions({
      getChatList: 'chat/GET_CHAT_LIST',
      getMessages: 'chat/GET_MESSAGES',
    }),
  },
  watch: {
    messages() {
      this.scroll();
    } 
  },
  mounted() {
    this.scroll();
    this.getChatList(this.$route.params.id);
    this.show = this.$route.params.id ? false : true;
  },
};
</script>
<style lang="scss">

@mixin chat(
  $info-height,
  $input-height,
  $chat-color: rgb(221, 221, 221),
  $chat-color-light: rgb(182, 182, 182),
) {
  #chat {
    position: relative;
    .window {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      .info {
        background: $chat-color-light;
        padding-left: 20px;
        height: $info-height;
        width: 100%;
        display: flex;
        align-items: center;
        .user-name {
          font-family: 'Lobster', cursive;
          .list-toggle {
            margin-left: 12px;
          }
        }
      }

      .messages-box {
        position: relative;
        height: 100%;
        width: 100%;
        overflow: scroll;
        .messages {
          position: absolute;
          width: 100%;
          bottom: 0;
          padding: 20px 0;
          max-height: 100%;

          .message {
            margin: 6px 10px 6px 15%;
            text-align: right;
            .text_block {
              padding: 20px;
              display: inline-block;
              line-height: 20px;
              border-radius: 30px;
              background: $chat-color;
            }
          }
          .message.our {
            .text_block {
              background: $main-color;
            }
          }
          @media (max-width: map-get($grid-breakpoints, sm)) {
            .message.our {
              margin: 4px 8px 4px 15%;
              text-align: right;
              .text_block {
                padding: 15px;
                display: inline-block;
                line-height: 20px;
                border-radius: 30px 0 0 30px;
                background: $main-color;
              }
            }
            .message {
              margin: 4px 15% 4px 8px;
              text-align: left;
              .text_block {
                text-align: left;
                margin-left: auto;
                border-radius: 0 30px 30px 0;
                background: $chat-color;
              }
            }
          }
        }
      }

      .input_field {
        width: 100%;
        padding: $input-height/2 - 15px;
        background: $chat-color-light;
        display: flex;
        align-items: center;
        .text_field {
          height: 30px;
          font-size: 14px;
          line-height: 14px;
          padding: 8px;
          width: 100%;
          border: none;
          resize: none;
          border-radius: 5px;
        }
        .icon {
          cursor: pointer;
          bottom: 0;
          color: #fff;
          padding: 0;
          margin-left: 5px;
        }
      }

    }
  }
}

@media (max-width: map-get($grid-breakpoints, sm)) {
  $chat-color: rgb(221, 221, 221);
  $chat-color-light: rgb(207, 207, 207);
  $info-height: 30px;
  @include chat(
    $info-height: $info-height,
    $input-height: 40px,
  );
  #chat {
    width: 100%;
    height: calc(100vh - #{$header-height-mobile} - #{$footer-height-mobile});
    .side-bar {
      position: absolute;
      top: $info-height;
      width: 100%;
      .fixed-box {
        position: fixed;
        width: 100%;
        max-height: 180px;
        overflow: auto;
        border-bottom: solid 1px $font-color;
        .side-bar_item:not(:last-child) {
          border-bottom: 1px solid $font-color;
        }
        .side-bar_item {
          position: relative;
          width: 100%;
          background: #fff;
          cursor: pointer;
          font-family: 'Lobster', cursive;
          height: 60px;
          display: flex;
          padding-left: 30px;
          align-items: center;
          .image {
            margin-right: 20px;
          }
        }
      }
    }
  }
}

@media (min-width: map-get($grid-breakpoints, sm)) {
  $chat-color: rgb(221, 221, 221);
  $chat-color-light: rgb(207, 207, 207);
  $info-height: 50px;
  @include chat(
    $info-height: $info-height,
    $input-height: 50px,
  );
  #chat {
    width: 100%;
    display: flex;
    height: 900px;
    padding: 50px 0;
    position: relative;
    .window {
      border: solid 1px $chat-color-light;
      .image {
        margin-right: 10px;
      }
    }
    .side-bar {
      padding: 0px 25px 0px 10px;
      overflow-x: hidden;
      overflow-y: auto;
      height: 100%;
      right: -100px;
      top: 0px;
      .image {
        cursor: pointer;
        z-index: 2;
        border-radius: 50px;
        width: 100px;
        height: 100px;
        object-fit: cover;
        left: 70px;
      }
    }
  }
}
</style>
