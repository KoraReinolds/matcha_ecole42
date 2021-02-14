<template lang="pug">
  form(
    :class="$style.settings"
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
      @change="setValue({ key: 'tags', value: $event })"
      :maxTags="5"
      :maxTagLength="10"
    )
    //- ReusableTagsField(
    //-   v-if="reusableTags.length"
    //-   :class="$style.form_field"
    //-   v-model="reusableTags"
    //- )
    //- ImagesField(
    //-   :class="[$style.form_field, $style.full_width]"
    //-   :data="fieldsData.images"
    //-   v-model="images"
    //-   :maxTags="5"
    //- )
    //- MapField(
    //-   :class="[$style.form_field, $style.full_width]"
    //-   :data="fieldsData.location"
    //-   v-model="location"
    //-   :realLocation="myLocation"
    //- )
    //- Button(
    //-   :class="$style.btn"
    //-   @click.prevent="updateUser($auth.user)"
    //-   :disabled="!updateValid"
    //- ) Save Changes

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
    let res = await store.dispatch('user/GET_USER', store.state.auth.user.login)
    store.commit('auth/SET', {
      key: 'user',
      value: res.data,
    }, { root: true })
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
    // fname: {
    //   get() { return this.$auth.user.fname },
    //   set(value) { this.changeUserField({ key: 'fname', value }) },
    // },
    // lname: {
    //   get() { return this.$auth.user.lname },
    //   set(value) { this.changeUserField({ key: 'lname', value }) },
    // },
    // age: {
    //   get() { return this.$auth.user.age || '' },
    //   set(value) { this.changeUserField({ key: 'age', value }) },
    // },
    // email: {
    //   get() { return this.$auth.user.email },
    //   set(value) { this.changeUserField({ key: 'email', value }) },
    // },
    // biography: {
    //   get() { return this.$auth.user.biography },
    //   set(value) { this.changeUserField({ key: 'biography', value }) },
    // },
    // gender: {
    //   get() { return this.$auth.user.gender },
    //   set(value) { this.changeUserField({ key: 'gender', value }) },
    // },
    // preference: {
    //   get() { return this.$auth.user.preference },
    //   set(value) { this.changeUserField({ key: 'preference', value }) },
    // },
    // tags: {
    //   get() { return this.$auth.user.tags },
    //   set(value) { this.changeUserField({ key: 'tags', value }) },
    // },
    // reusableTags: {
    //   get() { return this.popularTagList },
    //   set(value) { this.changeUserField({
    //     key: 'tags',
    //     value: [...new Set([...this.$auth.user.tags, value])]
    //   }) },
    // },
    // images: {
    //   get() { return this.$auth.user.images },
    //   set(value) { this.changeUserField({ key: 'images', value }) },
    // },
    // location: {
    //   get() { return this.$auth.user.location },
    //   set(value) { this.changeUserField({ key: 'location', value }) },
    // },
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
  mounted() {
    // Object.entries(this.$auth.user).forEach(([key, value]) => {
    //   this.$store.commit('forms/VALIDATE_VALUE', { key, value })
    // })
  },
};
</script>

<style module lang="scss">

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

    .form_field {
      width: $width;
      &.full_width {
        width: 100%;
      }
    }

    .btn {
      width: $btn-width;
    }

  }

}

@include settingsMixin();

@media (max-width: 600px) {
  @include settingsMixin(
    $grid-gape: 0px,
    $width: 100%,
    $btn-width: 100%,
  );
}

</style>
