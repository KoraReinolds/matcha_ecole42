<template lang="pug">
  div.tag-field
    TextField(
      v-if="value && value.length < maxTags"
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
      const newVal = this.value.filter(val => val !== tag);
      this.$emit('input', newVal);
      this.$emit('delete', newVal);
    },
    addTag() {
      if (this.newTag && !this.value.includes(this.newTag)) {
        const newVal = [...this.value, this.newTag];
        this.$emit('input', newVal);
        this.$emit('add', newVal);
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
