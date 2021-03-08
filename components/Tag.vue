<template lang="pug">
  span(
    :class="$style.tag"
    @click="$emit('click', $event)"
  ) {{ name }}
    Icon(
      v-if="canDelete"
      :class="$style.close"
      @click="$emit('delete', $event)"
      name="times-circle"
      :size="4"
    )
</template>

<script>
import Icon from '@/components/Icon.vue'

export default {
  name: 'Tag',
  data: () => ({
  }),
  components: {
    Icon,
  },
  props: {
    name: String,
    canDelete: Boolean,
  },
  mounted() {
  },
};
</script>

<style module lang="scss">

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
