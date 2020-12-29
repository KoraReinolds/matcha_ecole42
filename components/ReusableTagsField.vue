<template lang="pug">
  div(
    :class="$style.reusable_tags"
  )
    span.title.left Popular_tags
    Tag(
      :class="$style.tag"
      v-for="(tag, index) in value"
      :key="index+tag.name"
      :name="tag.name"
      @click="$emit('input', tag.name)"
    )
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Tag from '@/components/Tag.vue'

export default {
  name: 'ReusableTags',
  data: () => ({
  }),
  components: {
    Tag,
  },
  props: {
    value: Array,
  },
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapActions({
    }),
  },
  mounted() {
  },
};
</script>

<style module lang="scss">

  .reusable_tags {
    .tag {
      cursor: pointer;
    }

  }

</style>
