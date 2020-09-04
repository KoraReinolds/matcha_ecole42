<template lang="pug">
  span.name
    nuxt-link.link(
      v-if="user"
      :to="`/user/${user.login}`"
    ) {{`${user.fname} ${user.lname} `}}
    span.link(
      v-else
    ) ...
</template>

<script>
export default {
  name: 'NameLink',
  data: () => ({
  }),
  props: {
    user: Object,
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
.name {
  font-family: 'Lobster', cursive;
  a {
    text-decoration: none;
    color: $font-color;
    font-size: 20px;
    cursor: pointer;
  }
  a:hover {
    text-decoration: underline;
  }
}
</style>
