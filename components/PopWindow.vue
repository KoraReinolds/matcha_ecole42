<template lang="pug">
    div.notifications.only_laptop(
      v-if="messages"
    )
      div.mess(
        v-for="(message, index) in messages"
        :key="'message'+index"
        :style="{ display: message.visible ? 'block' : 'none' }"
      )
          font-awesome-icon.close(
            @click="closeMessage(index)"
            icon="times"
          )
          font-awesome-icon.icon.fa-2x(
            :class="[`${message.action}_color`, message.action]"
            :icon="icons[message.action]"
          )
          span {{ message.msg || getMessage(message) }}
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import iconsMixin from '@/mixins/iconMixin';

export default {
  name: 'PopWindow',
  props: {
    icon: String,
  },
  mixins: [iconsMixin],
  computed: {
    ...mapGetters({
      messages: 'history/POP_WINDOWS',
    }),
  },
  methods: {
    ...mapMutations({
      closeMessage: 'history/CLOSE_MSG',
    }),
    ...mapActions({
      getNotifications: 'history/GET_NOTIFICATIONS',
    }),
    getMessage(message) {
      return (message.action ==='messages') ?
        `${message.who.fname} ${message.who.lname} send you message` :
        `${message.who.fname} ${message.who.lname} ${message.action} you`
    }
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
@media (min-width: map-get($grid-breakpoints, sm)) {
  .notifications {
    width: 400px;
    position: fixed;
    right: 5%;
    bottom: 10%;
    display: flex;
    flex-direction: column-reverse;
    z-index: 10;
    .mess {
      position: relative;
      color: white;
      background: linear-gradient(
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.7)
      );
      display: flex;
      align-items: center;
      margin: 10px 0;
      border-radius: 20px 20px 0px 20px;
      padding: 20px 40px 20px 20px;
      .close {
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 10px;
      }
      .icon {
        margin-right: 10px;
      }
    }
  }
}
</style>
