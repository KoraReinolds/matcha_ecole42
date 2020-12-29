<template lang="pug">

  div
    TextField(
      v-if="value"
      v-model.trim="newTag"
      outlined
      :data="data"
      @blur="addTag"
      @keyup.enter="addTag"
    )
    div.title.left(v-else) Tags
    div(
      :class="$style.tags"
    )
      Tag(
        v-for="tag in value"
        :key="data.title+tag"
        :name="tag"
        canDelete
        @delete="deleteTag(tag)"
      )

</template>

<script>
import TextField from '@/components/TextField.vue'
import InputWrapper from '@/components/InputWrapper.vue'
import Tag from '@/components/Tag.vue'

export default {
  name: 'tagsFielld',
  data: () => ({
    newTag: null,
  }),
  components: {
    TextField,
    Tag,
    InputWrapper,
  },
  props: {
    data: Object,
    value: Array,
    maxTags: Number,
  },
  methods: {
    deleteTag(tag) {
      const newVal = this.value.filter(val => val !== tag)
      this.$emit('input', newVal)
      this.$emit('delete', newVal)
    },
    addTag() {
      if (this.newTag && !this.value.includes(this.newTag)) {
        const newVal = [...this.value, this.newTag]
        this.$emit('input', newVal)
        this.$emit('add', newVal)
      }
      this.newTag = null
    },
  },
};
</script>

<style module lang="scss">

  .tags {
    padding-bottom: 20px;
    text-align: left;
  }

</style>
