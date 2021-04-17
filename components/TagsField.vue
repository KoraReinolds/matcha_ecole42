<template lang="pug">

  TextField(
    v-model.trim="newTag"
    outlined
    v-bind="$attrs"
    @blur="addTag"
    @keyup.enter="addTag"
    @focus="readonly = false"
    :readonly="readonly"
    :errorMsg="newTag.length > maxTagLength ? 'Max 10 characters' : errorMsg"
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
    // установлено только для чтения, чтобы при валидации формы
    // браузер не проверял это поле (пустое)
    readonly: true,
    newTag: '',
  }),
  components: {
    TextField,
    Tag,
    InputWrapper,
  },
  props: {
    value: Array,
    errorMsg: String,
    maxTags: Number,
    maxTagLength: {
      type: Number,
      default: 5,
    },
  },
  methods: {
    deleteTag(tag) {
      const newSet = new Set(this.value)
      newSet.delete(tag)
      this.$emit('delete', [...newSet])
    },
    addTag(e) {
      this.readonly = true
      if (
        this.newTag && this.newTag.length <= this.maxTagLength
      ) {
        this.$emit('change', [
          ...new Set([
            ...this.value,
            this.newTag
          ])
        ])
        this.newTag = ''
      }
    },
  },
}
</script>

<style module lang="scss">

  .tags {
    margin-top: 10px;
    text-align: left;
  }
  
</style>
