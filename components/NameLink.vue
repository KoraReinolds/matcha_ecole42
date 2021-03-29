<template lang="pug">
  nuxt-link(
    :class="[$style.name, $style[`${color}_color`]]"
    :to="`/user/${user.login}`"
  )
    span(
      v-if="user"
    ) {{`${user.fname} ${user.lname} `}}
    span(
      :class="[$style.link]"
      v-else
    ) ...
    slot
</template>

<script>
export default {
  name: 'NameLink',
  data: () => ({
  }),
  props: {
    user: Object,
    color: {
      type: String,
      default: 'font',
    }
  },
  mounted() {
  },
};
</script>

<style module lang="scss">

  @import '@/assets/css/map-colors.scss';

  .name {
    font-family: 'Lobster', cursive;
    text-decoration: none;
    font-size: 20px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
</style>
