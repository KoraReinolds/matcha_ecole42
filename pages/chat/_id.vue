<template lang="pug">
  div(
    :class="$style.chat"
  )
    template(
      v-if="chatList.length"
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
              rounded
              :images="curUser.images"
            )
            NameLink(
              :user="curUser"
            )
            RoundedIcon(
              :class="$style.list_toggle"
              :size="5"
              :name="showSidebar ? 'caret-down' : 'caret-left'"
              @click="showSidebar = !showSidebar"
            )
          template(
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
          TextField(
            :class="$style.text_field"
            many
            outlined
            placeholder="Write message"
            v-model="message"
            :showError="false"
            @keyup.enter="sendMessage"
          )
          Icon(
            :class="$style.send"
            name="paper-plane"
            @click="sendMessage"
            :size="8"
          )

      //- visible if showSidebar === true or user is undefined
      SideBar(
        :class="[$style.side_bar]"
        :visible="showSidebar || !curUser"
      )

    template(
      v-else
    ) Chat is empty now. Like other users and you can chat with them if you will match each other.

</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import TextField from '@/components/TextField.vue'
import SideBar from '@/components/ChatSidebar.vue'
import RoundedIcon from '@/components/RoundedIcon.vue'
import Icon from '@/components/Icon.vue'
import CustomImage from '@/components/CustomImage.vue'
import NameLink from '@/components/NameLink.vue'

export default {
  name: 'Chat',
  async validate({ route, store, redirect }) {
    
    // let res = {}
    // let user
    let chatList = await store.dispatch('chat/GET_CHAT_LIST', route.params.id)

    if (route.params.id) {

      let user = chatList.find((user) => user.login === route.params.id)
      if (!user) return redirect('/404')
      store.commit('chat/SET_CUR_USER', user)
    //   res = await store.dispatch('chat/GET_MESSAGES')
    //   return res.type === "ok" ? true : redirect('/404')
    }

    return true

  },
  components: {
    TextField,
    SideBar,
    RoundedIcon,
    Icon,
    CustomImage,
    NameLink,
  },
  data: () => ({
    showSidebar: false,
    message: '',
    today: new Date(Date.now()).toLocaleString('ru', {
      day: 'numeric',
      month: 'long',
      timezone: 'UTC',
    })
  }),
  computed: {
    ...mapState({
      messages: state => state.chat.messages,
      curUser: state => state.chat.curUser,
      chatList: state => state.chat.users,
    }),
    ...mapGetters({
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
    // changeChat(user) {
    //   this.scroll()
    // },
    scroll() {
      this.$nextTick(() => {
        const objDiv = this.$refs.messageBox
        if (objDiv) objDiv.scrollTop = objDiv.scrollHeight
      })
    },
    ...mapMutations({
      setCurUser: 'chat/SET_CUR_USER',
    }),
    sendMessage(e) {
      if (this.message.trim()) {
        this.$store.dispatch('chat/SEND_MESSAGE', this.message)
        this.message = ''
      }
    },
    ...mapActions({
    }),
  },
  watch: {
    messages() {
      this.scroll()
    },
  },
  mounted() {
    this.scroll()
  },
};
</script>
<style module lang="scss">

@mixin chatMixin(
  $info-height: 50px,
  $chat-margin: 50px,
  $max-height: 800px,
) {

  .chat {
    position: relative;
    max-width: 600px;
    max-height: $max-height;
    margin: $chat-margin auto;
    display: flex;
  }

  .window {
    border: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .side_bar {
    max-height: $max-height;
  }

  .info {
    background: lightgrey;
    padding-left: 20px;
    min-height: $info-height;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .image {
    height: 30px;
    width: 30px;
    margin-right: 20px;
  }

  .list_toggle {
    margin-left: 12px;
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
          background-color: lightgrey;
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
    background: lightgray;
    padding: 10px;
    display: flex;
    align-items: center;
  }

  .text_field {
    flex-grow: 1;
    fieldset {
      background-color: #fff;
    }
  }

  .send {
    color: #fff;
    margin-left: 10px;
  }

}

@media (min-width: map-get($grid-breakpoints, sm)) {

  @include chatMixin();

  .list_toggle {
    display: none;
  }

}

@media (max-width: map-get($grid-breakpoints, sm)) {

  @include chatMixin(
    $chat-margin: 0,
  );

}

</style>