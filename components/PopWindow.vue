<template lang="pug">

  div(
    v-if="$store.state.windows.popWindows"
    :class="[$style.notifications]"
  )
    div(
      v-for="(message, index) in $store.state.windows.popWindows"
      :class="[$style.mess, { [$style.hide]: !message.visible }]"
      :key="'message'+index"
    )
      RoundedIcon(
        :class="[$style.icon, $style[`${message.action}_color`]]"
        :name="message.action"
        :size="10"
        :innerScale="0.6"
      )
      span(
        :class="[$style.text]"
      ) {{ message.msg }}
      Icon(
        @click="$store.commit('windows/HIDE_MSG', message.id)"
        name="times"
        :size="5"
      )
      
</template>

<script>
import Icon from '@/components/Icon.vue'
import RoundedIcon from '@/components/RoundedIcon.vue'

export default {
  name: 'PopWindow',
  components: {
    Icon,
    RoundedIcon,
  },
  props: {
    icon: String,
  },
}
</script>

<style module lang="scss">

@import '@/assets/css/map-colors.scss';
  
  @mixin popWindowMixin(
    $width: 400px,
    $offset-right: 5%,
    $offset-bottom: 10%,
    $border-radius: 20px 20px 0px 20px,
    $max-message-height: 200px,
    $padding: 20px,
    $align: start,
    $message-position: static,
  ) {
      
    .notifications {
      width: $width;
      position: fixed;
      flex-direction: column;
      right: $offset-right;
      bottom: $offset-bottom;
      display: flex;
      z-index: 11111111;
    }

    .mess {
      position: $message-position;
      bottom: 0;
      width: inherit;
      display: flex;
      align-items: $align;
      color: white;
      background: linear-gradient(
        rgb(110, 110, 110),
        rgb(110, 110, 110),
      );
      margin-top: 20px;
      border-radius: $border-radius;
      padding: $padding;
      max-height: $max-message-height;
      min-height: 50px;
      opacity: 1;
      transition: all 0.5s ease-in-out;
      overflow: hidden;
    }

  }

  @media (min-width: map-get($grid-breakpoints, sm)) {
    @include popWindowMixin();
  }

  @media (max-width: map-get($grid-breakpoints, sm)) {
    @include popWindowMixin(
      $width: 100%,
      $offset-right: 0%,
      $offset-bottom: 0%,
      $border-radius: 0px,
      $max-message-height: 50px,
      $padding: 0px 20px,
      $align: center,
      $message-position: absolute,
    );
  }

  .hide {
    opacity: 0;
    max-height: 0px;
    min-height: 0px;
    padding: 0px 20px;
    margin-top: 0;
  }

  .text {
    flex-grow: 1;
  }

  .icon {
    margin-right: 20px;
  }

</style>
