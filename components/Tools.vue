<template lang="pug">

  div(
    v-if="tools"
    :class="$style.tools_box"
  )
    div(
      :class="[$style.tools, { [$style.hide]: !show }]"
    )
      Options(
        :class="[$style.form_field, $style.full_width]"
        v-bind="tools.pref"
        :icons="true"
        type="checkbox"
        @change="$store.dispatch('users/FILTER_USERS', { val: $event, key: 'pref' })"
      )

      TextField(
        :class="$style.form_field"
        v-bind="tools.ageMin"
        type="number"
        min="18"
        max="99"
        @blur="$store.dispatch('users/FILTER_USERS', { val: $event.target.value, key: 'ageMin' })"
      )
      TextField(
        :class="$style.form_field"
        v-bind="tools.ageMax"
        type="number"
        min="18"
        max="99"
        @blur="$store.dispatch('users/FILTER_USERS', { val: $event.target.value, key: 'ageMax' })"
      )

      TextField(
        :class="[$style.form_field, $style.full_width]"
        v-bind="tools.radius"
        type="number"
        @blur="$store.dispatch('users/FILTER_USERS', { val: $event.target.value, key: 'radius' })"
      )

      TextField(
        :class="$style.form_field"
        v-bind="tools.minRating"
        type="number"
        step="10"
        min="0"
        max="1000"
        @blur="$store.dispatch('users/FILTER_USERS', { val: $event.target.value, key: 'minRating' })"
      )
      TextField(
        :class="$style.form_field"
        v-bind="tools.maxRating"
        type="number"
        step="10"
        min="0"
        max="1000"
        @blur="$store.dispatch('users/FILTER_USERS', { val: $event.target.value, key: 'maxRating' })"
      )

      TagsField(
        :class="[$style.form_field, $style.full_width]"
        v-bind="tools.tags"
        @delete="$store.dispatch('users/FILTER_USERS', { val: $event, key: 'tags' })"
        @change="$store.dispatch('users/FILTER_USERS', { val: $event, key: 'tags' })"
      )

      Options(
        :class="$style.form_field"
        v-bind="tools.dist"
        :icons="true"
        @change="$store.dispatch('users/CHANGE_SORT_ORDER', { val: $event, key: 'dist' })"
        type="checkbox"
      )
      Options(
        :class="$style.form_field"
        v-bind="tools.age"
        :icons="true"
        @change="$store.dispatch('users/CHANGE_SORT_ORDER', { val: $event, key: 'age' })"
        type="checkbox"
      )
      Options(
        :class="$style.form_field"
        v-bind="tools.rating"
        :icons="true"
        @change="$store.dispatch('users/CHANGE_SORT_ORDER', { val: $event, key: 'rating' })"
        type="checkbox"
      )
      Options(
        :class="$style.form_field"
        v-bind="tools.tagsCount"
        :icons="true"
        @change="$store.dispatch('users/CHANGE_SORT_ORDER', { val: $event, key: 'tagsCount' })"
        type="checkbox"
      )
      div(
        :class="$style.order"
      )
        Icon(
          v-for="item in $store.state.users.sortOrder"
          :class="$style.order_icon"
          :key="'item'+item"
          :name="{ tagsCount: 'hashtag', dist: 'location-arrow', rating: 'star', age: 'child' }[item]"
          :size="6"
        )

</template>

<script>
import RoundedIcon from '@/components/RoundedIcon.vue'
import Icon from '@/components/Icon.vue'
import Options from '@/components/Options.vue'
import TextField from '@/components/TextField.vue'
import TagsField from '@/components/TagsField.vue'

export default {
  name: 'tools',
  props: {
    show: Boolean,
    tools: Object,
  },
  components: {
    RoundedIcon,
    Icon,
    Options,
    TextField,
    TagsField,
  },
}
</script>

<style module lang="scss">

@mixin toolsMixin(
  $tools_width: 260px,
  $tools_position: relative,
) {
  
  .tools_box {
    position: $tools_position;
    width: $tools_width;
    z-index: 4;
  }

  .tools {
    position: fixed;
    width: inherit;
    background-color: #fff;
    overflow: scroll;
    padding: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    opacity: 1;
    transition: all 0.5s ease;
    max-height: calc(100% - #{$header-height} - #{$footer-height});
  }

  .form_field {
    width: 45%;
  }

  .full_width {
    width: 100%
  }

  .order {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  .order_icon {
    margin-right: 10px;
    color: $main-color;
  }

}

@include toolsMixin();

@media (max-width: map-get($grid-breakpoints, sm)) {
  @include toolsMixin(
    $tools_width: 100%,
    $tools_position: fixed,
  );

  .tools.hide {
    opacity: 0;
    max-height: 0;
    padding: 0;
  }
}


</style>
