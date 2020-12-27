<template lang="pug">
  div(
    :class="$style.settings"
  )
    TextField(
      :class="$style.form_field"
      outlined
      :data="fieldsData.fname"
      v-model.trim="fname"
    )
    TextField(
      :class="$style.form_field"
      outlined
      :data="fieldsData.lname"
      v-model="lname"
    )
    TextField(
      :class="$style.form_field"
      outlined
      :data="fieldsData.age"
      v-model.trim="age"
      type="number"
      min="18"
      max="99"
    )
    TextField(
      :class="$style.form_field"
      outlined
      :data="fieldsData.email"
      v-model.trim="email"
      name="email"
    )
    TextField(
      :class="[$style.form_field, $style.full_width]"
      outlined
      many
      :data="fieldsData.biography"
      v-model.trim="biography"
    )
    Options(
      :class="$style.form_field"
      :data="fieldsData.gender"
      v-model="gender"
    )
    Options(
      :class="$style.form_field"
      :data="fieldsData.preference"
      v-model="preference"
    )
    TagsField(
      :class="$style.form_field"
      :data="fieldsData.tags"
    v-model="tags"
      :maxTags="5"
    )
    ImagesField(
      :class="[$style.form_field, $style.full_width]"
      :data="fieldsData.images"
      v-model="images"
      :maxTags="5"
    )
    MapField(
      :class="[$style.form_field, $style.full_width]"
      :data="fieldsData.location"
      v-model="location"
      :realLocation="myLocation"
    )
    Button(
      :class="$style.btn"
      @click.prevent="updateUser($auth.user)"
      :disabled="!updateValid"
    ) Save Changes

</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import MapField from '@/components/MapField.vue';
import ImagesField from '@/components/ImagesField.vue';
import TagsField from '@/components/TagsField.vue';
import TextField from '@/components/TextField.vue';
import Options from '@/components/Options.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'Settings',
  async validate({ route, store }) {
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
  },
  computed: {
    fname: {
      get() { return this.$auth.user.fname; },
      set(value) { this.changeUserField({ key: 'fname', value }) },
    },
    lname: {
      get() { return this.$auth.user.lname; },
      set(value) { this.changeUserField({ key: 'lname', value }) },
    },
    age: {
      get() { return this.$auth.user.age || ''; },
      set(value) { this.changeUserField({ key: 'age', value }) },
    },
    email: {
      get() { return this.$auth.user.email; },
      set(value) { this.changeUserField({ key: 'email', value }) },
    },
    biography: {
      get() { return this.$auth.user.biography; },
      set(value) { this.changeUserField({ key: 'biography', value }) },
    },
    gender: {
      get() { return this.$auth.user.gender; },
      set(value) { this.changeUserField({ key: 'gender', value }) },
    },
    preference: {
      get() { return this.$auth.user.preference; },
      set(value) { this.changeUserField({ key: 'preference', value }) },
    },
    tags: {
      get() { return this.$auth.user.tags; },
      set(value) { this.changeUserField({ key: 'tags', value }) },
    },
    images: {
      get() { return this.$auth.user.images; },
      set(value) { this.changeUserField({ key: 'images', value }) },
    },
    location: {
      get() { return this.$auth.user.location; },
      set(value) { this.changeUserField({ key: 'location', value }) },
    },
    ...mapGetters({
      fieldsData: 'forms/FIELDS_DATA',
      updateValid: 'forms/UPDATE_VALID',
      myLocation: 'forms/MY_LOCATION',
    }),
  },
  methods: {
    ...mapMutations({
      }),
    ...mapActions({
      updateUser: 'forms/UPDATE_USER',
      changeUserField: 'forms/CHANGE_USER_FIELD',
    }),
  },
  mounted() {
    Object.entries(this.$auth.user).forEach(([key, value]) => {
      this.$store.commit('forms/VALIDATE_VALUE', { key, value })
    })
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
