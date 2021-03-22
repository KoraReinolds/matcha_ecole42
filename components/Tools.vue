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
        :name="show ? 'times' : 'cog'"
        @click="show=!show"
      )
    div(
      :class="$style.tools"
      v-show="show"
    )
      Options(
        :class="[$style.form_field, $style.full_width]"
        v-bind="tools.pref"
        :icons="true"
        type="checkbox"
        @change="filterUsers({ val: $event, key: 'pref' })"
      )

      TextField(
        :class="$style.form_field"
        v-bind="tools.ageMin"
        type="number"
        min="18"
        max="99"
        @blur="filterUsers({ val: $event.target.value, key: 'ageMin' })"
      )
      TextField(
        :class="$style.form_field"
        v-bind="tools.ageMax"
        type="number"
        min="18"
        max="99"
        @blur="filterUsers({ val: $event.target.value, key: 'ageMax' })"
      )

      TextField(
        :class="[$style.form_field, $style.full_width]"
        v-bind="tools.radius"
        type="number"
        @blur="filterUsers({ val: $event.target.value, key: 'radius' })"
      )

      TextField(
        :class="$style.form_field"
        v-bind="tools.minRating"
        type="number"
        step="10"
        min="0"
        max="1000"
        @blur="filterUsers({ val: $event.target.value, key: 'minRating' })"
      )
      TextField(
        :class="$style.form_field"
        v-bind="tools.maxRating"
        type="number"
        step="10"
        min="0"
        max="1000"
        @blur="filterUsers({ val: $event.target.value, key: 'maxRating' })"
      )

      TagsField(
        :class="[$style.form_field, $style.full_width]"
        v-bind="tools.tags"
        @delete="filterUsers({ val: $event, key: 'tags' })"
        @change="filterUsers({ val: $event, key: 'tags' })"
      )

      Options(
        :class="$style.form_field"
        v-bind="tools.sortLocation"
        :icons="true"
        @change="changeOrder({ val: $event, key: 'sortLocation' })"
        type="checkbox"
      )
      Options(
        :class="$style.form_field"
        v-bind="tools.sortAge"
        :icons="true"
        @change="changeOrder({ val: $event, key: 'sortAge' })"
        type="checkbox"
      )
      Options(
        :class="$style.form_field"
        v-bind="tools.sortRating"
        :icons="true"
        @change="changeOrder({ val: $event, key: 'sortRating' })"
        type="checkbox"
      )
      Options(
        :class="$style.form_field"
        v-bind="tools.sortTags"
        :icons="true"
        @change="changeOrder({ val: $event, key: 'sortTags' })"
        type="checkbox"
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import RoundedIcon from '@/components/RoundedIcon.vue';
import Options from '@/components/Options.vue';
import TextField from '@/components/TextField.vue';
import TagsField from '@/components/TagsField.vue';

export default {
  name: 'tools',
  data: () => ({
    show: true,
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
    ...mapState({
      fieldsData: state => state.forms.formFields,
    }),
    ...mapGetters({
      sortOrder: 'users/SORT_ORDER',
      mobile: 'IS_MOBILE',
    }),
    ...mapGetters({
      tools: 'users/TOOLS',
    }),
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
      changeOrder: 'users/CHANGE_SORT_ORDER',
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
