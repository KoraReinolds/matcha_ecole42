<template lang="pug">
  div#settings
    TextField.form-field(
      outlined
      :data="getFirstName"
      v-model.trim="firstName"
    )
    TextField.form-field(
      outlined
      :data="getLastName"
      v-model="lastName"
    )
    TextField.form-field(
      outlined
      :data="getAge"
      v-model.trim="age"
    )
    TextField.form-field(
      outlined
      :data="getMail"
      v-model.trim="mail"
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
      v-model="preferences"
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
      @click="updateUser"
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
  mixins: [fieldMixin],
  components: {
    MapField,
    ImagesField,
    TagsField,
    TextField,
    Options,
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapMutations({
      updateUser: 'auth/UPDATE_USER'
    }),
    ...mapActions({
      getUser: 'auth/GET_USER'
    }),
  },
  mounted() {
    this.getUser();
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
  }
  @media (max-width: map-get($grid-breakpoints, sm)) {
    .btn {
      width: 100%;
    }
  }
}
</style>
