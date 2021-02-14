<template lang="pug">

  div
    TextField(
      v-model.trim="newTag"
      outlined
      v-bind="$attrs"
      @blur="addTag"
      @keyup.enter="addTag"
      :errorMsg="newTag.length > maxTagLength ? 'Max 10 characters' : ''"
    )
    div(
      :class="$style.tags"
    )
      Tag(
        v-for="tag in value"
        :key="tag"
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
  inheritAttrs: false,
  name: 'TagsFielld',
  data: () => ({
    newTag: '',
  }),
  components: {
    TextField,
    Tag,
    InputWrapper,
  },
  props: {
    value: Array,
    maxTags: Number,
    maxTagLength: Number,
  },
  methods: {
    deleteTag(tag) {
      const newSet = new Set(this.value)
      newSet.delete(tag)
      this.$emit('change', [...newSet])
    },
    addTag(e) {
      if (this.newTag && this.newTag.length <= this.maxTagLength) {
        this.$emit('change', [...new Set(this.value).add(this.newTag)])
        this.newTag = ''
      }
    },
  },
};
</script>

<style module lang="scss">

  @import '@/assets/css/title.scss';

  .tags {
    padding-bottom: 20px;
    text-align: left;
  }

</style>
