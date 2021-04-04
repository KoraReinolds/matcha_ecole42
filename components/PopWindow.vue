<template lang="pug">
  div(
    v-if="messages"
    :class="[$style.notifications]"
  )
    div(
      v-for="(message, index) in messages"
      :class="[$style.mess, { [$style.hide]: !message.visible }]"
      :key="'message'+index"
    )
      Icon(
        :class="[$style.icon, $style[`${message.action}_color`]]"
        :name="message.action"
        :size="10"
      )
      span {{ message.msg }}
      Icon(
        @click="closeMessage(message.id)"
        name="times"
        :size="5"
      )
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Icon from '@/components/Icon.vue'

export default {
  name: 'PopWindow',
  components: {
    Icon,
  },
  props: {
    icon: String,
  },
  computed: {
    ...mapState({
      messages: state => state.popWindows.popWindows,
    }),
    ...mapGetters({
    }),
  },
  methods: {
    ...mapMutations({
      closeMessage: 'popWindows/HIDE_MSG',
    }),
    ...mapActions({
    }),
  },
  mounted() {
  },
};
</script>

<style module lang="scss">

@import '@/assets/css/map-colors.scss';
  
  @mixin popWindowMixin(

  ) {
      
    .notifications {
      width: 400px;
      position: fixed;
      right: 5%;
      bottom: 10%;
      display: flex;
      flex-direction: column-reverse;
      z-index: 11111111;
    }

    .mess {
      display: flex;
      color: white;
      background: linear-gradient(
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.7)
      );
      margin: 10px 0;
      border-radius: 20px 20px 0px 20px;
      padding: 20px;
      max-height: 200px;
      opacity: 1;
      transition: all 0.5s ease-in-out;
      overflow: hidden;
    }

    .hide {
      opacity: 0;
      max-height: 0px;
      padding: 0px 20px;
    }

    .icon {
      margin-right: 20px;
    }
  }

  @include popWindowMixin();

  @media (max-width: map-get($grid-breakpoints, sm)) {
    @include popWindowMixin(
    );
  }
</style>
