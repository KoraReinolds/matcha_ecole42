<template lang="pug">
  div(
    v-if="chatList.length"
    :class="$style.chat"
  )
    div(
      :class="$style.window"
    )

      div(
        :class="$style.info"
      )
        template(
          v-if="curUser"
        )
          CustomImage(
            :class="$style.image"
            v-if="!mobile"
            class="image"
            height="36px"
            width="36px"
            rounded
            :src="curUser.src"
          )
          span(
            :class="$style.user_name"
          )
            NameLink(
              :user="curUser"
            )
            font-awesome-icon(
              :class="$style.list_toggle"
              v-if="mobile"
              size="1x"
              :icon="show ? 'caret-down' : 'caret-left'" @click="show = !show"
            )
        span(
          :class="$style.user_name"
          v-else
        ) Choose conversation

      div(
        :class="$style.messages_box"
        ref="messageBox"
      )
        div(
          v-if="messages.length"
          :class="$style.messages"
        )
          div(
            v-for="(message, index) in messages"
            :key="'message'+index+curUser.login"
            :class="[$style.message, { [$style.our]: message.toLogin === curUser.login, [$style.unreaded]: !message.read }]"
          )
            span(
              :class="$style.time"
            ) {{ getDate(message.time) }}
            span(
              v-html="message.message"
              :class="$style.text_block"
            )
        div(
          :class="$style.messages"
          v-else-if="curUser"
        )
          div(
            :class="$style.else"
          ) Send first message


      div(
        v-if="curUser"
        :class="$style.input_field"
      )
        textarea(
          :class="$style.text_field"
          ref="input"
          type="text"
          @input="setHeight"
          v-model="message"
          placeholder="Write message"
        )
        font-awesome-icon.fa-2x(
          :class="$style.send"
          icon="paper-plane"
          @click="sendMessage"
        )

    div(
      :class="$style.side_bar"
    )

      div(
        v-if="show"
        :class="$style.fixed_box"
      )
        div(
          v-for="user in chatList"
          :class="$style.side_bar_item"
          :key="'chat'+user.login"
          @click="changeChat(user)"
        )
          nuxt-link(
            :class="$style.link"
            :to="`/chat/${user.login}`"
          )
            CustomImage(
              :class="$style.image"
              :height="`${mobile ? 48 : 70}px`"
              :width="`${mobile ? 48 : 70}px`"
              rounded
              :src="user.src"
            )
            div.only_mobile {{ `${user.fname} ${user.lname}` }}

  div(
    :class="$style.chat"
    v-else
  ) Chat is empty now. Like other users and you can chat with them if you will match each other.

</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import CustomImage from '@/components/CustomImage.vue'
import NameLink from '@/components/NameLink.vue'

export default {
  name: 'Chat',
  async validate({ route, store }) {
    let res = {}
    let chatList = store.getters['chat/CHAT_LIST']
    let user
    if (!chatList.length) {
      chatList = (await store.dispatch('chat/GET_CHAT_LIST', route.params.id)).data
    }
    store.commit('chat/SET_CUR_USER', null)
    store.commit('chat/SET_MESSAGES', [])
    user = chatList.find((user) => user.login === route.params.id)
    if (route.params.id) {
      if (!user) return false
      store.commit('chat/SET_CUR_USER', user)
      res = await store.dispatch('chat/GET_MESSAGES')
      return res.type === "ok" ? true : false
    }
    return true;
  },
  components: {
    CustomImage,
    NameLink,
  },
  data() {
    return {
      intervalId: '',
      message: '',
      show: true,
      today: new Date(Date.now()).toLocaleString('ru', {
        day: 'numeric',
        month: 'long',
        timezone: 'UTC',
      })
    }
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
    getDate(t) {
      let date = new Date(t).toLocaleString('ru', {
        month: 'long',
        day: 'numeric',
        timezone: 'UTC',
      })
      let time = new Date(t).toLocaleString('ru', {
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
      })
      return `${(date === this.today ? 'today' : date)} ${time}`
    },
    setHeight() {
      const el = this.$refs.input
      if (el) {
        el.style.cssText = 'height:0px'
        el.style.cssText = `height:${el.scrollHeight}px`
      }
    },
    scroll() {
      this.$nextTick(() => {
        const objDiv = this.$refs.messageBox
        if (objDiv) objDiv.scrollTop = objDiv.scrollHeight
      })
    },
    ...mapMutations({
      setCurUser: 'chat/SET_CUR_USER',
    }),
    sendMessage() {
      if (this.message.trim()) {
        this.$store.dispatch('chat/SEND_MESSAGE', this.message)
        this.message = ''
        this.$refs.input.style.cssText = 'height:36px'
        this.$refs.input.focus()
      }
    },
    changeChat(user) {
      this.show = this.mobile ? false : true
      this.scroll()
    },
    ...mapActions({
    }),
  },
  watch: {
    messages() {
      this.scroll()
    },
    mobile() {
      this.show = this.mobile ?
        (this.$route.params.id ? false : true) :
        true
      }
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  mounted() {
    this.scroll();
    this.show = this.mobile ?
      (this.$route.params.id ? false : true) :
      true
    this.intervalId = setInterval(function() {
      if (this.$route.params.id) {
        this.$store.dispatch('chat/GET_MESSAGES')
      }
    }.bind(this), 3000)
  },
};
</script>
<style module lang="scss">

@mixin chatMixin(
  $info-height: 50px,
  $chat-margin: 50px,
) {

  .chat {
    position: relative;
    max-width: 600px;
    margin: $chat-margin auto;
    display: flex;
    .window {
      border: 1px solid lightgray;
      flex-grow: 1;
      max-height: 800px;
      display: flex;
      flex-direction: column;
      .info {
        background: lightgrey;
        padding-left: 20px;
        min-height: $info-height;
        width: 100%;
        display: flex;
        align-items: center;
        .list_toggle {
          margin-left: 12px;
        }
      }

      .messages_box {
        flex-grow: 1;
        position: relative;
        width: 100%;
        overflow: scroll;
        .messages {
          position: absolute;
          width: 100%;
          bottom: 0;
          padding: 20px 0;
          max-height: 100%;

          .else {
            text-align: center;
            color: gray;
            font-size: 0.8em;
          }

          .message {
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            margin: 6px 10px;
            text-align: left;
            .time {
              font-size: 0.8em;
              color:gray;
              margin-right: 10px;
              transform: translateY(-5px);
            }
            .text_block {
              max-width: 100%;
              // overflow: scroll;
              margin: 5px;
              padding: 15px;
              display: inline-block;
              line-height: 20px;
              border-radius: 30px;
              // background: $chat-color;
            }
            &.unreaded {
              background: rgb(188, 195, 226);
            }
          }
          .message.our {
            .text_block {
              color: #fff;
              background: $main-color;
            }
            &.unreaded {
              background: white;
              &::after {
                content: '';
                display: block;
                width: 10px;
                height: 10px;
                background-color: $main-color;
                border-radius: 50%;
                position: relative;
                top: -25px;

              }
            }
          }
          @media (max-width: map-get($grid-breakpoints, sm)) {
            .message {
              margin: 4px 8px;
              .text_block {
                padding: 15px;
                display: inline-block;
                line-height: 20px;
                border-radius: 30px 0 0 30px;
              }
            }
          }
        }
      }

      .input_field {
        width: 100%;
        min-height: 50px;
        background: lightgray;
        padding: 10px;
        display: flex;
        align-items: center;
        .text_field {
          height: 36px;
          font-size: 20px;
          line-height: 20px;
          padding: 8px;
          width: 100%;
          border: none;
          resize: none;
          border-radius: 5px;
        }
        .send {
          cursor: pointer;
          bottom: 0;
          color: #fff;
          padding: 0;
          margin-left: 5px;
        }
      }

    }

    @media (min-width: map-get($grid-breakpoints, sm)) {

      .side_bar {
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

    @media (max-width: map-get($grid-breakpoints, sm)) {

      .side_bar {
        position: absolute;
        top: $info-height;
        width: 100%;
        .fixed_box {
          position: fixed;
          width: 100%;
          max-height: 180px;
          overflow: auto;
          border-bottom: solid 1px $font-color;
          .side_bar_item:not(:last-child) {
            border-bottom: 1px solid $font-color;
          }
          .side_bar_item .link {
            position: relative;
            width: 100%;
            background: #fff;
            cursor: pointer;
            font-family: 'Lobster', cursive;
            height: 60px;
            display: flex;
            padding-left: 30px;
            align-items: center;
            text-decoration: none;
            color: $font-color;
            .image {
              margin-right: 20px;
            }
          }
        }
      }
    }

  }
}

@include chatMixin(
  
);

@media (max-width: 600px) {
  @include chatMixin(
    $chat-margin: 0,
  );
}

</style>
