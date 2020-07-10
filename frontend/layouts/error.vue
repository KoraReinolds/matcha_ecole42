<template lang="pug">
  div.container
    h1(v-if="error.statusCode === 404") Страница не найдена
    h1(v-else) Произошла ошибка
    nuxt-link.button--green(to="/") Вернуться на главную
</template>

<script>
export default {
  props: ['error']
}
</script>

<style lang="scss">
.container {
  flex-direction: column;
  h1 {
    margin-bottom: 20px;
  }
}
</style>
