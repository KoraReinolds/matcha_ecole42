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
        :data="tools.pref"
        :icons="prefIcons"
        v-model.trim="pref"
      )
      TextField.form-field(
        :data="tools.ageMin"
        v-model="ageMin"
        type="number"
        min="18"
        max="99"
        @blur="filterList({ val: $event.target.value, key: 'ageMin' })"
      )
      TextField.form-field(
        :data="tools.ageMax"
        v-model="ageMax"
        type="number"
        min="18"
        max="99"
        @blur="filterList({ val: $event.target.value, key: 'ageMax' })"
      )

      TextField.form-field(
        class="radius"
        :data="tools.radius"
        @blur="filterList({ val: $event.target.value, key: 'radius' })"
        v-model="radius"
        type="number"
      )

      TextField.form-field(
        :data="tools.minRating"
        @blur="filterList({ val: $event.target.value, key: 'minRating' })"
        v-model="minRating"
        type="number"
        step="10"
      )
      TextField.form-field(
        :data="tools.maxRating"
        @blur="filterList({ val: $event.target.value, key: 'maxRating' })"
        v-model="maxRating"
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
        :data="tools.sortLocation"
        v-model="sortLocation"
        :icons="{ 1: 'sort-amount-down-alt', [-1]: 'sort-amount-down' }"
      )
      Options.form-field(
        :data="tools.sortAge"
        :icons="{ 1: 'sort-amount-down-alt', [-1]: 'sort-amount-down' }"
        v-model="sortAge"
      )
      Options.form-field(
        :data="tools.sortRating"
        :icons="{ 1: 'sort-amount-down-alt', [-1]: 'sort-amount-down' }"
        v-model="sortRating"
      )
      Options.form-field(
        v-if="tools.tags.value.length > 1"
        :data="tools.sortTags"
        :icons="{ 1: 'sort-amount-down-alt', [-1]: 'sort-amount-down' }"
        v-model="sortTags"
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
    ageMin: {
      set(value) { this.filterList({ val: value, key: 'ageMin' }); },
      get() { return this.tools.ageMin.value; },
    },
    ageMax: {
      set(value) { this.filterList({ val: value, key: 'ageMax' }); },
      get() { return this.tools.ageMax.value; },
    },
    radius: {
      set(value) { this.changeToolsValue({ val: value, key: 'radius' }); },
      get() { return this.tools.radius.value; },
    },
    maxRating: {
      set(value) { this.filterList({ val: value, key: 'maxRating' }); },
      get() { return this.tools.maxRating.value; },
    },
    minRating: {
      set(value) { this.filterList({ val: value, key: 'minRating' }); },
      get() { return this.tools.minRating.value; },
    },
    tags: {
      set(value) { this.filterList({ val: value, key: 'tags' }); },
      get() { return this.tools.tags.value; },
    },
    sortLocation: {
      set(value) { this.filterList({ val: value, key: 'sortLocation' }) },
      get() { return +this.tools.sortLocation.value; },
    },
    sortAge: {
      set(value) { this.filterList({ val: value, key: 'sortAge' }); },
      get() { return +this.tools.sortAge.value; },
    },
    sortRating: {
      set(value) { this.filterList({ val: value, key: 'sortRating' }); },
      get() { return +this.tools.sortRating.value; },
    },
    sortTags: {
      set(value) { this.filterList({ val: value, key: 'sortTags' }); },
      get() { return +this.tools.sortTags.value; },
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
      // changeToolsValue: 'users/CHANGE_TOOLS',
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
  },
  mounted() {
    this.show = !this.mobile;
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
      &.radius,
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
