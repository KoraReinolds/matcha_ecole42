<template lang="pug">

  div(
    v-if="tools"
    :class="$style.tools_box"
  )
    div(
      :class="$style.toggle_state_box"
    )
      RoundedIcon(
        :class="[$style.icon, $style.toggle_state]"
        :icon="show ? 'times' : 'cog'"
        @click="show=!show"
        :size="3"
      )
    div(
      :class="$style.tools"
      v-show="show"
    )
      Options(
        :class="[$style.form_field, $style.full_width]"
        :data="tools.pref"
        v-model.trim="pref"
        many
      )
      //- Options(
      //-   :class="[$style.form_field, $style.full_width]"
      //-   :data="tools.pref"
      //-   :icons="prefIcons"
      //-   v-model.trim="pref"
      //- )
      TextField(
        :class="$style.form_field"
        :data="tools.ageMin"
        v-model="ageMin"
        type="number"
        min="18"
        max="99"
        @blur="filterUsers({ val: $event.target.value, key: 'ageMin' })"
      )
      TextField(
        :class="$style.form_field"
        :data="tools.ageMax"
        v-model="ageMax"
        type="number"
        min="18"
        max="99"
        @blur="filterUsers({ val: $event.target.value, key: 'ageMax' })"
      )

      TextField(
        :class="[$style.form_field, $style.full_width]"
        :data="tools.radius"
        @blur="filterUsers({ val: $event.target.value, key: 'radius' })"
        v-model="radius"
        type="number"
      )

      TextField(
        :class="$style.form_field"
        :data="tools.minRating"
        @blur="filterUsers({ val: $event.target.value, key: 'minRating' })"
        v-model="minRating"
        type="number"
        step="10"
      )
      TextField(
        :class="$style.form_field"
        :data="tools.maxRating"
        @blur="filterUsers({ val: $event.target.value, key: 'maxRating' })"
        v-model="maxRating"
        type="number"
        step="10"
        max="1000"
      )

      TagsField(
        :class="[$style.form_field, $style.full_width]"
        :data="tools.tags"
        v-model="tags"
        @delete="filterUsers({ val: $event, key: 'tags' })"
        @add="filterUsers({ val: $event, key: 'tags' })"
      )

      Options(
        :class="$style.form_field"
        :data="tools.sortLocation"
        v-model="sortLocation"
        :icons="{ '-1': 'sort-amount-down', '1': 'sort-amount-up' }"
        many
      )
      Options(
        :class="$style.form_field"
        :data="tools.sortAge"
        :icons="{ '-1': 'sort-amount-down', '1': 'sort-amount-up' }"
        v-model="sortAge"
        many
      )
      Options(
        :class="$style.form_field"
        :data="tools.sortRating"
        :icons="{ '-1': 'sort-amount-down', '1': 'sort-amount-up' }"
        v-model="sortRating"
        many
      )
      Options(
        :class="$style.form_field"
        :data="tools.sortTags"
        :icons="{ '-1': 'sort-amount-down', '1': 'sort-amount-up' }"
        v-model="sortTags"
        many
      )
      div(
        :class="$style.order"
      )
        font-awesome-icon(
          :class="$style.icon"
          v-for="item in sortOrder"
          :key="'item'+item"
          :icon="['fas', { sortTags: 'hashtag', sortLocation: 'location-arrow', sortRating: 'star', sortAge: 'child' }[item]]"
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
      sortOrder: 'users/SORT_ORDER',
      mobile: 'IS_MOBILE',
    }),
    pref: {
      set(value) { this.filterUsers({ val: value, key: 'pref' }) },
      get() { return this.tools.pref.value; },
    },
    ageMin: {
      set(value) { this.filterUsers({ val: value, key: 'ageMin' }) },
      get() { return this.tools.ageMin.value; },
    },
    ageMax: {
      set(value) { this.filterUsers({ val: value, key: 'ageMax' }) },
      get() { return this.tools.ageMax.value; },
    },
    radius: {
      set(value) { this.filterUsers({ val: value, key: 'radius' }) },
      get() { return this.tools.radius.value; },
    },
    maxRating: {
      set(value) { this.filterUsers({ val: value, key: 'maxRating' }) },
      get() { return this.tools.maxRating.value; },
    },
    minRating: {
      set(value) { this.filterUsers({ val: value, key: 'minRating' }) },
      get() { return this.tools.minRating.value; },
    },
    tags: {
      set(value) { this.filterUsers({ val: value, key: 'tags' }) },
      get() { return this.tools.tags.value; },
    },
    sortLocation: {
      set(value) {
        this.changeOrder(['sortLocation', value.length])
        this.filterUsers({ val: value.length === 2 ? [value[1]] : value, key: 'sortLocation' })
      },
      get() { return this.tools.sortLocation.value; },
    },
    sortAge: {
      set(value) {
        this.changeOrder(['sortAge', value.length])
        this.filterUsers({ val: value.length === 2 ? [value[1]] : value, key: 'sortAge' })
      },
      get() { return this.tools.sortAge.value; },
    },
    sortRating: {
      set(value) {
        this.changeOrder(['sortRating', value.length])
        this.filterUsers({ val: value.length === 2 ? [value[1]] : value, key: 'sortRating' })
      },
      get() { return this.tools.sortRating.value; },
    },
    sortTags: {
      set(value) {
        this.changeOrder(['sortTags', value.length])
        this.filterUsers({ val: value.length === 2 ? [value[1]] : value, key: 'sortTags' })
      },
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
      changeOrder: 'users/CHANGE_SORT_ORDER'
    }),
    ...mapActions({
      addTag: 'users/ADD_TAG',
      filterUsers: 'users/FILTER_USERS',
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

<style module lang="scss">

@mixin toolsMixin(
  $width: 100%,
  $position-tools: absolute,
  $position-tools-box: absolute,
  $tools-height: 90%,
  $toggle-btn-viisibility: block,
  $overflow: hidden,
) {

  .tools_box {
    width: $width;
    position: $position-tools-box;

    .toggle_state_box {
      display: $toggle-btn-viisibility;
      cursor: pointer;
      position: fixed;
      width: $width;
      z-index: 2;
      .toggle_state {
        position: absolute;
        right: 0;
        color: $main-color;
        transform: translate(-10px, 10px);
      }
    }

    .tools {
      background: #fff;
      width: $width;
      position: fixed;
      height: $tools-height;
      overflow: $overflow;
      padding: 30px 30px 90px 30px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .form_field {
        width: 45%;
        &.full_width {
          width: 100%
        }
      }
      .order {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 10px;
        .icon {
          color: $main-color;
          margin-right: 10px;
        }
      }
    }

  }

}

@include toolsMixin(
  $width: 260px,
  $position-tools: fixed,
  $position-tools-box: relative,
  $tools-height: auto,
  $toggle-btn-viisibility: none,
);

@media (max-width: 600px) {
  @include toolsMixin(
    $width: 100%,
    $position-tools: absolute,
    $position-tools-box: absolute,
    $tools-height: 100%,
    $overflow: scroll,
  );
}


</style>
