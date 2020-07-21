<template lang="pug">
  div.tag-field
    TextField(
      v-if="data.value.length < maxTags"
      v-model.trim="newTag"
      outlined
      :data="data"
      @blur="addTag"
      @keyup.enter="addTag"
    )
    div.title.left(v-else) Tags
    div.tags
      Tag(
        v-for="tag in value"
        :key="data.title+tag"
        :name="tag"
        canDelete
        @click="deleteTag(tag)"
      ) canDelete
</template>

<script>
import TextField from '@/components/TextField.vue';
import Tag from '@/components/Tag.vue';

export default {
  name: 'tagsFielld',
  data: () => ({
    newTag: null,
  }),
  components: {
    TextField,
    Tag,
  },
  props: {
    data: Object,
    value: Array,
    maxTags: Number,
  },
  methods: {
    deleteTag(tag) {
      this.$emit('input', this.data.value.filter(val => val !== tag));
    },
    addTag() {
      if (this.newTag && !this.data.value.includes(this.newTag)) {
        this.$emit('input', [...this.data.value, this.newTag])
      }
      this.newTag = null;
    },
  },
};
</script>

<style scoped lang="scss">
.tag-field {
  .tags {
    padding-bottom: 20px;
    text-align: left;
    .tag {
      margin: 5px 10px 5px 0px;
    }
  }
}
</style>
