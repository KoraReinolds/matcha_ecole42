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
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import TagsField from '@/components/TagsField.vue';
import TextField from '@/components/TextField.vue';
import Options from '@/components/Options.vue';
import fieldMixin from '@/mixins/fieldMixin';

export default {
  name: 'Settings',
  mixins: [fieldMixin],
  components: {
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
  .textarea,
  .form-actions {
    width: 100%;
  }
  // @media (max-width: $mobile-breakpoint) {
  //   .btn {
  //     width: 100%;
  //   }
  // }
}
</style>
