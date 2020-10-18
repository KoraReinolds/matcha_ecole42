<template lang="pug">
  div#settings
    TextField.form-field(
      outlined
      :data="getFirstName"
      v-model.trim="fname"
    )
    TextField.form-field(
      outlined
      :data="getLastName"
      v-model="lname"
    )
    TextField.form-field(
      outlined
      :data="getAge"
      v-model.trim="age"
      type="number"
      min="18"
      max="99"
    )
    TextField.form-field(
      outlined
      :data="getMail"
      v-model.trim="email"
      name="email"
    )
    TextField.form-field.textarea(
      outlined
      many
      :data="getBiography"
      v-model.trim="biography"
    )
    Options.form-field(
      :data="getGender"
      v-model="gender"
    )
    Options.form-field(
      :data="getPreferences"
      v-model="preference"
      many
    )
    TagsField.form-field(
      v-model="tags"
      :maxTags="5"
      :data="getTags"
    )
    ImagesField.form-field.images(
      v-model="images"
      :maxTags="5"
      :data="getImages"
    )
    MapField.form-field.map(
      :data="getLocation"
      v-model="location"
    )
    div.btn(
      :class="{ disabled: !updateValid }"
      @click="updateValid && updateUser()"
    ) Save Changes
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import MapField from '@/components/MapField.vue';
import ImagesField from '@/components/ImagesField.vue';
import TagsField from '@/components/TagsField.vue';
import TextField from '@/components/TextField.vue';
import Options from '@/components/Options.vue';
import fieldMixin from '@/mixins/fieldMixin';

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
      set(value) { this.setValue({ key: 'fname', value }); },
    },
    lname: {
      get() { return this.$auth.user.lname; },
      set(value) { this.setValue({ key: 'lname', value }); },
    },
    age: {
      get() { return this.$auth.user.age; },
      set(value) { this.setValue({ key: 'age', value }); },
    },
    email: {
      get() { return this.$auth.user.email; },
      set(value) { this.setValue({ key: 'email', value }); },
    },
    biography: {
      get() { return this.$auth.user.biography; },
      set(value) { this.setValue({ key: 'biography', value }); },
    },
    gender: {
      get() { return this.$auth.user.gender; },
      set(value) { this.setValue({ key: 'gender', value }); },
    },
    preference: {
      get() { return this.$auth.user.preference; },
      set(value) { this.setValue({ key: 'preference', value }); },
    },
    tags: {
      get() { return this.$auth.user.tags; },
      set(value) { this.setValue({ key: 'tags', value }); },
    },
    images: {
      get() { return this.$auth.user.images; },
      set(value) { this.setValue({ key: 'images', value }); },
    },
    location: {
      get() { return this.$auth.user.location; },
      set(value) { this.setValue({ key: 'location', value }); },
    },
    ...mapGetters({
      getFirstName: 'forms/FIRST_NAME',
      getLastName: 'forms/LAST_NAME',
      getAge: 'forms/AGE',
      getMail: 'forms/MAIL',
      getBiography: 'forms/BIOGRAPHY',
      getGender: 'forms/GENDER',
      getPreferences: 'forms/PREFERENCES',
      getTags: 'forms/TAGS',
      getImages: 'forms/IMAGES',
      getLocation: 'forms/LOCATION',
      updateValid: 'forms/UPDATE_VALID',
    }),
  },
  methods: {
    ...mapMutations({
      }),
    ...mapActions({
      updateUser: 'forms/UPDATE_USER',
    }),
    setValue({ key, value }) {
      const newUser = {...this.$auth.user};
      newUser[key] = value;
      this.$auth.setUser(newUser);
      this.$store.commit('forms/SET_VALUE', { key, value })
    }
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
