<template lang="pug">
  div(
    :class="$style.chat"
  )
    template(
      v-if="$store.state.chat.users.length"
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
          template(
            v-if="messages.length"
          )
            div(
              v-for="(message, index) in messages"
              :key="'message'+index+curUser.login"
              :class="[$style.message, { [$style.our]: message.our }]"
            )
              span(
                :class="$style.time"
              ) {{ message.created }}
              span(
                v-html="message.message"
                :class="$style.text_block"
              )
          template(
            v-else-if="curUser"
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
            :value="$store.state.chat.message"
            :showError="false"
            @input="$store.commit('chat/SET_MSG', $event)"
            @keyup.enter="sendMessage"
          )
          Icon(
            v-if="$store.getters['chat/MSG_TRIM'].length"
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
import { mapState, mapGetters, mapActions } from 'vuex'
import TextField from '@/components/TextField.vue'
import SideBar from '@/components/ChatSidebar.vue'
import RoundedIcon from '@/components/RoundedIcon.vue'
import Icon from '@/components/Icon.vue'
import CustomImage from '@/components/CustomImage.vue'
import NameLink from '@/components/NameLink.vue'

export default {
  name: 'Chat',
  async validate({ route, store, redirect }) {
    
    let chatList = await store.dispatch('chat/GET_CHAT_LIST', route.params.id)

    if (route.params.id) {

      let user = chatList.find((user) => user.login === route.params.id)
      if (!user) return redirect('/404')
      store.commit('chat/SET_CUR_USER', user)
      await store.dispatch('chat/GET_MESSAGES')
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
  }),
  computed: {
    ...mapState({
      curUser: state => state.chat.curUser,
    }),
    ...mapGetters({
      messages: 'chat/MSG_LIST',
    }),
  },
  methods: {
    ...mapActions({
      sendMessage: 'chat/SEND_MESSAGE',
    }),
    scroll() {
      this.$nextTick(() => {
        const objDiv = this.$refs.messageBox
        if (objDiv) objDiv.scrollTop = objDiv.scrollHeight
      })
    }
  },
  watch: {
    messages() {
      this.scroll()
    },
  },
  mounted() {
    this.scroll()
  }
}
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
    height: $max-height;
    margin: $chat-margin auto;
    display: flex;
    flex-grow: auto;
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
    position: relative;
    overflow: scroll;
    text-align: center;
    margin-top: auto;
    padding: 5% 20px;
    color: gray;
  }

  .message {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    text-align: left;
    flex-direction: row-reverse;

  }

  .time {
    font-size: 0.8em;
    margin: 10px;
  }
  
  .text_block {
    max-width: 80%;
    margin-top: 5px;
    padding: 10px;
    background-color: lightgrey;
    border-radius: 10px;
  }
  // &.unreaded {
  //   background: rgb(188, 195, 226);
  // }

  .our {

    &.message {
      flex-direction: row;
    }

    .text_block {
      color: #fff;
      background: $main-color;
    }

  }

    // &.unreaded {
    //   background: white;
    //   &::after {
    //     content: '';
    //     display: block;
    //     width: 10px;
    //     height: 10px;
    //     background-color: $main-color;
    //     border-radius: 50%;
    //     position: relative;
    //     top: -25px;

    //   }
    // }

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
    $max-height: calc(100vh - #{$footer-height} - #{$header-height}),
  );

}

</style>