<template lang="pug">
  form(
    :class="$style.settings"
    name="login_settings"
    @submit.prevent="updateUser"
  )
    TextField(
      :class="$style.form_field"
      outlined
      v-bind="fieldsData.fname"
      @input="setValue({ key: 'fname', value: $event })"
    )
    TextField(
      :class="$style.form_field"
      outlined
      v-bind="fieldsData.lname"
      @input="setValue({ key: 'lname', value: $event })"
    )
    TextField(
      :class="$style.form_field"
      outlined
      v-bind="fieldsData.age"
      @input="setValue({ key: 'age', value: $event })"
      type="number"
      min="18"
      max="99"
    )
    TextField(
      :class="$style.form_field"
      outlined
      v-bind="fieldsData.email"
      @input="setValue({ key: 'email', value: $event })"
      name="email"
    )
    TextField(
      :class="[$style.form_field, $style.full_width]"
      outlined
      many
      v-bind="fieldsData.biography"
      @input="setValue({ key: 'biography', value: $event })"
    )
    Options(
      :class="$style.form_field"
      v-bind="fieldsData.gender"
      type="radio"
      @change="setValue({ key: 'gender', value: $event })"
    )
    Options(
      :class="$style.form_field"
      v-bind="fieldsData.preference"
      type="checkbox"
      @change="setValue({ key: 'preference', value: $event })"
    )
    TagsField(
      :class="$style.form_field"
      v-bind="fieldsData.tags"
      @delete="setValue({ key: 'tags', value: $event })"
      @change="setValue({ key: 'tags', value: $event })"
      :maxTags="5"
      :maxTagLength="10"
    )
    ReusableTagsField(
      v-if="popularTagList.length"
      :class="$style.form_field"
      :value="popularTagList"
      @change="setValue({ key: 'tags', value: $event })"
    )
    ImagesField(
      :class="[$style.form_field, $style.full_width]"
      v-bind="fieldsData.images"
      @change="setValue({ key: 'images', value: $event })"
      :maxImages="5"
    )
    MapField(
      :class="[$style.form_field, $style.full_width]"
      v-bind="fieldsData.location"
      @change="setValue({ key: 'location', value: $event })"
      :realLocation="myLocation"
    )

    input(
      :class="$style.btn"
      type="submit"
      :disabled="!updateValid"
      value="Save Changes"
    )

</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import MapField from '@/components/MapField.vue';
import ImagesField from '@/components/ImagesField.vue';
import TagsField from '@/components/TagsField.vue';
import TextField from '@/components/TextField.vue';
import Options from '@/components/Options.vue';
import Button from '@/components/Button.vue';
import ReusableTagsField from '@/components/ReusableTagsField.vue';

export default {
  name: 'Settings',
  async validate({ route, store }) {
    await store.dispatch('forms/GET_POPULAR_TAGS')
    const { data: value } = await store.dispatch('user/GET_USER', store.state.auth.user.login)
    store.commit('auth/SET', {
      key: 'user',
      value,
    }, { root: true })
    Object.entries(value).forEach(([key, value]) => {
      store.commit('forms/VALIDATE_VALUE', { key, value })
    })
    return true
  },
  components: {
    MapField,
    ImagesField,
    TagsField,
    TextField,
    Options,
    Button,
    ReusableTagsField,
  },
  computed: {
    ...mapState({
      popularTagList: state => state.forms.popular_tags,
      fieldsData: state => state.forms.formFields,
      myLocation: state => state.forms.realLocation,
    }),
    ...mapGetters({
      updateValid: 'forms/UPDATE_VALID',
    }),
  },
  methods: {
    ...mapMutations({
      setValue: 'forms/VALIDATE_VALUE',
    }),
    ...mapActions({
      updateUser: 'forms/UPDATE_USER',
      changeUserField: 'forms/CHANGE_USER_FIELD',
    }),
  },
}
</script>

<style module lang="scss">

@import '@/assets/css/button.scss';


@mixin settingsMixin(
  $grid-gape: 10px,
  $width: calc(50% - 10px),
  $btn-width: 150px,
) {

  .settings {
    padding: 0 10px;
    margin: 50px auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

  }

  .form_field {
    width: $width;
  }

  .full_width {
    width: 100%;
  }

  .btn {
    width: $btn-width;
  }

}

@include settingsMixin();

@media (max-width: map-get($grid-breakpoints, sm)) {
  @include settingsMixin(
    $grid-gape: 0px,
    $width: 100%,
    $btn-width: 100%,
  );
}

</style>
