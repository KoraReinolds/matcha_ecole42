<template lang="pug">
  span.tag(
    @click="$emit('click', $event)"
  ) {{ name }}
    font-awesome-icon(
      v-if="closeButton"
      class="close"
      @click="$emit('delete', $event)"
      icon="times-circle"
    )
</template>

<script>
export default {
  name: 'Tag',
  data: () => ({
    closeButton: null,
  }),
  props: ['name', 'canDelete'],
  mounted() {
    if (this.canDelete === '') this.closeButton = true;
  },
};
</script>

<style scoped lang="scss">
.tag {
  position: relative;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  margin: 5px;
  padding: 0px 15px 0px 15px;
  font-weight: bold;
  background-color: white;
  border-radius: 15px;
  background: $main-color;
  color: white;
  .close {
    position: relative;
    left: 5px;
    cursor: pointer;
  }
}
</style>
