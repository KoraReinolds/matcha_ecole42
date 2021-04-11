<template lang="pug">
  div(
    :class="[$style.btn]"
    @click="$emit('click', $event)"
  )
    slot

</template>

<script>
export default {
  name: 'Button',
}
</script>

<style module lang="scss">

@import '@/assets/css/button.scss';

</style>
