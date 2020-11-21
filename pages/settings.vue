<template lang="pug">
  div#settings
    TextField.form-field(
      outlined
      :data="fieldsData.fname"
      v-model.trim="fname"
    )
    TextField.form-field(
      outlined
      :data="fieldsData.lname"
      v-model="lname"
    )
    TextField.form-field(
      outlined
      :data="fieldsData.age"
      v-model.trim="age"
      type="number"
      min="18"
      max="99"
    )
    TextField.form-field(
      outlined
      :data="fieldsData.email"
      v-model.trim="email"
      name="email"
    )
    TextField.form-field.textarea(
      outlined
      many
      :data="fieldsData.biography"
      v-model.trim="biography"
    )
    Options.form-field(
      :data="fieldsData.gender"
      v-model="gender"
    )
    Options.form-field(
      :data="fieldsData.preference"
      v-model="preference"
      many
    )
    TagsField.form-field(
      :data="fieldsData.tags"
    v-model="tags"
      :maxTags="5"
    )
    ImagesField.form-field.images(
      :data="fieldsData.images"
      v-model="images"
      :maxTags="5"
    )
    MapField.form-field.map(
      :data="fieldsData.location"
      v-model="location"
      :realLocation="myLocation"
    )
    div.btn(
      :class="{ disabled: !updateValid }"
      @click="updateValid && updateUser($auth.user)"
    ) Save Changes
      //- @click="updateUser($auth.user)"
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import MapField from '@/components/MapField.vue';
import ImagesField from '@/components/ImagesField.vue';
import TagsField from '@/components/TagsField.vue';
import TextField from '@/components/TextField.vue';
import Options from '@/components/Options.vue';

export default {
  name: 'Settings',
  components: {
    MapField,
    ImagesField,
    TagsField,
    TextField,
    Options,
  },
  computed: {
    fname: {
      get() { return this.$auth.user.fname; },
      set(value) { this.changeUserField({ key: 'fname', value }); },
    },
    lname: {
      get() { return this.$auth.user.lname; },
      set(value) { this.changeUserField({ key: 'lname', value }); },
    },
    age: {
      get() { return this.$auth.user.age; },
      set(value) { this.changeUserField({ key: 'age', value }); },
    },
    email: {
      get() { return this.$auth.user.email; },
      set(value) { this.changeUserField({ key: 'email', value }); },
    },
    biography: {
      get() { return this.$auth.user.biography; },
      set(value) { this.changeUserField({ key: 'biography', value }); },
    },
    gender: {
      get() { return this.$auth.user.gender; },
      set(value) { this.changeUserField({ key: 'gender', value }); },
    },
    preference: {
      get() { return this.$auth.user.preference; },
      set(value) { this.changeUserField({ key: 'preference', value }); },
    },
    tags: {
      get() { return this.$auth.user.tags; },
      set(value) { this.changeUserField({ key: 'tags', value }); },
    },
    images: {
      get() { return this.$auth.user.images; },
      set(value) { this.changeUserField({ key: 'images', value }); },
    },
    location: {
      get() { return this.$auth.user.location; },
      set(value) { this.changeUserField({ key: 'location', value }); },
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
      this.$store.commit('forms/SET_VALUE', { key, value })
    })
  },
};
</script>

<style scoped lang="scss">

#settings {
  padding: 0 10px;
  margin: 50px 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .form-field {
    min-width: 300px;
    width: 48%;
  }
  .map,
  .images,
  .textarea {
    width: 100%;
    margin-bottom: 20px;
  }
  @media (max-width: map-get($grid-breakpoints, sm)) {
    .btn {
      width: 100%;
    }
  }
}
</style>
