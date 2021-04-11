<template lang="pug">
  div
    div(
      :class="$style.title"
    ) Popular_tags
    Tag(
      :class="$style.tag"
      v-for="(tag, index) in value"
      :key="'reusable_'+tag"
      :name="tag"
      @click="addTag(tag)"
    )
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
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
    ...mapState({
      tags: state => state.forms.formFields.tags.value
    }),
    ...mapGetters({
    }),
  },
  methods: {
    ...mapActions({
    }),
    addTag(tag) {
      this.$emit('change', [
        ...new Set([
          ...this.tags,
          tag
        ])
      ])
    },
  },
  mounted() {
  },
};
</script>

<style module lang="scss">

  @import '@/assets/css/title.scss';

  .title {
    @include titleMixin(
      $base-color: $main-color,
    )
  }
  
  .tag {
    cursor: pointer;
  }

</style>
