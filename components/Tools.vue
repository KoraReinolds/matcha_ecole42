<template lang="pug">

  div(
    v-if="tools"
    :class="$style.tools_box"
  )
    RoundedIcon(
      :class="[$style.toggle_state]"
      :name="show ? 'times' : 'cog'"
      @click="show=!show"
    )
    div(
      :class="[$style.tools, { [$style.hide]: !show }]"
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
        Icon(
          v-for="item in sortOrder"
          :class="$style.order_icon"
          :key="'item'+item"
          :name="{ sortTags: 'hashtag', sortLocation: 'location-arrow', sortRating: 'star', sortAge: 'child' }[item]"
          :size="6"
        )

</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import RoundedIcon from '@/components/RoundedIcon.vue';
import Icon from '@/components/Icon.vue';
import Options from '@/components/Options.vue';
import TextField from '@/components/TextField.vue';
import TagsField from '@/components/TagsField.vue';

export default {
  name: 'tools',
  data: () => ({
    // show tools by default
    show: true,
  }),
  components: {
    RoundedIcon,
    Icon,
    Options,
    TextField,
    TagsField,
  },
  computed: {
    ...mapState({
      tools: state => state.users.tools,
      sortOrder: state => state.users.sortOrder,
    }),
    ...mapGetters({
    }),
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
      changeOrder: 'users/CHANGE_SORT_ORDER',
      filterUsers: 'users/FILTER_USERS',
    }),
  },
  mounted() {
  }
}
</script>

<style module lang="scss">

@mixin toolsMixin(
  $mobile: false,
  $default_toggler_display: none,
) {
  
  @if $mobile {
    $default_toggler_display: block;
  }
  
  .tools_box {
    // inherit parent width
    width: inherit;
    position: fixed;
    height: calc(100% - #{$footer-height} - #{$header-height});
    overflow: scroll;
  }

  .toggle_state {
    z-index: 2;
    position: absolute;
    top: 10px;
    right: 10px;
    color: $main-color;
    display: $default_toggler_display;
  }

  .tools {
    background-color: inherit;
    overflow: scroll;
    padding: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    opacity: 1;
    transition: all 0.5s ease;
    max-height: 100%;

    &.hide {
      opacity: 0;
      max-height: 0;
      padding: 0;
    }

  }

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
    .order_icon {
      margin-right: 10px;
      color: $main-color;
    }
  }

}

@include toolsMixin();

@media (max-width: map-get($grid-breakpoints, sm)) {
  @include toolsMixin(
    $mobile: true,
  );
}


</style>
