<template lang="pug">
  div.tools_box(
    v-if="tools"
    :class="{ hide: !show }"
  )
    RoundedIcon.icon.close.only_mobile(
      :icon="show ? 'times' : 'cog'"
      @click="show=!show"
      :size="3"
    )
    div.tools(
      v-if="show"
    )
      Options.pref.form-field(
        many
        :data="tools.pref"
        :icons="prefIcons"
        v-model.trim="pref"
      )

      TextField.form-field(
        :data="tools.minAge"
        v-model="minAge"
        type="number"
        min="18"
        max="99"
        @blur="filterList({ val: $event.target.value, key: 'minAge' })"
      )
      TextField.form-field(
        :data="tools.maxAge"
        v-model="maxAge"
        type="number"
        min="18"
        max="99"
        @blur="filterList({ val: $event.target.value, key: 'maxAge' })"
      )

      TextField.form-field(
        :data="tools.minDist"
        @blur="filterList({ val: $event.target.value, key: 'minDist' })"
        v-model="minDist"
        type="number"
      )
      TextField.form-field(
        :data="tools.maxDist"
        @blur="filterList({ val: $event.target.value, key: 'maxDist' })"
        v-model="maxDist"
        type="number"
      )

      TextField.form-field(
        :data="tools.minRate"
        @blur="filterList({ val: $event.target.value, key: 'minRate' })"
        v-model="minRate"
        type="number"
        step="10"
      )
      TextField.form-field(
        :data="tools.maxRate"
        @blur="filterList({ val: $event.target.value, key: 'maxRate' })"
        v-model="maxRate"
        type="number"
        step="10"
        max="1000"
      )

      TagsField.tags.form-field(
        :data="tools.tags"
        v-model="tags"
        :maxTags="5"
        @delete="filterList({ val: $event, key: 'tags' })"
        @add="filterList({ val: $event, key: 'tags' })"
      )

      Options.form-field(
        :data="tools.sortDist"
        v-model="sortDist"
        :icons="{ dist: 'sort-amount-down-alt', dist_rev: 'sort-amount-down' }"
        many
      )
      Options.form-field(
        :data="tools.sortAge"
        :icons="{ age: 'sort-amount-down-alt', age_rev: 'sort-amount-down' }"
        v-model="sortAge"
        many
      )
      Options.form-field(
        :data="tools.sortRate"
        :icons="{ fameRaiting: 'sort-amount-down-alt', fameRaiting_rev: 'sort-amount-down' }"
        v-model="sortRate"
        many
      )
      Options.form-field(
        v-if="tools.tags.value.length > 1"
        :data="tools.sortTags"
        :icons="{ countTags: 'sort-amount-down-alt', countTags_rev: 'sort-amount-down' }"
        v-model="sortTags"
        many
      )

</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import RoundedIcon from '@/components/RoundedIcon.vue';
import Options from '@/components/Options.vue';
import TextField from '@/components/TextField.vue';
import TagsField from '@/components/TagsField.vue';

export default {
  name: 'tools',
  data: () => ({
    show: true,
    newTag: null,
    prefIcons: {
      male: 'mars',
      female: 'venus',
      bisexual: 'transgender',
    }
  }),
  components: {
    RoundedIcon,
    Options,
    TextField,
    TagsField,
  },
  computed: {
    ...mapGetters({
      mobile: 'IS_MOBILE',
    }),
    pref: {
      set(value) { this.filterList({ val: value, key: 'pref' }); },
      get() { return this.tools.pref.value; },
    },
    minAge: {
      set(value) { this.changeToolsValue({ val: value, key: 'minAge' }); },
      get() { return this.tools.minAge.value; },
    },
    maxAge: {
      set(value) { this.changeToolsValue({ val: value, key: 'maxAge' }); },
      get() { return this.tools.maxAge.value; },
    },
    maxDist: {
      set(value) { this.changeToolsValue({ val: value, key: 'maxDist' }); },
      get() { return this.tools.maxDist.value; },
    },
    minDist: {
      set(value) { this.changeToolsValue({ val: value, key: 'minDist' }); },
      get() { return this.tools.minDist.value; },
    },
    maxRate: {
      set(value) { this.changeToolsValue({ val: value, key: 'maxRate' }); },
      get() { return this.tools.maxRate.value; },
    },
    minRate: {
      set(value) { this.changeToolsValue({ val: value, key: 'minRate' }); },
      get() { return this.tools.minRate.value; },
    },
    tags: {
      set(value) { this.changeToolsValue({ val: value, key: 'tags' }); },
      get() { return this.tools.tags.value; },
    },
    sortDist: {
      set(value) { this.sort({ val: value, key: 'sortDist' }); },
      get() { return this.tools.sortDist.value; },
    },
    sortAge: {
      set(value) { this.sort({ val: value, key: 'sortAge' }); },
      get() { return this.tools.sortAge.value; },
    },
    sortRate: {
      set(value) { this.sort({ val: value, key: 'sortRate' }); },
      get() { return this.tools.sortRate.value; },
    },
    sortTags: {
      set(value) { this.sort({ val: value, key: 'sortTags' }); },
      get() { return this.tools.sortTags.value; },
    },
    sortList: {
      set(value) { this.sort(value); },
      get() { return this.$store.getters['users/SORT_LIST']; },
    },
    ...mapGetters({
      tools: 'users/TOOLS',
    }),
  },
  methods: {
    deleteTag(index) {
      this.tools.tags.splice(index, 1);
      this.filterUsers();
    },
    ...mapMutations({
      changeToolsValue: 'users/CHANGE_TOOLS',
    }),
    ...mapActions({
      addTag: 'users/ADD_TAG',
      filterList: 'users/FILTER_LIST',
      sort: 'users/SORT',
    }),
  },
  watch: {
    mobile(val) {
      this.show = !val;
    }
  }
};
</script>

<style scoped lang="scss">
.tools_box {
  position: relative;
  @media (max-width: map-get($grid-breakpoints, sm)) {
    background-color: rgba($color: lighten($main-color, 20%), $alpha: 0.9);
  }
  width: 260px;
  margin: 0 auto;
  height: calc(100%);
  display: flex;
  flex-direction: column;
  @media (max-width: map-get($grid-breakpoints, sm)) {
    width: calc(100%);
  }
  .close {
    position: fixed;
    color: $main-color;
    top: 40px;
    right: 10px;
    z-index: 2;
  }
  .tools {
  @media (max-width: map-get($grid-breakpoints, sm)) {
      height: 100%;
      overflow: auto;
    }
    @media (min-width: map-get($grid-breakpoints, sm)) {
      position: fixed;
      width: 260px;
    }
    padding: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .form-field {
      width: 45%;
      &.pref,
      &.tags {
        width: 100%
      }
    }
  }
  &.hide {
    height: 0;
  }
}
</style>
